import e from "express";
import { Producer, ProducerDAO } from "../models/producer-model";
import * as mocker from "../mocker";

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

export async function mockAdd (quatity:number) {
  try {

    // const p = new Producer(
    //   /*name:*/ "meu nome é",
    //   /*paymentMethods:*/ "cx1", 
    //   /*fantasyName: */"jk,men", 
    //   /*email:*/ "string@mentir.com"
    // );
    for (let index = 0; index < quatity; index++) {

      const p = Producer.decode(mocker.newProducer());
      // console.log(p);
      const r = await ProducerDAO.getInstance().insert(p);
      // console.log(r);
    }
  } catch(e) {
    console.log(e);
  }
}