import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../helpers/http";

export class HealthController {
  static async health(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(HttpStatusCode.OK).json({
        message: "OK",
      });
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error!",
      });
    }
  }
}
