import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as productController from "./controllers/product-controller";
import * as producerController from "./controllers/producer-controller";
import cors from "cors";

/**
 * Configure session middleware
 */
const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());

app.get("/products", productController.list);
app.get("/products/search/:word", productController.searchAndList);
app.get("/producers", producerController.list);
app.get("/producers/:id", producerController.findById);
app.get("/producers/:id/products", productController.findByProducerId);

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

// producerController.mockAdd(5) // if want to add mocker Procucers
// productController.mockAdd(5,10) // if want to add mocker Procucts, from 1st to (n1)th Procucer, exact (n2) Products
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
