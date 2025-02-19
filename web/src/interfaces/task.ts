export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id: number
  title: string
  description?: string
  status: TaskStatus
  created_at: Date
  updated_at: Date
}
