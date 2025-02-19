import { Task, TaskStatus } from "@/interfaces/task";
import { TaskCard } from "./TaskCard";

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
  return (
    <div className="grid">
      {mockTasks.map((task, index) => (
        <div className="col-12 sm:col-6 lg:col-4" key={index}>
          <TaskCard task={task} key={index} />
        </div>
      ))}
    </div>
  );
};
