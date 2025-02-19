import { ReactNode, useEffect, useRef, useState } from "react";
import { Task } from "@/interfaces/task";
import { TaskService } from "@/services/tasks/tasks.service";
import { TaskCard } from "./TaskCard";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

const taskService = new TaskService();

export const TaskManager = () => {
  const toast = useRef<Toast | null>(null);

    const showToast = (
      severity?:
        | "success"
        | "info"
        | "warn"
        | "error"
        | "secondary"
        | "contrast"
        | undefined,
      summary?: ReactNode,
      detail?: ReactNode
    ) => {
      toast.current?.show({ severity, summary, detail });
    };

  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {data} = await taskService.findAll();
        setTasks(data?.data);
      } catch (err) {
        showToast("error", "Error during loading tasks", err as ReactNode)
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  if (tasks === undefined) {
    return <ProgressSpinner />;
  }

  return (
    <div className="w-full grid align-items-center">
      <Toast ref={toast} />
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
