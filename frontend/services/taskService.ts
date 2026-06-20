import axios, { AxiosError } from 'axios';
import { Task, TaskFormData, ApiResponse } from '@/types/task';

// ─── Axios Instance ─────────────────────────────────────────
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ─── Response Interceptor ───────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string; errors?: string[] }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}: ${message}`);

    return Promise.reject({
      message,
      errors: error.response?.data?.errors || [],
      status: error.response?.status || 500,
    });
  }
);

// ─── Task API Service ───────────────────────────────────────

/**
 * Fetch all tasks
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<ApiResponse<Task[]>>('/tasks');
  return response.data.data;
};

/**
 * Fetch a single task by ID
 */
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
  return response.data.data;
};

/**
 * Create a new task
 */
export const createTask = async (data: TaskFormData): Promise<Task> => {
  const response = await api.post<ApiResponse<Task>>('/tasks', data);
  return response.data.data;
};

/**
 * Update an existing task
 */
export const updateTask = async (id: string, data: TaskFormData): Promise<Task> => {
  const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data);
  return response.data.data;
};

/**
 * Delete a task
 */
export const deleteTask = async (id: string): Promise<Task> => {
  const response = await api.delete<ApiResponse<Task>>(`/tasks/${id}`);
  return response.data.data;
};

export default api;
