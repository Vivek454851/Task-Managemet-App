const { v4: uuidv4 } = require('uuid');

/**
 * Valid priority values
 */
const PRIORITIES = ['Low', 'Medium', 'High'];

/**
 * Valid status values
 */
const STATUSES = ['Pending', 'In Progress', 'Completed'];

/**
 * Create a new task object with defaults and UUID
 * @param {Object} data - Task data from request body
 * @returns {Object} Complete task object
 */
const createTask = (data) => {
  return {
    id: uuidv4(),
    title: data.title.trim(),
    description: data.description.trim(),
    priority: data.priority || 'Medium',
    status: data.status || 'Pending',
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Merge updated fields into an existing task
 * @param {Object} existingTask - The current task object
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated task object
 */
const updateTask = (existingTask, updates) => {
  return {
    ...existingTask,
    title: updates.title !== undefined ? updates.title.trim() : existingTask.title,
    description: updates.description !== undefined ? updates.description.trim() : existingTask.description,
    priority: updates.priority || existingTask.priority,
    status: updates.status || existingTask.status,
    dueDate: updates.dueDate || existingTask.dueDate,
  };
};

module.exports = { createTask, updateTask, PRIORITIES, STATUSES };
