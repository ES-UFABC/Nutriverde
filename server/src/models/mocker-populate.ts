import * as mocker from "../mocker"
import * as producerModel from "../models/producer-model";
import * as userModel from "../models/user-model";
import * as productModel from "../models/product-model";

import * as dbConnect from "./db-connection";

//const producerResponse = producerModel.ProducerDAO.getInstance().
//insert(producerModel.Producer.decode(mocker.newProducer()))
dbConnect
  .connect()
  .then(async () => {

    const productResponse = await productModel.ProductDAO.getInstance().
    insert(productModel.Product.decode(mocker.newProduct(2)))

  })
  .catch((error) => {
    console.error("Failed to load server stack");
    console.error(error.stack);
  });
