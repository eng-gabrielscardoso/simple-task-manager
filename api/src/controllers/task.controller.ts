import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../helpers/http";
import { ApiDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";
import secrets from "../helpers/secrets";

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
      const { title, description, status } = req.body;

      if (!title) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Title is required.",
        });
        return;
      }

      const task = ApiDataSource.getRepository(Task).create({
        title,
        description,
        status: status || TaskStatus.PENDING,
      });

      await ApiDataSource.getRepository(Task).save(task);

      return res.status(HttpStatusCode.CREATED).json({
        data: task,
      });
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "An error occurred during operation. If this persist please contact support.",
      });
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

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

      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? task.status;

      await ApiDataSource.getRepository(Task).save(task);

      res.status(HttpStatusCode.OK).json({
        data: task,
      });
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
