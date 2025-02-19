import { CreateTask } from "@/components/tasks/CreateTask";
import brand64 from "@/assets/brand_64.png";
import { Task } from '@/interfaces/task';

interface NavbarProps {
  onTaskCreated: (task: Task) => void;
}

export const Navbar = ({ onTaskCreated }: NavbarProps) => {
  return (
    <>
      <nav className="flex justify-content-between align-items-center gap-2 w-full">
        <figure className="flex justify-content-between align-items-center gap-2">
          <img
            src={brand64}
            alt="Simple Task Manager Logo"
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-primary">STM</h1>
        </figure>
        <CreateTask onTaskCreated={onTaskCreated} />
      </nav>
    </>
  );
};
