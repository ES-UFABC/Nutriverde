import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as productService from "./services/product";
import * as fileService from "./services/file";
import * as producerController from "./controllers/producer-controller";
import cors from "cors";
import multer from "multer";

/**
 * Configure session middleware
 */
const app = e();
const upload = multer();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());

app.get("/products", productService.list);
app.post("/products", productService.create);
app.get("/products/search/:word", productService.searchAndList);

app.get("/producers", producerController.list);

app.post("/files", upload.single("file"), fileService.create);
app.get("/files/:filename", fileService.get);

/**
 * Server stack set-up
 */
console.log("Starting server stack...");
dbConnect
  .connect()
  .then(() => {
    app.listen(config["server-port"], () => {
      console.log(`Server listening at ${config["server-port"]}`);
    });
  })
  .catch((error) => {
    console.error("Failed to load server stack");
    console.error(error.stack);
  });

/**
 * Server stack tear-down
 */
process.on("exit", (code) => {
  console.log(`Server exiting with code ${code}`);
});
function exitHandler() {
  dbConnect
    .disconnect()
    .then(() => process.exit())
    .catch((error) => {
      console.error("Failed to shutdown server stack");
      console.error(error.stack);
    });
}
process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
