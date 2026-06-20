// ─── Task Types ─────────────────────────────────────────────

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';
export type SortBy = 'dueDate' | 'createdAt' | 'priority';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

// ─── API Response Types ─────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

// ─── Filter Types ───────────────────────────────────────────

export interface TaskFilters {
  searchQuery: string;
  statusFilter: Status | 'All';
  priorityFilter: Priority | 'All';
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
}

// ─── Dashboard Stats ────────────────────────────────────────

export interface DashboardStatsData {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  highPriority: number;
}
