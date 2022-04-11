import e from "express";
import { Product, ProductDAO } from "../models/product-model";
import * as mocker from "../mocker";

/**
 * List all posts.
 * @param req the request object
 * @param res the response object
 */
export async function list(req: e.Request, res: e.Response) {
  try {
    const products = await ProductDAO.getInstance().listAll();
    res.status(200).json({ items: products, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ items: [], message: "error retrieving products" });
  }
}

export async function searchAndList(req: e.Request, res: e.Response) {
  const searchItem = req.params.word || "";
  console.log(searchItem);
  console.log(req.body);
  try {
    const products = await ProductDAO.getInstance().searchAndList(searchItem);
    res.status(200).json({ items: products, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ items: [], message: "error searching products" });
  }
}

export async function findByProducerId(req: e.Request, res: e.Response) {
  const searchItem = parseInt(req.params.id);
  console.log("product producer id: ", searchItem);
  console.log(req.body);
  try {
    const products = await ProductDAO.getInstance().findByProducerId(searchItem);
    res.status(200).json({ items: products, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ items: [], message: "error searching products" });
  }
}

export async function mockAdd (producerIdRange:number,amountPerProducer:number) {
  try {
    for (let producerId = 1; producerId <= producerIdRange; producerId++) {
      for (let quatity = 0; quatity < amountPerProducer; quatity++) {
        const p = Product.decode(mocker.newProduct(producerId));
        // console.log(p);
        const r = await ProductDAO.getInstance().insert(p);
        // console.log(r);
      }
    }
  } catch(e) {
    console.log(e);
  }
}