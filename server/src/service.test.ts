import e from "express";
import { Producer, ProducerDAO } from "./models/producer-model";



 export async function list(req: e.Request, res: e.Response) {
    try {
      console.log()
      const producers = await ProducerDAO.getInstance().listAll();
      res.status(200).json({ items: producers, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving producers" });
    }
  }
  

  export async function insert(req: e.Request, res: e.Response) {
    try {
      const producer = Producer.decode(req.body)

      const response = await ProducerDAO.getInstance().insert(producer)
    
      res.status(200).json({ items: producer, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving producers" });
    }
  }
  

