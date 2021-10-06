import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "task-manager";

async function main() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");

    // Establish and verify connection
    const db = client.db(dbName);

    // DELETE
    await db.collection("users").deleteMany({ age: 20 });
  } catch (error) {
    console.error(error);
    console.log("Unable to connect to database!");
  } finally {
    await client.close();
  }
}

main();
