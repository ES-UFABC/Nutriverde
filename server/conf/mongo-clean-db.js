// Mongoshell script to create an empty profiles db

db = connect("127.0.0.1:27017/NutriVerde");
db.dropDatabase();
db = connect("127.0.0.1:27017/NutriVerde");

/**
 * Sequences collection
 */
db.createCollection("sequences");
db.sequences.insertOne({
  name: "user_id",
  value: 1,
});
db.sequences.insertOne({
  name: "product_id",
  value: 1,
});

/**
 * Users collection
 */
db.createCollection("users");
db.users.createIndex({ id: 1 }, { unique: true });

/**
 * Products Colections
 */
db.createCollection("products");
db.products.createIndex({ id: 1 }, { unique: true });