import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { EditTask } from "./EditTask";
import { Task, TaskStatus } from "@/interfaces/task";
import { statuses } from "@/constants/statuses";
import { ReactNode, useRef } from "react";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { TaskService } from "@/services/tasks/tasks.service";

type TaskCardProps = {
  task: Task;
  onTaskUpdate: (task: Task) => void;
};

const taskService: TaskService = new TaskService();

export const TaskCard = ({ task, onTaskUpdate }: TaskCardProps) => {
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

  const headerContent = (
    <div className="p-3 text-lg font-bold">
      #{task.id} - {task.title}
    </div>
  );

  const confirmConclusion = async () => {
    confirmDialog({
      message: `Do you want to conclude task #${task.id}?`,
      header: "Conclusion confirmation",
      icon: "pi pi-check-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-success",
      accept: async () => {
        try {
          const { data: response } = await taskService.update(task.id, {
            status: TaskStatus.COMPLETED
          });

          if (response.data) {
            onTaskUpdate({
              ...task,
              status: TaskStatus.COMPLETED
            });
            showToast("success", "Task concluded");
          }
        } catch (err) {
          showToast("error", "Error during conclusion", err as ReactNode);
        }
      },
      reject: async () => {
        try {
          showToast("info", "Operation aborted");
        } catch (err) {
          showToast("error", "Error during rejection", err as ReactNode);
        }
      },
    });
  };

  const footerContent = (
    <div className="text-sm flex flex-column sm:flex-row justify-content-between align-items-center gap-2">
      <div>
        <i className="font-italic">
          {statuses.find((status) => status.value === task.status)?.label}
        </i>
      </div>
      <div className="flex justify-content-between align-items-center gap-1">
        <EditTask task={task} onTaskUpdated={onTaskUpdate} />
        <Button
          type="button"
          severity="success"
          size="small"
          icon="pi pi-check-circle"
          label="Conclude"
          onClick={confirmConclusion}
        />
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Card header={headerContent} footer={footerContent}>
        <p>{task.description}</p>
      </Card>
    </>
  );
};
