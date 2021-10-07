import express from "express";
import mongoose from "mongoose";

import { Task } from "../models/task";

export const taskRouter = express.Router();

taskRouter.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    const result = await task.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "No Result" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(404).json({ error: "Not Found" });
  }
  try {
    const task = await Task.findByIdAndDelete(taskId, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});