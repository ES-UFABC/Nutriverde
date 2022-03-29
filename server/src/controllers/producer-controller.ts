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
