import { config } from "../config";
import * as dbConnect from "./db-connection";

/**
 * Review model
 */
export class Review {
  id: number;
  userId: number;
  userName: string;
  productId: number;
  date: string;
  content: string;
  rating: number;
  title: string;
  images: string[];

  constructor(
    userId: number,
    userName: string,
    productId: number,
    date: string,
    content: string,
    rating: number,
    title: string
  ) {
    this.id = 0;
    this.userId = userId;
    this.userName = userName;
    this.date = date;
    this.content = content;
    this.rating = rating;
    this.title = title;
    this.images = [];
    this.productId = productId;
  }

  isValid(): boolean {
    return (
      this.title.length > 0 &&
      this.content.length > 0 &&
      this.rating >= 1 &&
      this.rating <= 5
    );
  }

  /**
   * Convert a JSON representation to a Review instance
   * @param json the json representation
   * @returns the Review instance
   */
  static decode(json: any): Review {
    for (const prop of [
      "title",
      "content",
      "rating",
      "userId",
      "userName",
      "date",
      "productId",
    ]) {
      if (!(prop in json)) {
        throw new Error(`Field ${prop} is required`);
      }
    }

    const review = new Review(
      json.userId,
      json.userName,
      json.productId,
      json.date,
      json.content,
      json.rating,
      json.title
    );

    if ("id" in json) {
      review.id = parseInt(json.id);
    }

    if ("images" in json) {
      review.images = json.images;
    }

    return review;
  }
}

/**
 * Blog Review DAO Singleton
 */
export class ReviewDAO {
  private static instance: ReviewDAO;

  private constructor() {}

  private getCollection() {
    return dbConnect.getDb().collection(config.db.collections.reviews);
  }

  static getInstance(): ReviewDAO {
    if (!ReviewDAO.instance) {
      ReviewDAO.instance = new ReviewDAO();
    }

    return ReviewDAO.instance;
  }

  /**
   * Insert a new Review
   * @param Review the Review
   */
  async insert(Review: Review): Promise<boolean> {
    try {
      Review.id = await this.nextId();
      const response = await this.getCollection().insertOne(Review);

      if (!response || response.insertedCount < 1) {
        throw Error("Invalid result while inserting a Review ");
      }
      return true;
    } catch (error) {
      console.error("Falha ao inserir elemento");
      throw error;
    }
  }

  /**
   * List all Reviews
   */
  async listAll(): Promise<Review[]> {
    try {
      return (
        this.getCollection()
          .find({}, { projection: { _id: 0 } })
          .toArray() || []
      );
    } catch (error) {
      console.error("Falha ao listar os Reviews");
      throw error;
    }
  }

  /**
   * Find Review using its id
   * @param id the Review id
   */
  async findById(id: number): Promise<Review> {
    try {
      const response = await this.getCollection().findOne(
        { id: id },
        { projection: { _id: 0 } }
      );
      if (response) {
        return response as Review;
      }
      throw Error("Erro ao buscar por elemento");
    } catch (error) {
      console.error("Failed to find item by id");
      throw error;
    }
  }
  /**
   * Find Review using its Producer id
   * @param id the Review Producer id
   */
  async findByProductId(id: number): Promise<Review[]> {
    try {
      // console.log( "model: id= %d: %s", id, typeof id)
      const response =
        (await this.getCollection().find({ productId: id }).toArray()) || [];
      if (response) {
        return response as Review[];
      }
      throw Error("Erro ao buscar por elemento");
    } catch (error) {
      console.error("Failed to find item by id");
      throw error;
    }
  }
  /**
   * Uptypology the given Review in the database
   * (Assumes the Review id already exists)
   * @param Review the Review
   */
  async update(Review: Review): Promise<boolean> {
    try {
      const response = await this.getCollection().replaceOne(
        { id: Review.id },
        Review
      );

      return response ? response.modifiedCount > 0 : false;
    } catch (error) {
      console.error("Failed to uptypology element");
      throw error;
    }
  }

  /**
   * Remove the Review with the given id.
   * @param id the id
   */
  async removeById(id: number): Promise<boolean> {
    try {
      const response = await this.getCollection().deleteOne({ id: id }, {});

      return response.deletedCount ? response.deletedCount > 0 : false;
    } catch (error) {
      console.error("Failed to remove element");
      throw error;
    }
  }

  /**
   * Generate a new Review id using a db sequence.
   */
  async nextId(): Promise<number> {
    try {
      const seqColl = dbConnect
        .getDb()
        .collection(config.db.collections.sequences);
      const result = await seqColl.findOneAndUpdate(
        { name: "review_id" },
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
