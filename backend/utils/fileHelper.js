const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

/**
 * Read all tasks from the JSON file
 * @returns {Promise<Array>} Array of task objects
 */
const readTasks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    if (error.code === 'ENOENT') {
      await writeTasks([]);
      return [];
    }
    throw new Error(`Failed to read tasks data: ${error.message}`);
  }
};

/**
 * Write tasks array to the JSON file
 * @param {Array} tasks - Array of task objects to write
 * @returns {Promise<void>}
 */
const writeTasks = async (tasks) => {
  try {
    // Ensure data directory exists
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write tasks data: ${error.message}`);
  }
};

module.exports = { readTasks, writeTasks };
