// Mongoshell script to create an empty profiles db

db = connect("127.0.0.1:27017/NutriVerde");
db.dropDatabase();
db = connect("127.0.0.1:27017/NutriVerde");

/**
 * Sequences collection
 */
db.createCollection("sequences");
db.sequences.insertOne({
  name: "producer_id",
  value: 1,
});
db.sequences.insertOne({
  name: "product_id",
  value: 1,
});
function nextProducerId() {
  return db.sequences.findOneAndUpdate(
    { name: "producer_id" },
    { $inc: { value: 1 } }
  ).value;
}

function nextProductId() {
  return db.sequences.findOneAndUpdate(
    { name: "product_id" },
    { $inc: { value: 1 } }
  ).value;
}

/**
 * Producers collection
 */
db.createCollection("producers");

db.producers.createIndex({ id: 1 }, { unique: true });

db.producers.insertOne({
  id: nextProducerId(),
  name: "Vitor",
  fantasyName: "Fazenda do Vitor ",
  email: "vitor.fazenda@gnail.com",
  paymentMethods: ["Pix", "Dinheiro", "PayPal"],
});
db.producers.insertOne({
  id: nextProducerId(),
  name: "Jonathan",
  fantasyName: "Fazenda do Jonhatan ",
  email: "jonathan.fazenda@gnail.com",
  paymentMethods: ["Pix", "Dinheiro", "PayPal", "Débito"],
});

db.producers.insertOne({
  id: nextProducerId(),
  name: "Fabio",
  fantasyName: "Fazenda do Fabio ",
  email: "Fabio.fazenda@gnail.com",
  paymentMethods: ["Ouro", "Dinheiro", "PayPal"],
});

/**
 * Products Colections
 *
 *
 */

db.createCollection("products");

db.products.createIndex({ id: 1 }, { unique: true });

db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo",
  price: 12,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo",
  price: 13,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo raizes",
  price: 14,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Banana",
  unitOfMeas: "Penca", // the unitOfMeas username
  typology: "Fruta",
  price: 12,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 2302,
  cover: "",
});

db.products.insertOne({
  id: nextProductId(),
  name: "Banana",
  unitOfMeas: "duzia", // the unitOfMeas username
  typology: "Fruta",
  price: 3,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 2302,
  cover: "",
});

db.products.insertOne({
  id: nextProductId(),
  name: "Alface",
  unitOfMeas: "pé", // the unitOfMeas username
  typology: "hortaliça",
  price: 1,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 1203123,
  cover: "",
});
