import path from "path";
import express from "express";

const app = express();
const port = 3003;

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log("Server is up on http://localhost:" + port);
});
