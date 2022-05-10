import e from "express";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { config } from "../config";
import { User, UserDAO } from "../models/user-model";

/**
 * Custom exception to signal a database error
 */
export class ValidationError extends Error { }
export class DatabaseError extends Error { }

/**
 * A singleton service to perform CRUD operations over a User
 */
export class UserService {
  private static instance: UserService;

  private constructor() { }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }
  /**
   * @deprecated
   * @param req
   * @param res
   */
  async listAll(req: e.Request, res: e.Response) {
    try {
      const Users = await UserDAO.getInstance().listAll();
      console.log(Users);
      res.status(200).json({ items: Users, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving Users" });
    }
  }

  /**
   * @Test
   * @Fabio
   * @param req
   * @param res
   */
  async loginProcessing(req: e.Request, res: e.Response) {
    const email = (req.body.email as string) || "";
    const password = (req.body.password as string) || "";
    try {
      const retrUser = await UserDAO.getInstance().findByEmail(email);

      console.log(retrUser);
      if (await bcrypt.compare(password, retrUser.password)) {
        const token = JWT.sign(
          {
            name: retrUser.name,
            email: retrUser.email,
            id: retrUser.id,
            isProducer: "fantasyName" in retrUser,
          },
          process.env.SERVER_SECRET || config.secret,
          { expiresIn: 60 * 60 }
        );

        res.json({
          token,
          message: "Login Successfull",
        });
      } else {
        throw Error("Login credentials did not match");
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ name: email, message: "Invalid Credencials" });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async findById(req: e.Request, res: e.Response) {
    try {
      const id = Number(req.params.id) || req.body.id;
      console.log(id);
      const Users = await UserDAO.getInstance().findById(id);
      res.json({ items: Users, message: "success" });
    } catch (error) {
      return res
        .status(500)
        .json({ items: [], message: "error retrieving Users" });
    }
  }

  /**
   * TODO: Validade Data
   * @param req
   * @param res
   * @Test
   */
  async insert(req: e.Request, res: e.Response) {
    try {
      const user = User.decode(req.body);

      // Check Data x
      // Check user
      // hash
      // Store user
      // Hash the password
      try {
        const retrUser = await UserDAO.getInstance().findByEmail(user.email);
        res.status(400).json({ message: "This User Already exists" });
      } catch (error) {
        const hashedPassword = await bcrypt.hash(user.password, 10); // adicionando uma string aleatorio e depois hash
        user.password = hashedPassword;

        console.log(user);

        const response = await UserDAO.getInstance().insert(user);

        const token = JWT.sign(
          {
            name: user.name,
            email: user.email,
            id: user.id,
            isProducer: "fantasyName" in user,
          },
          process.env.SERVER_SECRET || config.secret,
          { expiresIn: 60 * 60 }
        );

        res.json({
          token,
          message: "Account Created Successfully",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "Error creating Users" });
    }
  }

  async remove(req: e.Request, res: e.Response) {
    try {
      // como ele vem ?
      // DELETE COM um certo corpo // key
      // decode em "req.body"
      const name = req.body.name || "";
      const User = await UserDAO.getInstance().findByname(name); // debug
      const response = await UserDAO.getInstance().removeByname(name);
      res.status(200).json({ items: User, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error removing Users" });
    }
  }

  async update(req: e.Request, res: e.Response) {
    try {
      const user = User.decode(req.body);
      const response = await UserDAO.getInstance().update(user);

      res.status(200).json({ items: User, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error updating Users" });
    }
  }

  /**
   * 
   *
   */
  async auth(req: any, res: e.Response, next: any) {
    // The user send a token at header of req
    const token = req.header("x-auth-token");
    // There is a token at req ?
    if (!token) {
      return res.status(401).json({
        message: "No token found",
      })
    }
    try {
      const user = JWT.verify(
        token || "",
        process.env.SERVER_SECRET || config.secret,
        function (err: any, user: any) {
          if (err) {
            return res.status(401).json({
              message: "Expired Token"
            });
          } else {
            console.log(user);
            req.user = user;
            next();
          }
        }
      );
    } catch (error) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
  }
}
