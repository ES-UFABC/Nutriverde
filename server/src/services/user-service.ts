import e from "express";
import * as bcrypt from "bcrypt"
import * as userModel from "../models/user-model";
import "../session-data"
  /**
   * Custom exception to signal a database error
   */
  export class ValidationError extends Error {}
  export class DatabaseError extends Error {}
  
  
  /**
   * A singleton service to perform CRUD operations over a User
   */
  export class UserService {
    private static instance: UserService

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService()
        }
        return this.instance
    }
    /**
     * @deprecated 
     * @param req 
     * @param res 
     */
    async listAll(req: e.Request, res: e.Response) {
        try {

        const Users = await userModel.UserDAO.getInstance().listAll();
        console.log(Users)
        res.status(200).json({ items: Users, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error retrieving Users" });
        }
    }

    async loginProcessing(req: e.Request, res: e.Response) {
        const username = req.body.username as string || ""
        const password = req.body.password as string || ""
        const isValidLogin = () => username.trim().length > 0 && password.trim.length > 0
        console.log(username)
        console.log(password)
        try {
            const retrUser = 
                await userModel.UserDAO.getInstance().findByEmail(username)
            console.log("User ",retrUser)
                //await bcrypt.compare(password, retrUser.password)
            if (password === retrUser.password) { // compare 

                res.cookie('user_id', retrUser.id, {
                    httpOnly: true,
                })
                res.json({
                    name: retrUser.name, email : retrUser.email, message: "success"
                });

            } else {
                throw Error("Login credentials did not match")
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ name: username ,message: "Invalid Login" });
        }
    }

    async logout(req: e.Request, res: e.Response) {
        if (req.session.authenticated) {
            req.session.authenticated = false
            req.session.userName = ""
        }
        res.status(200).json({ message: "sucess" });
    }

    /**
     * 
     * @param req 
     * @param res 
     */
     async findById(req: e.Request, res: e.Response) {
        try {
        const id = Number(req.params.id)
        console.log(req.params)
        const Users = await userModel.UserDAO.getInstance().findById(id);
        res.status(200).json({ items: Users, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error retrieving Users" });
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     */
    async insert(req: e.Request, res: e.Response) {
        try {
        console.log(req.body)
        const User = userModel.User.decode(req.body) 
        console.log(User)
        const response = await userModel.UserDAO.getInstance().insert(User)
        res.status(200).json({ items: User, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error inserting Users" });
        }
    }

    async remove(req: e.Request, res: e.Response) {
        try {
        // como ele vem ? 
        // DELETE COM um certo corpo // key 
        // decode em "req.body" 
        const name = req.body.name || ""
        const User = await userModel.UserDAO.getInstance().findByname(name) // debug
        const response = await userModel.UserDAO.getInstance().removeByname(name)
        res.status(200).json({ items: User, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error removing Users" });
        }
    }

    async update(req: e.Request, res: e.Response) {
        try {
        
        const User = await userModel.User.decode(req.body) 
        const response = await userModel.UserDAO.getInstance().update(User)

        res.status(200).json({ items: User, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error updating Users" });
        }
    }
    
  
}