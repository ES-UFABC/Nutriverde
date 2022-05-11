import { config } from "../config";
import * as dbConnect from "./db-connection";

/**
 * Order model
 */
export class Order {
  id: number;
  date: string;
  quantity: number;
  producerId: number;
  OrderId: number;
  consumerId: number;

  constructor(
    id: number,
    date: string,
    quantity: number,
    producerId: number,
    OrderId: number,
    consumerId: number
  ) {
    (this.id = 0),
      (this.date = date),
      (this.quantity = quantity),
      (this.producerId = producerId),
      (this.OrderId = OrderId),
      (this.consumerId = consumerId);
  }

  isValid(): boolean {
    return (
      this.date.length > 0 &&
      this.quantity > 0 &&
      this.producerId > 0 &&
      this.OrderId > 0 &&
      this.consumerId > 0
    );
  }

  static decode(json: any): Order {
    for (const prop of [
      "id",
      "date",
      "quantity",
      "producerId",
      "OrderId",
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
      json.producerId,
      json.OrderId,
      json.consumerId
    );

    return order;
  }
}

export class OrdertDAO {
  private static instance: OrdertDAO;

  private constructor() {}

  private getCollection() {
    return dbConnect.getDb().collection(config.db.collections.orders);
  }

  static getInstance(): OrdertDAO {
    if (!OrdertDAO.instance) {
      OrdertDAO.instance = new OrdertDAO();
    }

    return OrdertDAO.instance;
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
   * Find Order using its Producer id
   * @param id the Order Producer id
   */
  async findByProducerId(id: number): Promise<Order[]> {
    try {
      // console.log( "model: id= %d: %s", id, typeof id)
      const response =
        (await this.getCollection().find({ producerId: id }).toArray()) || [];
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
        (await this.getCollection().find({ consumerId: id }).toArray()) || [];
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
        { name: "Order_id" },
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
