import { useCallback, useEffect, useMemo } from 'react';
import useTaskStore from '@/store/taskStore';
import { Task, TaskFormData } from '@/types/task';

/**
 * Custom hook wrapping the Zustand task store.
 * Provides a clean API for components to interact with task state.
 */
export function useTasks() {
  const store = useTaskStore();

  // Fetch tasks on first mount
  useEffect(() => {
    if (store.tasks.length === 0 && !store.loading) {
      store.fetchTasks();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return store.getFilteredTasks();
  }, [store.tasks, store.filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Memoized stats
  const stats = useMemo(() => {
    return store.getStats();
  }, [store.tasks]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Task CRUD Handlers ─────────────────────────────────
  const handleCreateTask = useCallback(
    async (data: TaskFormData) => {
      const task = await store.addTask(data);
      store.closeModals();
      return task;
    },
    [store]
  );

  const handleUpdateTask = useCallback(
    async (id: string, data: TaskFormData) => {
      const task = await store.updateTask(id, data);
      store.closeModals();
      return task;
    },
    [store]
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      await store.removeTask(id);
      store.closeModals();
    },
    [store]
  );

  return {
    // State
    tasks: store.tasks,
    filteredTasks,
    stats,
    loading: store.loading,
    error: store.error,
    filters: store.filters,

    // Modal state
    isCreateModalOpen: store.isCreateModalOpen,
    isEditModalOpen: store.isEditModalOpen,
    isDeleteDialogOpen: store.isDeleteDialogOpen,
    selectedTask: store.selectedTask,

    // Data actions
    fetchTasks: store.fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,

    // Filter actions
    setSearchQuery: store.setSearchQuery,
    setStatusFilter: store.setStatusFilter,
    setPriorityFilter: store.setPriorityFilter,
    setSortBy: store.setSortBy,
    setSortOrder: store.setSortOrder,
    resetFilters: store.resetFilters,

    // Modal actions
    openCreateModal: store.openCreateModal,
    openEditModal: store.openEditModal,
    openDeleteDialog: store.openDeleteDialog,
    closeModals: store.closeModals,
  };
}
