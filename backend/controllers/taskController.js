const taskService = require('../services/taskService');

/**
 * GET /api/tasks
 * Retrieve all tasks
 */
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/tasks/:id
 * Retrieve a single task by ID
 */
const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/tasks
 * Create a new task
 */
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Update an existing task
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskById(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTaskById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
