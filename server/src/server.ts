import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as productController from "./controllers/product-controller";

import * as producerService from "./producer-service"
import * as userService from "./user-service"


import cors from "cors";
import { ok } from "assert";


import * as service from "./producer-service"
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
app.get("/producers", async (req,res) =>
  await producerService.ProducerService.getInstance().listAll(req,res)
);


app.get("/producers/:id", async (req,res) =>
  await producerService.ProducerService.getInstance().findById(req,res)
);


app.put("/register", async (req,res) => {
  await producerService.ProducerService.getInstance().insert(req,res)
  console.log("Estou registrando")
})

app.get("/producers/:id", async (req,res) =>
  await producerService.ProducerService.getInstance().findById(req,res)
);

app.get("/users/:id", async (req,res) =>
  await userService.UserService.getInstance().findById(req,res)
);


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
