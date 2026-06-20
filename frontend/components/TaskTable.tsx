'use client';

import React from 'react';
import { Box, Chip, IconButton, Tooltip, Typography, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Task } from '@/types/task';
import { formatDate, isOverdue, truncateText } from '@/utils/helpers';

interface TaskTableProps {
  tasks: Task[];
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

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Task Title',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<Task>) => {
        const isCompleted = params.row.status === 'Completed';
        return (
          <Box sx={{ py: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '0.85rem',
                color: isCompleted ? '#94A3B8' : '#0F172A',
                textDecoration: isCompleted ? 'line-through' : 'none',
                lineHeight: 1.4,
              }}
            >
              {params.row.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#94A3B8',
                fontSize: '0.72rem',
                lineHeight: 1.3,
                display: 'block',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {truncateText(params.row.description, 60)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<Task>) => {
        const config = priorityConfig[params.row.priority];
        return (
          <Chip
            label={params.row.priority}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.7rem',
              borderRadius: '6px',
              height: 26,
              color: config.color,
              backgroundColor: config.bg,
              border: `1px solid ${config.border}`,
            }}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<Task>) => {
        const config = statusConfig[params.row.status];
        return (
          <Chip
            label={params.row.status}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.7rem',
              borderRadius: '6px',
              height: 26,
              color: config.color,
              backgroundColor: config.bg,
              border: `1px solid ${config.border}`,
            }}
          />
        );
      },
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
      renderCell: (params: GridRenderCellParams<Task>) => {
        const overdue = isOverdue(params.row.dueDate, params.row.status);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <CalendarIcon
              sx={{
                fontSize: 15,
                color: overdue ? '#EF4444' : '#94A3B8',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8rem',
                fontWeight: 500,
                color: overdue ? '#EF4444' : '#64748B',
              }}
            >
              {formatDate(params.row.dueDate)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Task>) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Edit task" arrow>
            <IconButton
              id={`edit-task-${params.row.id}`}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(params.row);
              }}
              sx={{
                color: '#64748B',
                width: 32,
                height: 32,
                borderRadius: '8px',
                '&:hover': {
                  color: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <EditIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task" arrow>
            <IconButton
              id={`delete-task-${params.row.id}`}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(params.row);
              }}
              sx={{
                color: '#64748B',
                width: 32,
                height: 32,
                borderRadius: '8px',
                '&:hover': {
                  color: '#EF4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <DeleteIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <DataGrid
          rows={tasks}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          getRowHeight={() => 'auto'}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.7rem',
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              py: 1,
            },
            '& .MuiDataGrid-row': {
              transition: 'background-color 0.15s ease',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.02)',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FAFBFC',
            },
            '& .MuiTablePagination-root': {
              fontSize: '0.8rem',
            },
            '& .MuiDataGrid-overlay': {
              backgroundColor: 'rgba(248, 250, 252, 0.8)',
            },
          }}
        />
      </Paper>
    </motion.div>
  );
}
