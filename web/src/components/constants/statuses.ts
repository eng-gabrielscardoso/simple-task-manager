import { TaskStatus } from "@/interfaces/task";

export const statuses = [
  { label: "Pending", value: TaskStatus.PENDING },
  { label: "In Progress", value: TaskStatus.IN_PROGRESS },
  { label: "Completed", value: TaskStatus.COMPLETED },
];
