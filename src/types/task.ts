export type PriorityType = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: PriorityType;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  description?: string;
  dueDate: Date;
  priority: PriorityType;
  status: TaskStatus;
} 