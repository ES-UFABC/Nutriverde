import e from "express";
import { Review, ReviewDAO } from "../models/review-model";

/**
 * Custom exception to signal a database error
 */
export class ValidationError extends Error {}
export class DatabaseError extends Error {}

/**
 * A singleton service to perform CRUD operations over a Review
 */
export class ReviewService {
  private static instance: ReviewService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ReviewService();
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
      const reviews = await ReviewDAO.getInstance().listAll();
      console.log("all reviews where fetch ");
      res.status(200).json({ items: reviews, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error retrieving Reviews" });
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

      const review = await ReviewDAO.getInstance().findById(id);
      res.status(200).json({ item: review, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ item: {}, message: "error retrieving Reviews" });
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
      const review = Review.decode(req.body);
      const response = await ReviewDAO.getInstance().insert(review);
      res.status(200).json({ items: review, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error inserting Reviews" });
    }
  }

  async update(req: e.Request, res: e.Response) {
    try {
      const review = Review.decode(req.body);
      const response = await ReviewDAO.getInstance().update(review);

      res.status(200).json({ items: Review, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error updating Reviews" });
    }
  }

  /**
   * @Test
   * @Fabio
   * @param req
   * @param res
   */
  async findByProductId(req: any | e.Request, res: e.Response) {
    const searchItem = parseInt(req.params.id) || req.body.productId; // FIXME:
    

    
    try {
      const reviews = await ReviewDAO.getInstance().findByProductId(
        searchItem
      );
      res
        .status(200)
        .json({ items: reviews, message: "success",  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error searching reviews" });
    }
  }
}
