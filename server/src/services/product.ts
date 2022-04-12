import e from "express";
import { Product, ProductDAO } from "../models/product-model";

/**
 * Create a product.
 * @param req the request object
 * @param res the response object
 */
export async function create(req: e.Request, res: e.Response) {
  try {
    const data = req.body;
    const product = Product.decode(data);

    await ProductDAO.getInstance().insert(product);
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error creating product" });
  }
}

/**
 * List all products.
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
