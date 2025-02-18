import { Navbar } from "./components/base/Navbar";
import { TaskManager } from "./components/tasks/TasksManager";
import { Footer } from "./components/base/Footer";

export const App = () => {
  return (
    <>
      <main className="w-full h-full min-w-screen min-h-screen flex flex-column align-items-center justify-content-center gap-4 p-4">
        <div className="w-full h-full px-4">
          <Navbar />
        </div>
        <div className="w-full h-full px-4">
          <TaskManager />
        </div>
        <div className="w-full h-full px-4">
          <Footer />
        </div>
      </main>
    </>
  );
};
