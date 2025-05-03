const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const mongoose = require("mongoose");

// GET /todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(" Error fetching todos:", err);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// POST /todos
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(" Error adding todo:", err);
    res.status(500).json({ message: "Error adding todo" });
  }
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo ID" });
  }

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error(" Error deleting todo:", err);
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
