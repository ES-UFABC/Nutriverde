import e from "express";
import { Producer, ProducerDAO } from "../models/producer-model";
import { UserDAO } from "../models/user-model";

/**
 * Custom exception to signal a database error
 */
export class ValidationError extends Error {}
export class DatabaseError extends Error {}

/**
 * A singleton service to perform CRUD operations over a Producer
 */
export class ProducerService {
  private static instance: ProducerService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProducerService();
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
      const producers = await ProducerDAO.getInstance().listAll();
      console.log("all producers where fetch");
      res.status(200).json({ items: producers, message: "success" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ items: [], message: "error retrieving producers" });
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
      console.log(req.params);
      const producers = await ProducerDAO.getInstance().findById(id);
      console.log("producer-id(%d) fetch", id);
      res.status(200).json({ items: producers, message: "success" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ items: [], message: "error retrieving producers" });
    }
  }

  /**
   * Evoluir de Usuário para Produtor
   * @Test
   * @param req
   * @param res
   */
  async insert(req: any | e.Request, res: e.Response) {
    try {
      let retrUser = UserDAO.getInstance().findByEmail(req.user.email);
      console.log("DEBUG UPDATE USER");
      let retrUserJSON = (await retrUser).toJSON();
      console.log("user JSON", retrUserJSON);

      var obj = Object.assign(retrUserJSON, req.body);
      console.log("Merged Json", obj);

      const producer = Producer.decode(obj); // o erro está aqui campos obrigatorios dele

      console.log(producer);

      const response = await ProducerDAO.getInstance().update(producer);
      res.status(200).json({ items: producer, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error inserting producers" });
    }
  }

  async remove(req: e.Request, res: e.Response) {
    try {
      // como ele vem ?
      // DELETE COM um certo corpo // key
      // decode em "req.body"
      const name = req.body.name || "";
      const producer = await ProducerDAO.getInstance().findByname(name); // debug
      const response = await ProducerDAO.getInstance().removeByname(name);
      res.status(200).json({ items: producer, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error removing producers" });
    }
  }

  async update(req: e.Request, res: e.Response) {
    try {
      const producer = Producer.decode(req.body);
      const response = await ProducerDAO.getInstance().update(producer);

      res.status(200).json({ items: producer, message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ items: [], message: "error updating producers" });
    }
  }
}
