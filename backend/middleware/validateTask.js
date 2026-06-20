const { PRIORITIES, STATUSES } = require('../models/taskModel');

/**
 * Validate task data for create and update operations
 * Returns 400 with descriptive error messages on validation failure
 */
const validateTask = (req, res, next) => {
  const { title, description, priority, status, dueDate } = req.body;
  const errors = [];

  // Title validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  } else if (title.trim().length > 200) {
    errors.push('Title must not exceed 200 characters');
  }

  // Description validation
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  } else if (description.trim().length > 2000) {
    errors.push('Description must not exceed 2000 characters');
  }

  // Due date validation
  if (!dueDate) {
    errors.push('Due date is required');
  } else {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due date must be a valid date format');
    }
  }

  // Priority validation (optional, defaults in model)
  if (priority && !PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${PRIORITIES.join(', ')}`);
  }

  // Status validation (optional, defaults in model)
  if (status && !STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = validateTask;
