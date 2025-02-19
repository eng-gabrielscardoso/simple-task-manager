import { ReactNode, useEffect, useRef, useState } from "react";
import { Navbar } from "./components/base/Navbar";
import { TaskManager } from "./components/tasks/TasksManager";
import { Footer } from "./components/base/Footer";
import { Task } from "./interfaces/task";
import { TaskService } from "@/services/tasks/tasks.service";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

const taskService = new TaskService();

export const App = () => {
  const toast = useRef<Toast | null>(null);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

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

  const sortTasks = (tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => a.id - b.id).reverse();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await taskService.findAll();
        setTasks(sortTasks(data?.data));
      } catch (err) {
        showToast("error", "Error during loading tasks", err as ReactNode);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTaskCreated = async (_newTask: Task) => {
    try {
      setTasks(undefined);
      const { data } = await taskService.findAll();
      setTasks(sortTasks(data?.data));
    } catch (err) {
      showToast("error", "Error during loading tasks", err as ReactNode);
      setTasks([]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onTaskUpdated = async (_updatedTask: Task) => {
    try {
      setTasks(undefined);
      const { data } = await taskService.findAll();
      setTasks(sortTasks(data?.data));
    } catch (err) {
      showToast("error", "Error during loading tasks", err as ReactNode);
      setTasks([]);
    }
  };

  if (tasks === undefined) {
    return (
      <main className="w-full h-full flex align-items-center justify-content-center">
        <ProgressSpinner />
      </main>
    );
  }

  return (
    <>
      <Toast ref={toast} />
      <main className="w-full h-full flex flex-column align-items-center justify-content-center gap-4 p-2">
        <Navbar onTaskCreated={handleTaskCreated} />
        <TaskManager tasks={tasks} onTaskUpdated={onTaskUpdated} />
        <Footer />
      </main>
    </>
  );
};
