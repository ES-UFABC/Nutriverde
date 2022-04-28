import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import * as fileService from "./services/file";
import multer from "multer";

import cors from "cors";

import * as breeder from "./models/mocker-populate"
import { ProductService } from "./services/product-service";
import { ProducerService } from "./services/producer-service";
import { UserService } from "./services/user-service";

/**
 * Configure session middleware
 */
const app = e();
const upload = multer();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());




/**
 * Products routes
 */
app.post("/products", async (req,res) => {
  await ProductService.getInstance().insert(req,res)
});

app.get("/producers/:id/products",async (req,res) => {
  await ProductService.getInstance().findByProducerId(req,res)
});

app.get("/products", async (req,res) =>
  await ProductService.getInstance().listAll(req,res)
);

app.get("/products/:id", async (req,res) =>
  await ProductService.getInstance().findById(req, res)
);

app.get("/products/search/:word", async (req,res) =>
await ProductService.getInstance().listAllByName(req,res)
);


/***
 * Files end point
 */
app.post("/files", upload.single("file"), fileService.create);
app.get("/files/:filename", fileService.get);


/**
 * Producers routes
 */
app.get("/producers", async (req,res) =>
  await ProducerService.getInstance().listAll(req,res)
);

app.get("/producers/:id", async (req,res) =>
  await ProducerService.getInstance().findById(req,res)
);


/**
 * Users routes
 */
app.get("/users/:id", async (req,res) =>
  await UserService.getInstance().findById(req,res)
);
// TODO: 
app.get("/mocker", async (req,res) => {
  await breeder.add(req,res)
})

app.get("/register", async (req,res) => {
  await UserService.getInstance().insert(req,res)
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
