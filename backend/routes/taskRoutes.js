const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTask = require('../middleware/validateTask');

// GET /api/tasks - Get all tasks
router.get('/', taskController.getTasks);

// GET /api/tasks/:id - Get single task
router.get('/:id', taskController.getTask);

// POST /api/tasks - Create new task (with validation)
router.post('/', validateTask, taskController.createTask);

// PUT /api/tasks/:id - Update task (with validation)
router.put('/:id', validateTask, taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
