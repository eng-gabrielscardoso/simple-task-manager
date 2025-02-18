import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../helpers/http";
import { ApiDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";
import { createTaskSchema, updateTaskSchema } from "../schemas/task";

export class TaskController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await ApiDataSource.getRepository(Task).find();

      res.status(HttpStatusCode.OK).json({
        data: tasks,
      });
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = createTaskSchema.safeParse(req.body);

      if (!parsedBody.success) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: parsedBody.error.errors,
        });
        return;
      }

      const task = ApiDataSource.getRepository(Task).create(parsedBody.data);

      await ApiDataSource.getRepository(Task).save(task);

      res.status(HttpStatusCode.CREATED).json({ data: task });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const parsedBody = updateTaskSchema.partial().safeParse(req.body);

      if (!parsedBody.success) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: parsedBody.error.errors,
        });
        return;
      }

      const task = await ApiDataSource.getRepository(Task).findOne({
        where: { id: Number(id) },
      });

      if (!task) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          message: `Task with ID ${id} not found.`,
        });
        return;
      }

      Object.assign(task, parsedBody.data);

      await ApiDataSource.getRepository(Task).save(task);

      res.status(HttpStatusCode.OK).json({ data: task });
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const task = await ApiDataSource.getRepository(Task).findOne({
        where: {
          id: Number(id),
        },
      });

      if (!task) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          message: `Task with ID ${id} not found.`,
        });
        return;
      }

      await ApiDataSource.getRepository(Task).remove(task);

      res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    }
  }
}
