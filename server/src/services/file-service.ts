import e from "express";
import { getBucket } from "../models/db-connection";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";

/**
 * A singleton service to perform CRUD operations over a File
 */
export class FileService {
  private static instance: FileService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new FileService();
    }
    return this.instance;
  }

  /**
   * Creates and uploads a file to the storage.
   * @param req the request object
   * @param res the response object
   */
  create(req: e.Request, res: e.Response) {
    try {
      const file = req.file;
      const filename = uuidv4();
      const bucket = getBucket();

      if (!file) {
        res.status(400).json({ message: "no file to upload" });
        return;
      }

      Readable.from(file.buffer).pipe(
        bucket.openUploadStream(filename, { contentType: file.mimetype })
      );

      res
        .status(200)
        .json({ name: filename, message: "file uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error uploading file" });
    }
  }

  /**
   * Retrieves an uploaded file as a stream.
   * @param req the request object
   * @param res the response object
   */
  async get(req: e.Request, res: e.Response) {
    try {
      const bucket = getBucket();
      const filename = req.params.filename;

      const documents = await bucket.find({ filename }).toArray();
      if (documents.length <= 0) {
        res.status(404).json({ message: "file not found" });
        return;
      }

      const file = documents[0];
      res.status(200).contentType(file.contentType);
      bucket.openDownloadStreamByName(filename).pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error retrieving file" });
    }
  }
}
