'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Task } from '@/types/task';
import { formatDate, formatRelativeDate, isOverdue } from '@/utils/helpers';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Pending: {
    color: '#D97706',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  'In Progress': {
    color: '#2563EB',
    bg: 'rgba(37, 99, 235, 0.1)',
    border: 'rgba(37, 99, 235, 0.25)',
  },
  Completed: {
    color: '#059669',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
  },
};

const priorityConfig: Record<string, { color: string; bg: string; border: string }> = {
  High: {
    color: '#DC2626',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.25)',
  },
  Medium: {
    color: '#D97706',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  Low: {
    color: '#059669',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === 'Completed';
  const overdue = isOverdue(task.dueDate, task.status);
  const sConfig = statusConfig[task.status];
  const pConfig = priorityConfig[task.priority];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, scale: 1.01 }}
      layout
    >
      <Card
        id={`task-card-${task.id}`}
        elevation={0}
        sx={{
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          backgroundColor: isCompleted ? '#FAFBFC' : '#fff',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            borderColor: '#CBD5E1',
            boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <CardContent sx={{ p: '16px !important' }}>
          {/* Top row: badges + actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              <Chip
                label={task.status}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  height: 24,
                  borderRadius: '6px',
                  color: sConfig.color,
                  backgroundColor: sConfig.bg,
                  border: `1px solid ${sConfig.border}`,
                }}
              />
              <Chip
                icon={<FlagIcon sx={{ fontSize: '13px !important', color: `${pConfig.color} !important` }} />}
                label={task.priority}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  height: 24,
                  borderRadius: '6px',
                  color: pConfig.color,
                  backgroundColor: pConfig.bg,
                  border: `1px solid ${pConfig.border}`,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 0.25 }}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  id={`card-edit-${task.id}`}
                  size="small"
                  onClick={() => onEdit(task)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '8px',
                    color: '#94A3B8',
                    '&:hover': {
                      color: '#2563EB',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    },
                  }}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  id={`card-delete-${task.id}`}
                  size="small"
                  onClick={() => onDelete(task)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '8px',
                    color: '#94A3B8',
                    '&:hover': {
                      color: '#EF4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              color: isCompleted ? '#94A3B8' : '#0F172A',
              textDecoration: isCompleted ? 'line-through' : 'none',
              mb: 0.5,
              lineHeight: 1.4,
            }}
          >
            {task.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: '#94A3B8',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              mb: 1.5,
              textDecoration: isCompleted ? 'line-through' : 'none',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Typography>

          {/* Due Date */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              pt: 1,
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <CalendarIcon
              sx={{
                fontSize: 14,
                color: overdue ? '#EF4444' : '#94A3B8',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: overdue ? '#EF4444' : '#94A3B8',
                fontWeight: overdue ? 600 : 500,
                fontSize: '0.72rem',
              }}
            >
              {formatDate(task.dueDate)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: overdue ? '#EF4444' : '#CBD5E1',
                fontSize: '0.68rem',
                ml: 0.5,
              }}
            >
              ({formatRelativeDate(task.dueDate)})
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
