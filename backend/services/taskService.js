const { readTasks, writeTasks } = require('../utils/fileHelper');
const { createTask: createTaskModel, updateTask: updateTaskModel } = require('../models/taskModel');
const { ApiError } = require('../middleware/errorHandler');

/**
 * Get all tasks
 * @returns {Promise<Array>} All tasks
 */
const getAllTasks = async () => {
  const tasks = await readTasks();
  return tasks;
};

/**
 * Get a single task by ID
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Task object
 * @throws {ApiError} 404 if task not found
 */
const getTaskById = async (id) => {
  const tasks = await readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new ApiError(404, `Task with ID '${id}' not found`);
  }

  return task;
};

/**
 * Create a new task
 * @param {Object} data - Task data from request body
 * @returns {Promise<Object>} Newly created task
 */
const createTask = async (data) => {
  const tasks = await readTasks();
  const newTask = createTaskModel(data);
  tasks.push(newTask);
  await writeTasks(tasks);
  return newTask;
};

/**
 * Update an existing task
 * @param {string} id - Task UUID
 * @param {Object} data - Updated task data
 * @returns {Promise<Object>} Updated task object
 * @throws {ApiError} 404 if task not found
 */
const updateTaskById = async (id, data) => {
  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new ApiError(404, `Task with ID '${id}' not found`);
  }

  const updatedTask = updateTaskModel(tasks[index], data);
  tasks[index] = updatedTask;
  await writeTasks(tasks);
  return updatedTask;
};

/**
 * Delete a task by ID
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Deleted task object
 * @throws {ApiError} 404 if task not found
 */
const deleteTaskById = async (id) => {
  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new ApiError(404, `Task with ID '${id}' not found`);
  }

  const [deletedTask] = tasks.splice(index, 1);
  await writeTasks(tasks);
  return deletedTask;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
