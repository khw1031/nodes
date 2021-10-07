import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017";
const dbName = "task-manager-api";

mongoose.connect(url + "/" + dbName);
