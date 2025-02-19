import { Task } from "@/interfaces/task";
import { http } from "../http";

export class TaskService {
  async findAll() {
    console.log(import.meta.env.API_URL)
    return await http.get("/tasks");
  }

  async findOne(id: number) {
    return await http.get(`/tasks/${id}`);
  }

  async create(task: Partial<Task>) {
    return await http.post("/tasks", task);
  }

  async update(id: number, task: Partial<Task>) {
    return await http.patch(`/tasks/${id}`, task);
  }

  async delete(id: number) {
    return await http.delete(`/tasks/${id}`);
  }
}
