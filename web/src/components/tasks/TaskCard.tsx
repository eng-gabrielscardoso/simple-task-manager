import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { EditTask } from "./EditTask";
import { Task } from "@/interfaces/task";
import { statuses } from "../constants/statuses";

type TaskCardProps = {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const headerContent = (
    <div className="p-2 text-lg font-bold">#{task.id} - {task.title}</div>
  );

  const onUpdate = () => {}

  const footerContent = (
    <div className="text-sm flex flex-column sm:flex-row justify-content-between align-items-center gap-2">
      <div>
        <i className="font-italic">{statuses.find(status => status.value === task.status)?.label}</i>
      </div>
      <div className="flex justify-content-between align-items-center gap-1">
        <EditTask task={task} onUpdate={onUpdate} />
        <Button
          type="button"
          severity="success"
          size="small"
          icon="pi pi-check-circle"
          label="Conclude"
        />
      </div>
    </div>
  );

  return (
    <>
      <Card header={headerContent} footer={footerContent}>
        <p>
          {task.description}
        </p>
      </Card>
    </>
  );
};
