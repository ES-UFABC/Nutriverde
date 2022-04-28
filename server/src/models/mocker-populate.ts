import e from "express";
import * as mocker from "../mocker";
import * as producerModel from "../models/producer-model";
import * as productModel from "../models/product-model";

//const producerResponse = producerModel.ProducerDAO.getInstance().
//insert(producerModel.Producer.decode(mocker.newProducer()))
// dbConnect
//   .connect()
//   .then(async () => {

//     const productResponse = await productModel.ProductDAO.getInstance().
//     insert(productModel.Product.decode(mocker.newProduct(2)))

//   })
//   .catch((error) => {
//     console.error("Failed to load server stack");
//     console.error(error.stack);
//   });
// export class breeder {

export async function add(req: e.Request, res: e.Response) {
  try {
    const p = mocker.newProducer(); // para poder colher o nome
    const producerResponse =
      await producerModel.ProducerDAO.getInstance().insert(
        producerModel.Producer.decode(p)
      );
    const pReturned = await producerModel.ProducerDAO.getInstance().findByname(
      p.name
    ); // para poder colher id
    const pId = pReturned.id; // para relacionar aos produtos
    let productR = ""; // acumulador de sucessos dos produtos
    for (let index = mocker.randomRange(); index > 0; index--) {
      const productResponse =
        await productModel.ProductDAO.getInstance().insert(
          productModel.Product.decode(mocker.newProduct(pId))
        );
      productR += producerResponse;
    }
    console.log("mocker-worked:", producerResponse, productR);
    res.status(200).json({ message: "mocks success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error generating mocks" });
  }
}
// }
