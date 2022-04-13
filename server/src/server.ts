import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
//import * as productService from "./services/product";
import * as fileService from "./services/file";
import multer from "multer";
import * as producerService from "./services/producer-service"
import * as userService from "./services/user-service"
import * as productService from "./services/product-service"


//import * as producerModel from "../models/producer-model";
//import * as userModel from "../models/user-model";
// import * as productModel from "./models/product-model";


import cors from "cors";
import { ok } from "assert";
// import * as mocker from "./mocker"
// import { Producer, ProducerDAO } from "./models/producer-model";

import * as breeder from "./models/mocker-populate"
import session from "express-session";
/**
 * Configure session middleware
 */
const app = e();
const upload = multer();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());



// credencials 
  app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})




/**
 * Products routes
 */
app.post("/products", async (req,res) => {
  await productService.ProductService.getInstance().insert(req,res)
});

app.get("/producers/:id/products",async (req,res) => {
  await productService.ProductService.getInstance().findByProducerId(req,res)
});

app.get("/products", async (req,res) =>
  await productService.ProductService.getInstance().listAll(req,res)
);

app.get("/products/search/:word", async (req,res) =>
await productService.ProductService.getInstance().listAllByName(req,res)
);


/***
 * Files end point
 */
app.post("/files", upload.single("file"), fileService.create);
app.get("/files/:filename", fileService.get);


/**
 * Producers routes
 */
app.get("/producers", async (req,res) =>{

    await producerService.ProducerService.getInstance().listAll(req,res)
}

);

app.get("/producers/:id", async (req,res) =>{

  await producerService.ProducerService.getInstance().findById(req,res)
}
  
);


/**
 * Users routes
 */
app.get("/users/:id", async (req,res) =>
  await userService.UserService.getInstance().findById(req,res)
);
// TODO: 
app.get("/mocker", async (req,res) => {
  await breeder.add(req,res)
})

app.put("/register", async (req,res) => {
  console.log("Estou registrando")
  await userService.UserService.getInstance().insert(req,res)

})
app.put("/login", async (req,res) => {
  await userService.UserService.getInstance().loginProcessing(req,res)
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
