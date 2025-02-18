import { TaskCard } from "./TaskCard";

export const TaskManager = () => {
  return (
    <div className="grid">
      {new Array(12).fill(0).map((_, index) => (
        <div className="col-12 sm:col-6 lg:col-4" key={index}>
          <TaskCard />
        </div>
      ))}
    </div>
  );
};
