'use client';

import React from 'react';
import {
  Box,
  Typography,
  Fab,
  Tooltip,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DashboardStats from '@/components/DashboardStats';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import TaskTable from '@/components/TaskTable';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import EmptyState from '@/components/EmptyState';
import { StatsLoader, TableLoader, CardLoader } from '@/components/Loader';
import { useTasks } from '@/hooks/useTasks';
import { useSnackbar } from '@/components/SnackbarProvider';
import { TaskFormData } from '@/types/task';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { showSuccess, showError } = useSnackbar();

  const {
    filteredTasks,
    stats,
    loading,
    filters,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    selectedTask,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
    openCreateModal,
    openEditModal,
    openDeleteDialog,
    closeModals,
  } = useTasks();

  // ─── CRUD Handlers with Snackbar ──────────────────────────
  const onCreateTask = async (data: TaskFormData) => {
    try {
      await handleCreateTask(data);
      showSuccess('Task created successfully! 🎉');
    } catch {
      showError('Failed to create task. Please try again.');
    }
  };

  const onUpdateTask = async (data: TaskFormData) => {
    if (!selectedTask) return;
    try {
      await handleUpdateTask(selectedTask.id, data);
      showSuccess('Task updated successfully! ✅');
    } catch {
      showError('Failed to update task. Please try again.');
    }
  };

  const onDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      await handleDeleteTask(selectedTask.id);
      showSuccess('Task deleted successfully! 🗑️');
    } catch {
      showError('Failed to delete task. Please try again.');
    }
  };

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.statusFilter !== 'All' ||
    filters.priorityFilter !== 'All';

  return (
    <>
      <Navbar />

      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
        }}
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  letterSpacing: '-0.02em',
                  color: '#0F172A',
                }}
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#94A3B8',
                  fontSize: '0.85rem',
                  mt: 0.25,
                }}
              >
                Manage and track all your tasks in one place
              </Typography>
            </Box>

            {!isMobile && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Fab
                  id="create-task-fab"
                  variant="extended"
                  onClick={openCreateModal}
                  sx={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    borderRadius: '14px',
                    px: 3,
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                    },
                  }}
                >
                  <AddIcon sx={{ mr: 0.75, fontSize: 20 }} />
                  New Task
                </Fab>
              </motion.div>
            )}
          </Box>
        </motion.div>

        {/* Stats Section */}
        <Box sx={{ mb: 3 }}>
          {loading ? <StatsLoader /> : <DashboardStats stats={stats} />}
        </Box>

        {/* Search + Filters Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 3,
            alignItems: { md: 'flex-end' },
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { md: 400 } }}>
            <SearchBar value={filters.searchQuery} onChange={setSearchQuery} />
          </Box>
          <Box sx={{ flex: 2 }}>
            <FilterPanel
              filters={filters}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onSortByChange={setSortBy}
              onSortOrderChange={setSortOrder}
              onReset={resetFilters}
            />
          </Box>
        </Box>

        {/* Task Count */}
        {!loading && filteredTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#94A3B8',
                fontWeight: 500,
                fontSize: '0.78rem',
                mb: 2,
              }}
            >
              Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
              {hasActiveFilters && ' (filtered)'}
            </Typography>
          </motion.div>
        )}

        {/* Tasks Display */}
        {loading ? (
          isMobile ? (
            <CardLoader />
          ) : (
            <TableLoader />
          )
        ) : filteredTasks.length === 0 ? (
          <EmptyState onCreateTask={openCreateModal} hasFilters={hasActiveFilters} />
        ) : isMobile ? (
          /* Mobile Card View */
          <Grid container spacing={2}>
            <AnimatePresence>
              {filteredTasks.map((task, index) => (
                <Grid key={task.id} size={{ xs: 12, sm: 6 }}>
                  <TaskCard
                    task={task}
                    index={index}
                    onEdit={openEditModal}
                    onDelete={openDeleteDialog}
                  />
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        ) : (
          /* Desktop Table View */
          <TaskTable
            tasks={filteredTasks}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
          />
        )}
      </Box>

      {/* Mobile FAB */}
      {isMobile && (
        <Tooltip title="Create new task" arrow placement="left">
          <Fab
            id="mobile-create-task-fab"
            onClick={openCreateModal}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#fff',
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
              zIndex: 1100,
              '&:hover': {
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.5)',
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}

      {/* Modals */}
      <TaskModal
        open={isCreateModalOpen}
        mode="create"
        onSubmit={onCreateTask}
        onClose={closeModals}
      />
      <TaskModal
        open={isEditModalOpen}
        mode="edit"
        task={selectedTask}
        onSubmit={onUpdateTask}
        onClose={closeModals}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        task={selectedTask}
        onConfirm={onDeleteTask}
        onClose={closeModals}
      />
    </>
  );
}
