const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");

router.get('/tasks', tasksController.getTasks)

router.get('/tasks/:id', tasksController.getTask)

router.post("/tasks", tasksController.createTask);

router.put("/tasks/:id", tasksController.toggleTask);

router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;