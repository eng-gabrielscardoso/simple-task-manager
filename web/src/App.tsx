import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navbar } from "./components/base/Navbar";
import { TaskManager } from "./components/tasks/TasksManager";
import { Footer } from "./components/base/Footer";
import { Task } from './interfaces/task';
import { TaskService } from "@/services/tasks/tasks.service";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

const taskService = new TaskService();

export const App = () => {
  const toast = useRef<Toast | null>(null);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  const showToast = (
    severity?: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined,
    summary?: ReactNode,
    detail?: ReactNode
  ) => {
    toast.current?.show({ severity, summary, detail });
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [...(prevTasks ?? []), newTask]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await taskService.findAll();
        setTasks(data?.data);
      } catch (err) {
        showToast("error", "Error during loading tasks", err as ReactNode);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

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
        <TaskManager tasks={tasks} />
        <Footer />
      </main>
    </>
  );
};
