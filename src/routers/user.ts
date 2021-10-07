import express from "express";
import mongoose from "mongoose";
import { User } from "../models/user";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

userRouter.get("/users", async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Not Found" });
  }
  try {
    const user = await User.findByIdAndDelete(userId, { new: true });
    if (!user) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
