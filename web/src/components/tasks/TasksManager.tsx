import { Task, TaskStatus } from "@/interfaces/task";
import { TaskCard } from "./TaskCard";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Lorem ipsu,',
    description: 'Dolor sit amet',
    status: TaskStatus.PENDING,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: 'Lorem ipsu,',
    description: 'Dolor sit amet',
    status: TaskStatus.IN_PROGRESS,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    title: 'Lorem ipsu,',
    description: 'Dolor sit amet',
    status: TaskStatus.COMPLETED,
    created_at: new Date(),
    updated_at: new Date(),
  }
]

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  return (
    <div className="grid">
      <ConfirmDialog />
      {tasks.map((task) => (
        <div className="col-12 sm:col-6 lg:col-4" key={task.id}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};
