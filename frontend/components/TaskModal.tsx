'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, TaskFormData, Priority, Status } from '@/types/task';
import { getTodayDate } from '@/utils/helpers';

interface TaskModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  task?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
}

const priorities: Priority[] = ['Low', 'Medium', 'High'];
const statuses: Status[] = ['Pending', 'In Progress', 'Completed'];

const priorityColors: Record<Priority, string> = {
  Low: '#10B981',
  Medium: '#F59E0B',
  High: '#EF4444',
};

const statusColors: Record<Status, string> = {
  Pending: '#F59E0B',
  'In Progress': '#2563EB',
  Completed: '#10B981',
};

export default function TaskModal({
  open,
  mode,
  task,
  onSubmit,
  onClose,
}: TaskModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: getTodayDate(),
    },
  });

  // Reset form when modal opens with task data
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && task) {
        reset({
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate.split('T')[0],
        });
      } else {
        reset({
          title: '',
          description: '',
          priority: 'Medium',
          status: 'Pending',
          dueDate: getTodayDate(),
        });
      }
    }
  }, [open, mode, task, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
  };

  const isCreate = mode === 'create';

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              component: motion.div,
              initial: { opacity: 0, scale: 0.92, y: 30 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.92, y: 30 },
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
              sx: {
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.25)',
              },
            } as any,
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              px: 3,
              background: isCreate
                ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
              color: '#fff',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                {isCreate ? (
                  <AddIcon sx={{ fontSize: 20 }} />
                ) : (
                  <EditIcon sx={{ fontSize: 20 }} />
                )}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {isCreate ? 'Create New Task' : 'Edit Task'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, fontSize: '0.7rem' }}
                >
                  {isCreate
                    ? 'Fill in the details to create a task'
                    : 'Update the task details below'}
                </Typography>
              </Box>
            </Box>
            <IconButton
              id="close-task-modal"
              onClick={onClose}
              sx={{
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogContent sx={{ px: 3, py: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Title */}
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Task title is required',
                    maxLength: { value: 200, message: 'Title cannot exceed 200 characters' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="task-title-input"
                      label="Task Title"
                      placeholder="Enter a descriptive task title..."
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      sx={{
                        '& .MuiInputLabel-root': { fontSize: '0.85rem', fontWeight: 500 },
                      }}
                    />
                  )}
                />

                {/* Description */}
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: 'Description is required',
                    maxLength: {
                      value: 2000,
                      message: 'Description cannot exceed 2000 characters',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="task-description-input"
                      label="Description"
                      placeholder="Describe what needs to be done..."
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      sx={{
                        '& .MuiInputLabel-root': { fontSize: '0.85rem', fontWeight: 500 },
                      }}
                    />
                  )}
                />

                {/* Priority & Status row */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="task-priority-select"
                        label="Priority"
                        select
                        fullWidth
                        sx={{
                          '& .MuiInputLabel-root': { fontSize: '0.85rem', fontWeight: 500 },
                        }}
                      >
                        {priorities.map((p) => (
                          <MenuItem key={p} value={p}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: priorityColors[p],
                                }}
                              />
                              {p}
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="task-status-select"
                        label="Status"
                        select
                        fullWidth
                        sx={{
                          '& .MuiInputLabel-root': { fontSize: '0.85rem', fontWeight: 500 },
                        }}
                      >
                        {statuses.map((s) => (
                          <MenuItem key={s} value={s}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: statusColors[s],
                                }}
                              />
                              {s}
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>

                {/* Due Date */}
                <Controller
                  name="dueDate"
                  control={control}
                  rules={{ required: 'Due date is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="task-due-date-input"
                      label="Due Date"
                      type="date"
                      fullWidth
                      error={!!errors.dueDate}
                      helperText={errors.dueDate?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                      sx={{
                        '& .MuiInputLabel-root': { fontSize: '0.85rem', fontWeight: 500 },
                      }}
                    />
                  )}
                />
              </Box>
            </DialogContent>

            {/* Footer */}
            <DialogActions
              sx={{
                px: 3,
                py: 2,
                borderTop: '1px solid #F1F5F9',
                gap: 1.5,
              }}
            >
              <Button
                id="cancel-task-btn"
                onClick={onClose}
                variant="outlined"
                sx={{
                  borderRadius: '10px',
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    borderColor: '#CBD5E1',
                    backgroundColor: '#F8FAFC',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                id="submit-task-btn"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  borderRadius: '10px',
                  fontWeight: 600,
                  px: 3,
                  background: isCreate
                    ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                    : 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                  boxShadow: isCreate
                    ? '0 4px 14px rgba(37, 99, 235, 0.3)'
                    : '0 4px 14px rgba(124, 58, 237, 0.3)',
                  '&:hover': {
                    background: isCreate
                      ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                      : 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                  },
                }}
              >
                {isCreate ? 'Create Task' : 'Save Changes'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
