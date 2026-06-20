'use client';

import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Collapse,
  Button,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  SwapVert as SortIcon,
  ArrowUpward as AscIcon,
  ArrowDownward as DescIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Priority, Status, SortBy, TaskFilters } from '@/types/task';

interface FilterPanelProps {
  filters: TaskFilters;
  onStatusChange: (status: Status | 'All') => void;
  onPriorityChange: (priority: Priority | 'All') => void;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onReset: () => void;
}

const statusOptions: (Status | 'All')[] = ['All', 'Pending', 'In Progress', 'Completed'];
const priorityOptions: (Priority | 'All')[] = ['All', 'Low', 'Medium', 'High'];
const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

const statusColors: Record<string, string> = {
  All: '#64748B',
  Pending: '#F59E0B',
  'In Progress': '#2563EB',
  Completed: '#10B981',
};

const priorityColors: Record<string, string> = {
  All: '#64748B',
  Low: '#10B981',
  Medium: '#F59E0B',
  High: '#EF4444',
};

export default function FilterPanel({
  filters,
  onStatusChange,
  onPriorityChange,
  onSortByChange,
  onSortOrderChange,
  onReset,
}: FilterPanelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = React.useState(!isMobile);

  const hasActiveFilters =
    filters.statusFilter !== 'All' ||
    filters.priorityFilter !== 'All' ||
    filters.sortBy !== 'createdAt';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <Box>
        {/* Mobile Toggle */}
        {isMobile && (
          <Button
            id="filter-toggle-btn"
            size="small"
            startIcon={<FilterIcon />}
            onClick={() => setExpanded(!expanded)}
            sx={{
              mb: 1.5,
              color: hasActiveFilters ? '#2563EB' : '#64748B',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'none',
            }}
          >
            Filters {hasActiveFilters && '(Active)'}
          </Button>
        )}

        <Collapse in={expanded || !isMobile}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* Status Filter */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: 0.75,
                  display: 'block',
                }}
              >
                Status
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {statusOptions.map((status) => (
                  <Chip
                    key={status}
                    id={`filter-status-${status.toLowerCase().replace(' ', '-')}`}
                    label={status}
                    size="small"
                    variant={filters.statusFilter === status ? 'filled' : 'outlined'}
                    onClick={() => onStatusChange(status)}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      borderRadius: '8px',
                      height: 30,
                      transition: 'all 0.2s ease',
                      ...(filters.statusFilter === status
                        ? {
                            backgroundColor: statusColors[status],
                            color: '#fff',
                            borderColor: statusColors[status],
                            boxShadow: `0 2px 8px ${statusColors[status]}40`,
                            '&:hover': {
                              backgroundColor: statusColors[status],
                            },
                          }
                        : {
                            borderColor: '#E2E8F0',
                            color: '#64748B',
                            '&:hover': {
                              borderColor: statusColors[status],
                              color: statusColors[status],
                              backgroundColor: `${statusColors[status]}08`,
                            },
                          }),
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Priority Filter */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: 0.75,
                  display: 'block',
                }}
              >
                Priority
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {priorityOptions.map((priority) => (
                  <Chip
                    key={priority}
                    id={`filter-priority-${priority.toLowerCase()}`}
                    label={priority}
                    size="small"
                    variant={filters.priorityFilter === priority ? 'filled' : 'outlined'}
                    onClick={() => onPriorityChange(priority)}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      borderRadius: '8px',
                      height: 30,
                      transition: 'all 0.2s ease',
                      ...(filters.priorityFilter === priority
                        ? {
                            backgroundColor: priorityColors[priority],
                            color: '#fff',
                            borderColor: priorityColors[priority],
                            boxShadow: `0 2px 8px ${priorityColors[priority]}40`,
                            '&:hover': {
                              backgroundColor: priorityColors[priority],
                            },
                          }
                        : {
                            borderColor: '#E2E8F0',
                            color: '#64748B',
                            '&:hover': {
                              borderColor: priorityColors[priority],
                              color: priorityColors[priority],
                              backgroundColor: `${priorityColors[priority]}08`,
                            },
                          }),
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Sort Controls */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: 0.75,
                  display: 'block',
                }}
              >
                Sort By
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <Select
                    id="sort-by-select"
                    value={filters.sortBy}
                    onChange={(e) => onSortByChange(e.target.value as SortBy)}
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      borderRadius: '8px',
                      height: 30,
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E2E8F0',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#CBD5E1',
                      },
                    }}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.8rem' }}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'} arrow>
                  <IconButton
                    id="sort-order-btn"
                    size="small"
                    onClick={() =>
                      onSortOrderChange(filters.sortOrder === 'asc' ? 'desc' : 'asc')
                    }
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      color: '#64748B',
                      backgroundColor: '#fff',
                      '&:hover': {
                        borderColor: '#2563EB',
                        color: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.04)',
                      },
                    }}
                  >
                    {filters.sortOrder === 'asc' ? (
                      <AscIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <DescIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Reset */}
            {hasActiveFilters && (
              <Box sx={{ alignSelf: 'flex-end' }}>
                <Tooltip title="Reset all filters" arrow>
                  <IconButton
                    id="reset-filters-btn"
                    size="small"
                    onClick={onReset}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '8px',
                      border: '1px solid #FEE2E2',
                      color: '#EF4444',
                      backgroundColor: '#FEF2F2',
                      '&:hover': {
                        backgroundColor: '#FEE2E2',
                      },
                    }}
                  >
                    <ResetIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    </motion.div>
  );
}
