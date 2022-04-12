import e from "express";
import * as userModel from "../models/user-model";
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