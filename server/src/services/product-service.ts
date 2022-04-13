import e from "express";
import * as productModel from "../models/product-model";
  
  /**
   * Custom exception to signal a database error
   */
  export class ValidationError extends Error {}
  export class DatabaseError extends Error {}
  
  
  /**
   * A singleton service to perform CRUD operations over a Product
   */
  export class ProductService {
    private static instance: ProductService

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProductService()
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

        const Products = await productModel.ProductDAO.getInstance().listAll();
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
        const name = req.params.word || ""
        const Products = await productModel.ProductDAO.getInstance().searchAndList(name);
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
        const id = Number(req.params.id)

        const Products = await productModel.ProductDAO.getInstance().findById(id);
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
    async insert(req: e.Request, res: e.Response) {
        try {
        const Product = productModel.Product.decode(req.body) 
        const response = await productModel.ProductDAO.getInstance().insert(Product)
        res.status(200).json({ items: Product, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error inserting Products" });
        }
    }


    async update(req: e.Request, res: e.Response) {
        try {
        
        const Product = await productModel.Product.decode(req.body) 
        const response = await productModel.ProductDAO.getInstance().update(Product)

        res.status(200).json({ items: Product, message: "success" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ items: [], message: "error updating Products" });
        }
    }
    
    async findByProducerId(req: e.Request, res: e.Response) {
        const searchItem = parseInt(req.params.id);
        //console.log("product producer id: ", searchItem);
        //console.log(req.body);
        try {
          const products = await productModel.ProductDAO.getInstance().findByProducerId(searchItem);
          res.status(200).json({ items: products, message: "success" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ items: [], message: "error searching products" });
        }
      }
      
  
}