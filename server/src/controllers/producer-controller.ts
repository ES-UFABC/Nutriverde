import e from "express";
import { ProducerDAO } from "../models/producer-model";

export async function list(req: e.Request, res: e.Response) {
  try {
    const producers = await ProducerDAO.getInstance().listAll();
    res.status(200).json({ items: producers, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ items: [], message: "error retrieving producers" });
  }
}

export async function findById(req: e.Request, res: e.Response) {
  const searchItem = req.params.id;
  console.log(searchItem);
  console.log(req.body);
  try {
    const producer = await ProducerDAO.getInstance().findById(searchItem);
    res.status(200).json({ item: producer, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ item: [], message: "error searching producer" });
  }
}