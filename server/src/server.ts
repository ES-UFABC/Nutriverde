import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as producerService from "./service/producer-service"
import * as userService from "./service/user-service"
import * as  productService from "./service/product-service"

import cors from "cors";
import { ok } from "assert";


import * as service from "./service/producer-service"
/**
 * Configure session middleware
 */
const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());

/**
 * Products routes TODO:
 */
 app.get("/products", async (req,res) =>
    await productService.ProductService.getInstance().listAll(req,res)
 );

 app.get("/products/search/:word", async (req,res) =>
  await productService.ProductService.getInstance().listAllByName(req,res)
 );


/**
 * Producers routes
 */
app.get("/producers", async (req,res) =>
  await producerService.ProducerService.getInstance().listAll(req,res)
);

app.get("/producers/:id", async (req,res) =>
  await producerService.ProducerService.getInstance().findById(req,res)
);


/**
 * Users routes
 */
app.get("/users/:id", async (req,res) =>
  await userService.UserService.getInstance().findById(req,res)
);
// TODO: 
app.put("/register", async (req,res) => {
  await userService.UserService.getInstance().insert(req,res)
  console.log("Estou registrando")
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
