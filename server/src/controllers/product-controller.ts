import e from "express";
import { ProductDAO } from "../models/product-model";

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
