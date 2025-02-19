import { useEffect, useState } from "react";
import { Task } from "@/interfaces/task";
import { TaskService } from "@/services/tasks/tasks.service";
import { TaskCard } from "./TaskCard";
import { ConfirmDialog } from "primereact/confirmdialog";

const taskService = new TaskService();

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {data} = await taskService.findAll();
        setTasks(data?.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  if (tasks === undefined) {
    return <span>Loading tasks...</span>;
  }

  return (
    <div className="w-full grid">
      <ConfirmDialog />
      {tasks.length === 0 ? (
        <span>No tasks yet</span>
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
