import { Priority, Status } from '@/types/task';

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date string to a relative format (e.g., "2 days ago", "in 3 days")
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};

/**
 * Check if a date is overdue
 */
export const isOverdue = (dateString: string, status: Status): boolean => {
  if (status === 'Completed') return false;
  const date = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date < now;
};

/**
 * Get color for priority
 */
export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    High: '#EF4444',
    Medium: '#F59E0B',
    Low: '#10B981',
  };
  return colors[priority];
};

/**
 * Get background color for priority
 */
export const getPriorityBgColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    High: 'rgba(239, 68, 68, 0.1)',
    Medium: 'rgba(245, 158, 11, 0.1)',
    Low: 'rgba(16, 185, 129, 0.1)',
  };
  return colors[priority];
};

/**
 * Get color for status
 */
export const getStatusColor = (status: Status): string => {
  const colors: Record<Status, string> = {
    Pending: '#F59E0B',
    'In Progress': '#2563EB',
    Completed: '#10B981',
  };
  return colors[status];
};

/**
 * Get background color for status
 */
export const getStatusBgColor = (status: Status): string => {
  const colors: Record<Status, string> = {
    Pending: 'rgba(245, 158, 11, 0.1)',
    'In Progress': 'rgba(37, 99, 235, 0.1)',
    Completed: 'rgba(16, 185, 129, 0.1)',
  };
  return colors[status];
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get priority numeric value for sorting
 */
export const getPriorityValue = (priority: Priority): number => {
  const values: Record<Priority, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
  };
  return values[priority];
};

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

/**
 * Get today's date as YYYY-MM-DD
 */
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
