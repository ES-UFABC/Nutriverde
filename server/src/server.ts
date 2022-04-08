import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as productController from "./controllers/product-controller";
import * as producerController from "./controllers/producer-controller";
import cors from "cors";
import { ok } from "assert";


import * as service from "./service.test"
/**
 * Configure session middleware
 */
const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());

/**
 * Products get put post delete
 */
 app.get("/products", productController.list);
 app.get("/products/search/:word", productController.searchAndList);


/**
 * Producers get put post delete
 */
app.get("/producers", producerController.list);


// 
app.put("/producers", async (req,res) => {
  await service.insert(req,res)
})


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
