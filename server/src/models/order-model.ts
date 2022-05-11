import { config } from "../config";
import * as dbConnect from "./db-connection";

/**
 * Order model
 */
export class Order {
  id: number;
  date: string;
  quantity: number;
  productId: number;
  producerId: number;
  consumerId: number;

  constructor(
    id: number,
    date: string,
    quantity: number,
    productId: number,
    producerId: number,
    consumerId: number
  ) {
    (this.id = 0),
      (this.date = date),
      (this.quantity = quantity),
      (this.productId = productId),
      (this.producerId = producerId),
      (this.consumerId = consumerId);
  }

  isValid(): boolean {
    return (
      this.date.length > 0 &&
      this.quantity > 0 &&
      this.productId > 0 &&
      this.producerId > 0 &&
      this.consumerId > 0
    );
  }

  static decode(json: any): Order {
    for (const prop of [
      "id",
      "date",
      "quantity",
      "productId",
      "producerId",
      "consumerId",
    ]) {
      if (!(prop in json)) {
        throw new Error(`Field ${prop} is required`);
      }
    }

    const order = new Order(
      json.id,
      json.date,
      json.quantity,
      json.productId,
      json.producerId,
      json.consumerId
    );

    return order;
  }
}

export class OrderDAO {
  private static instance: OrderDAO;

  private constructor() {}

  private getCollection() {
    return dbConnect.getDb().collection(config.db.collections.orders);
  }

  static getInstance(): OrderDAO {
    if (!OrderDAO.instance) {
      OrderDAO.instance = new OrderDAO();
    }

    return OrderDAO.instance;
  }

  /**
   * Insert a new Order
   * @param order the Order
   */
  async insert(order: Order): Promise<boolean> {
    try {
      order.id = await this.nextId();
      const response = await this.getCollection().insertOne(order);

      if (!response || response.insertedCount < 1) {
        throw Error("Invalid result while inserting a Order ");
      }
      return true;
    } catch (error) {
      console.error("Falha ao inserir elemento Order");
      throw error;
    }
  }

  /**
   * Insert multiple new Orders
   * @param orders the Order List
   */
  async insertFromOrderList(orders: Order[]): Promise<boolean> {
    try {
      for (const order of orders) {
        order.id = await this.nextId();
      }
      console.log("after id aquire", orders);

      const response = await this.getCollection().insertMany(orders);
      // .insertOne(order);

      if (!response || response.insertedCount < 1) {
        throw Error("Invalid result while inserting Orders ");
      }
      return true;
    } catch (error) {
      console.error("Falha ao inserir elemento Order");
      throw error;
    }
  }

  /**
   * Find Order using its Producer id
   * @param id the Order Producer id
   */
  async findByProducerId(id: number): Promise<Order[]> {
    try {
      // console.log( "model: id= %d: %s", id, typeof id)
      const response =
        (await this.getCollection()
          .find({ producerId: id })
          // .sort()
          .toArray()) || [];
      if (response) {
        return response as Order[];
      }
      throw Error("Erro ao buscar por elemento");
    } catch (error) {
      console.error("Failed to find item by its producer id");
      throw error;
    }
  }
  /**
   * Find Order using its Producer id
   * @param id the Order Producer id
   */
  async findByConsumerId(id: number): Promise<Order[]> {
    try {
      // console.log( "model: id= %d: %s", id, typeof id)
      const response =
        (await this.getCollection()
          .find({ consumerId: id })
          // .sort()
          .toArray()) || [];
      if (response) {
        return response as Order[];
      }
      throw Error("Erro ao buscar por elemento");
    } catch (error) {
      console.error("Failed to find item by its producer id");
      throw error;
    }
  }
  /**
   * Generate a new Order id using a db sequence.
   */
  async nextId(): Promise<number> {
    try {
      const seqColl = dbConnect
        .getDb()
        .collection(config.db.collections.sequences);
      const result = await seqColl.findOneAndUpdate(
        { name: "order_id" },
        { $inc: { value: 1 } }
      );

      if (result.ok) {
        return result.value.value as number;
      }

      throw Error("Failed to create new id in the database");
    } catch (error) {
      console.error("Failed to generate a new id");
      throw error;
    }
  }
}
