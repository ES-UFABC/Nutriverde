import e from "express";
import * as producerModel from "../models/producer-model";
import * as userModel from "../models/user-model";
  
  /**
   * Custom exception to signal a database error
   */
  export class ValidationError extends Error {}
  export class DatabaseError extends Error {}
  
  
  /**
   * A singleton service to perform CRUD operations over a Producer
   */
  export class ProducerService {
    private static instance: ProducerService

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProducerService()
        }
        return this.instance
    }
    /**
     * 
     * @param req 
     * @param res 
     */
    async listAll(req: e.Request, res: e.Response) {
        try {

        const producers = await producerModel.ProducerDAO.getInstance().listAll();
        console.log(producers)
        res.status(200).json({ items: producers, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error retrieving producers" });
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
        const producers = await producerModel.ProducerDAO.getInstance().findById(id);
        res.status(200).json({ items: producers, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error retrieving producers" });
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     */
    async insert(req: e.Request, res: e.Response) {
        try {
        
        console.log(req.body) // DEBUG: 
        const producer = producerModel.Producer.decode(req.body) // o erro está aqui campos obrigatorios dele
        const response = await producerModel.ProducerDAO.getInstance().insert(producer)
        res.status(200).json({ items: producer, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error inserting producers" });
        }
    }

    async remove(req: e.Request, res: e.Response) {
        try {
        // como ele vem ? 
        // DELETE COM um certo corpo // key 
        // decode em "req.body" 
        const name = req.body.name || ""
        const producer = await producerModel.ProducerDAO.getInstance().findByname(name) // debug
        const response = await producerModel.ProducerDAO.getInstance().removeByname(name)
        res.status(200).json({ items: producer, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error removing producers" });
        }
    }

    async update(req: e.Request, res: e.Response) {
        try {
        
        const producer = await producerModel.Producer.decode(req.body) 
        const response = await producerModel.ProducerDAO.getInstance().update(producer)

        res.status(200).json({ items: producer, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error updating producers" });
        }
    }
    
  
}