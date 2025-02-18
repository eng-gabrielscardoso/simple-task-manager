import { TaskController } from "./task.controller";
import { ApiDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";
import { HttpStatusCode } from "../helpers/http";
import { Request, Response, NextFunction } from "express";

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();

  return res;
};

const mockRequest = (): Partial<Request> => ({});

const mockNext = jest.fn();

jest.mock("../data-source", () => ({
  ApiDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    }),
  },
}));

describe("TaskController", () => {
  describe("index", () => {
    it("should return a list of tasks", async () => {
      const tasks = [
        { id: 1, title: "Task 1", status: TaskStatus.IN_PROGRESS },
        { id: 2, title: "Task 2", status: TaskStatus.COMPLETED },
      ];

      (ApiDataSource.getRepository(Task).find as jest.Mock).mockResolvedValue(tasks);

      const req = mockRequest();
      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.index(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ data: tasks });
    });

    it("should return 500 if an error occurs", async () => {
      (ApiDataSource.getRepository(Task).find as jest.Mock).mockRejectedValue(new Error("Database error"));

      const req = mockRequest();
      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.index(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    });
  });

  describe("store", () => {
    it("should create a new task and return 201", async () => {
      const newTask = { title: "New Task", status: TaskStatus.IN_PROGRESS };
      const createdTask = { id: 1, ...newTask };

      (ApiDataSource.getRepository(Task).create as jest.Mock).mockReturnValue(createdTask);
      (ApiDataSource.getRepository(Task).save as jest.Mock).mockResolvedValue(createdTask);

      const req = mockRequest();
      req.body = newTask;

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.store(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith({ data: createdTask });
    });

    it("should return 400 if validation fails", async () => {
      const invalidTask = { title: "", status: TaskStatus.IN_PROGRESS };

      const req = mockRequest();
      req.body = invalidTask;

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.store(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: "Validation failed.",
        errors: expect.any(Array),
      });
    });

    it("should return 500 if an error occurs", async () => {
      const newTask = { title: "New Task", status: TaskStatus.IN_PROGRESS };

      (ApiDataSource.getRepository(Task).create as jest.Mock).mockReturnValue(newTask);
      (ApiDataSource.getRepository(Task).save as jest.Mock).mockRejectedValue(new Error("Database error"));

      const req = mockRequest();
      req.body = newTask;

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.store(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    });
  });

  describe("update", () => {
    it("should update an existing task and return 200", async () => {
      const updatedTask = { id: 1, title: "Updated Task", status: TaskStatus.COMPLETED };

      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockResolvedValue(updatedTask);
      (ApiDataSource.getRepository(Task).save as jest.Mock).mockResolvedValue(updatedTask);

      const req = mockRequest();
      req.params = { id: "1" };
      req.body = { title: "Updated Task", status: TaskStatus.COMPLETED };

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.update(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ data: updatedTask });
    });

    it("should return 404 if task is not found", async () => {
      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockResolvedValue(null);

      const req = mockRequest();
      req.params = { id: "999" };
      req.body = { title: "Updated Task", status: TaskStatus.COMPLETED };

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.update(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task with ID 999 not found.",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = mockRequest();
      req.params = { id: "1" };
      req.body = { title: "Updated Task", status: TaskStatus.COMPLETED };

      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.update(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    });
  });

  describe("destroy", () => {
    it("should delete a task and return 204", async () => {
      const taskToDelete = { id: 1, title: "Task to Delete", status: TaskStatus.IN_PROGRESS };

      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockResolvedValue(taskToDelete);
      (ApiDataSource.getRepository(Task).remove as jest.Mock).mockResolvedValue(undefined);

      const req = mockRequest();
      req.params = { id: "1" };

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.destroy(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.NO_CONTENT);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 404 if task is not found", async () => {
      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockResolvedValue(null);

      const req = mockRequest();
      req.params = { id: "999" };

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.destroy(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task with ID 999 not found.",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = mockRequest();
      req.params = { id: "1" };

      (ApiDataSource.getRepository(Task).findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

      const res = mockResponse();
      const next: NextFunction = mockNext;

      await TaskController.destroy(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    });
  });
});
