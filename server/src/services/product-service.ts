import e from "express";
import * as productModel from "../models/product-model";
import { Product, ProductDAO } from "../models/product-model";

/**
 * Custom exception to signal a database error
 */
export class ValidationError extends Error {}
export class DatabaseError extends Error {}

/**
 * A singleton service to perform CRUD operations over a Product
 */
export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductService();
    }
    return this.instance;
  }
  /**
   *
   * @param req
   * @param res
   */
  async listAll(req: e.Request, res: e.Response) {
    try {
      const Products = await ProductDAO.getInstance().listAll();
      console.log("all products where fetch ");
      res.status(200).json({ items: Products, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving Products" });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async listAllByName(req: e.Request, res: e.Response) {
    try {
      const name = req.params.word || "";
      const Products =
        await ProductDAO.getInstance().searchAndList(name);
      res.status(200).json({ items: Products, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving Products" });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async findById(req: e.Request, res: e.Response) {
    try {
      const id = Number(req.params.id);

      const product = await ProductDAO.getInstance().findById(id);
      res.status(200).json({ item: product, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ item: {}, message: "error retrieving Products" });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async insert(req: e.Request, res: e.Response) {
    try {
      // console.log(req.body);
      const product = Product.decode(req.body);
      const response = await ProductDAO.getInstance().insert(
        product
      );
      res.status(200).json({ items: product, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error inserting Products" });
    }
  }

  async update(req: e.Request, res: e.Response) {
    try {
      const product = await Product.decode(req.body);
      const response = await ProductDAO.getInstance().update(
        product
      );

      res.status(200).json({ items: Product, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error updating Products" });
    }
  }

  async findByProducerId(req: e.Request, res: e.Response) {
    // console.log("product producer id: ", searchItem);
    try {
      const producerId = Number(req.params.id);
      const products =
        await ProductDAO.getInstance().findByProducerId(
          producerId
        );
      console.log("products of producer-id(%d) fetch", producerId);
      res.status(200).json({ items: products, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error searching products" });
    }
  }
}
