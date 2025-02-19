import { Navbar } from "./components/base/Navbar";
import { TaskManager } from "./components/tasks/TasksManager";
import { Footer } from "./components/base/Footer";

export const App = () => {
  return (
    <>
      <main className="w-full h-full flex flex-column align-items-center justify-content-center gap-4 p-2">
          <Navbar />
          <TaskManager />
          <Footer />
      </main>
    </>
  );
};
