import { TaskStatus } from "@/interfaces/task";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/schemas/task";
import { z } from "zod";
import { Toast } from "primereact/toast";

type CreateTaskForm = z.infer<typeof createTaskSchema>;

export const CreateTask = () => {
  const toast = useRef(null);
  const [isVisible, toggleVisible] = useState(false);

  const showToast = (
    severity: string,
    summary: string,
    detail: string | unknown | null
  ) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
      });
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: undefined,
    },
  });

  const onSubmit = (data: CreateTaskForm) => {
    try {
      console.log("Task Created:", data);
      showToast("success", "Task created successfully");
    } catch (err) {
      showToast("error", "Error during task creation.", err);
    } finally {
      reset();
      toggleVisible(false);
    }
  };

  const onClose = () => {
    reset();
    toggleVisible(false);
  };

  const statuses = [
    { label: "Pending", value: TaskStatus.PENDING },
    { label: "In Progress", value: TaskStatus.IN_PROGRESS },
    { label: "Completed", value: TaskStatus.COMPLETED },
  ];

  return (
    <>
      <Toast ref={toast} />
      <Button
        icon="pi pi-plus-circle"
        type="button"
        label="Add"
        onClick={() => toggleVisible(true)}
      />
      <Dialog
        visible={isVisible}
        modal
        header={<h2 className="text-lg m-0 font-bold">Create a new task</h2>}
        footer={
          <Button
            label="Ok"
            icon="pi pi-check"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            autoFocus
            size="small"
            className="m-0"
          />
        }
        style={{ width: "400px" }}
        onHide={onClose}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column w-full gap-2"
        >
          <div>
            <InputText
              id="title"
              {...register("title")}
              placeholder="Title"
              className={`w-full ${errors.title ? "p-invalid" : ""}`}
            />
            {errors.title && (
              <small className="p-error">{errors.title.message}</small>
            )}
          </div>
          <div>
            <InputText
              id="description"
              {...register("description")}
              placeholder="Description"
              className={`w-full ${errors.description ? "p-invalid" : ""}`}
            />
            {errors.description && (
              <small className="p-error">{errors.description.message}</small>
            )}
          </div>
          <div>
            <Dropdown
              inputId="status"
              value={watch("status")}
              onChange={(e) => setValue("status", e.value)}
              options={statuses}
              optionLabel="label"
              placeholder="Status"
              className={`w-full ${errors.status ? "p-invalid" : ""}`}
            />
            {errors.status && (
              <small className="p-error">{errors.status.message}</small>
            )}
          </div>
        </form>
      </Dialog>
    </>
  );
};
