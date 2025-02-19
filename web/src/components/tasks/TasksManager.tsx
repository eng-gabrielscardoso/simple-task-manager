import { Task } from "@/interfaces/task";
import { TaskCard } from "./TaskCard";
import { ConfirmDialog } from "primereact/confirmdialog";

interface TaskManagerProps {
  tasks: Task[];
}

export const TaskManager = ({ tasks }: TaskManagerProps) => {
  return (
    <div className="w-full grid align-items-center">
      <ConfirmDialog />
      {tasks.length === 0 ? (
        <div className="w-full text-center">No tasks yet</div>
      ) : (
        tasks.map((task) => (
          <div className="col-12 sm:col-6 lg:col-4" key={task.id}>
            <TaskCard task={task} />
          </div>
        ))
      )}
    </div>
  );
};
