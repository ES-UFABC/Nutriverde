import * as mongodb from "mongodb";
import { config } from "../config";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";

/**
 * Configure session storage
 */
const Store = ConnectMongoDBSession(session);
export const sessionStore = new Store({
  uri: config.db.url,
  databaseName: config.db.name,
  collection: config.db.collections.sessions,
});

/**
 * Instantiate the singleton client
 */
const client = new mongodb.MongoClient(config.db.url, {
  useUnifiedTopology: true,
});
let bucket: mongodb.GridFSBucket;

/**
 * Connect to the database
 */
export async function connect() {
  try {
    await client.connect();
    bucket = new mongodb.GridFSBucket(getDb());
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database");
    throw error;
  }
}

/**
 * Disconnect from the database
 */
export async function disconnect() {
  try {
    if (client.isConnected()) {
      await client.close();
      console.log("Closed database connection");
    }
  } catch (error) {
    console.error("Failed to close database connection");
    throw error;
  }
}

/**
 * Get the singleton database instance
 * @returns the database instance
 */
export function getDb() {
  return client.db(config.db.name);
}

export function getBucket() {
  return bucket;
}
