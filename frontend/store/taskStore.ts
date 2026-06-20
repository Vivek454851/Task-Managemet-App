import { create } from 'zustand';
import { Task, TaskFormData, Priority, Status, SortBy, TaskFilters, DashboardStatsData } from '@/types/task';
import * as taskService from '@/services/taskService';
import { getPriorityValue } from '@/utils/helpers';

// ─── Store State Interface ──────────────────────────────────
interface TaskState {
  // Data
  tasks: Task[];
  loading: boolean;
  error: string | null;

  // Filters
  filters: TaskFilters;

  // Modal States
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedTask: Task | null;

  // Actions — Data
  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<Task>;
  updateTask: (id: string, data: TaskFormData) => Promise<Task>;
  removeTask: (id: string) => Promise<void>;

  // Actions — Filters
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: Status | 'All') => void;
  setPriorityFilter: (priority: Priority | 'All') => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  resetFilters: () => void;

  // Actions — Modals
  openCreateModal: () => void;
  openEditModal: (task: Task) => void;
  openDeleteDialog: (task: Task) => void;
  closeModals: () => void;

  // Computed
  getFilteredTasks: () => Task[];
  getStats: () => DashboardStatsData;
}

// ─── Default Filters ────────────────────────────────────────
const defaultFilters: TaskFilters = {
  searchQuery: '',
  statusFilter: 'All',
  priorityFilter: 'All',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

// ─── Zustand Store ──────────────────────────────────────────
const useTaskStore = create<TaskState>((set, get) => ({
  // ─── Initial State ──────────────────────────────────────
  tasks: [],
  loading: false,
  error: null,
  filters: { ...defaultFilters },
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteDialogOpen: false,
  selectedTask: null,

  // ─── Data Actions ───────────────────────────────────────
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch tasks', loading: false });
      throw error;
    }
  },

  addTask: async (data: TaskFormData) => {
    try {
      const newTask = await taskService.createTask(data);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      return newTask;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create task' });
      throw error;
    }
  },

  updateTask: async (id: string, data: TaskFormData) => {
    try {
      const updatedTask = await taskService.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
      return updatedTask;
    } catch (error: any) {
      set({ error: error.message || 'Failed to update task' });
      throw error;
    }
  },

  removeTask: async (id: string) => {
    try {
      await taskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete task' });
      throw error;
    }
  },

  // ─── Filter Actions ─────────────────────────────────────
  setSearchQuery: (query: string) => {
    set((state) => ({ filters: { ...state.filters, searchQuery: query } }));
  },

  setStatusFilter: (status: Status | 'All') => {
    set((state) => ({ filters: { ...state.filters, statusFilter: status } }));
  },

  setPriorityFilter: (priority: Priority | 'All') => {
    set((state) => ({ filters: { ...state.filters, priorityFilter: priority } }));
  },

  setSortBy: (sortBy: SortBy) => {
    set((state) => ({ filters: { ...state.filters, sortBy } }));
  },

  setSortOrder: (order: 'asc' | 'desc') => {
    set((state) => ({ filters: { ...state.filters, sortOrder: order } }));
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters } });
  },

  // ─── Modal Actions ──────────────────────────────────────
  openCreateModal: () => {
    set({ isCreateModalOpen: true, selectedTask: null });
  },

  openEditModal: (task: Task) => {
    set({ isEditModalOpen: true, selectedTask: task });
  },

  openDeleteDialog: (task: Task) => {
    set({ isDeleteDialogOpen: true, selectedTask: task });
  },

  closeModals: () => {
    set({
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteDialogOpen: false,
      selectedTask: null,
    });
  },

  // ─── Computed: Filtered & Sorted Tasks ──────────────────
  getFilteredTasks: () => {
    const { tasks, filters } = get();
    let filtered = [...tasks];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filters.statusFilter !== 'All') {
      filtered = filtered.filter((task) => task.status === filters.statusFilter);
    }

    // Priority filter
    if (filters.priorityFilter !== 'All') {
      filtered = filtered.filter((task) => task.priority === filters.priorityFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'priority':
          comparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  },

  // ─── Computed: Dashboard Stats ──────────────────────────
  getStats: () => {
    const { tasks } = get();
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'Pending').length,
      inProgress: tasks.filter((t) => t.status === 'In Progress').length,
      completed: tasks.filter((t) => t.status === 'Completed').length,
      highPriority: tasks.filter((t) => t.priority === 'High').length,
    };
  },
}));

export default useTaskStore;
