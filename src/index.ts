import express from "express";
import "./db/mongoose";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
