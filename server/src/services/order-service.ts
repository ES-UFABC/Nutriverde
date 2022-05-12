import e from "express";
import { Order, OrderDAO } from "../models/order-model";
import { ProductDAO } from "../models/product-model";

/**
 * Custom exception to signal a database error
 */
export class ValidationError extends Error {}
export class DatabaseError extends Error {}

/**
 * A singleton service to perform CRUD operations over a Producer
 */
export class OrderService {
  private static instance: OrderService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderService();
    }
    return this.instance;
  }
  /**
   *
   * @param req
   * @param res
   */
  async insert(req: e.Request, res: e.Response) {
    try {
      //   const list =
      //     (JSON.parse(String(req.query.idsList)) as number[]) || ([] as number[]);
      //   console.log(list);
      //   // console.log(req.body);
      //   const orders: Order[] = [];
      //   {
      //     const order = Order.decode(req.body);
      //     orders.push(order);
      //     const response = await OrderDAO.getInstance().insert(order);
      //   }
      //   res.status(200).json({ items: orders, message: "success" });
      res
        .status(200)
        .json({ items: { orders: "get ready sun" }, message: "Successfull" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error inserting Products" });
    }
  }
  /**
   *
   * @param req
   * @param res
   */
  async insertMultiplesFromPrescription(req: e.Request, res: e.Response) {
    try {
      console.log(req.body);
      const list = req.body.prescriptions as {
        quantity: number;
        productId: number;
      }[];
      console.log("list ", list);
      const consumerId = parseInt(req.body.consumerId);
      let date_ob = new Date();
      const dateNow = date_ob.toISOString();
      console.log("date", dateNow);
      const orderList: Order[] = [];
      for (const element of list) {
        const product = await ProductDAO.getInstance().findById(
          element.productId
        );
        const ord = {
          id: 0,
          date: dateNow,
          quantity: element.quantity,
          productId: element.productId,
          producerId: product.producerId,
          consumerId: consumerId,
        };
        orderList.push(Order.decode(ord));
      }
      console.log("orderList", orderList);
      const response = await OrderDAO.getInstance().insertFromOrderList(
        orderList
      );
      res.status(200).json({ message: "Successfull" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error inserting Products" });
    }
  }
  /**
   * @param req
   * @param res
   */
  async findByProducerId(req: any | e.Request, res: e.Response) {
    const searchItem = req.body.producerId;
    let isProducer = false;
    if (req.user) {
      isProducer = req.user.isProducer;
    }
    // com autenticação, token
    try {
      const orders = await OrderDAO.getInstance().findByProducerId(searchItem);
      res
        .status(200)
        .json({ items: orders, message: "success", isProducer: isProducer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error searching products" });
    }
  }

  /**
   * @param req
   * @param res
   */
  async findByConsumerId(req: any | e.Request, res: e.Response) {
    const searchItem = parseInt(req.body.consumerId);
    // com autenticação, token
    try {
      const orders = await OrderDAO.getInstance().findByConsumerId(searchItem);
      res.status(200).json({ items: orders, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error searching products" });
    }
  }
}
