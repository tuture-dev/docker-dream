const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

/**
 * GET /todos
 * 获取全部 Todo
 */
router.get("/", (req, res) => {
  Todo.find({}, {}, { sort: { timestamp: 1 } }, (err, todos) => {
    if (err) throw err;
    res.json(todos);
  });
});

/**
 * GET /todos/:id
 * 获取单个 Todo
 */
router.get("/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) throw err;
    res.json(todo);
  });
});

/**
 * POST /todos
 * 创建新的 Todo
 */
router.post("/", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false
  });

  newTodo.save((err, todo) => {
    if (err) throw err;
    res.status(201).json(todo);
  });
});

/**
 * PUT /todos/:id
 * 创建新的 Todo
 */
router.put("/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body, (err, todo) => {
    if (err) throw err;
    res.json(todo);
  });
});

/**
 * DELETE /todos/:id
 * 删除单个 Todo
 */
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, err => {
    if (err) throw err;
    res.status(204).json({});
  });
});

module.exports = router;
