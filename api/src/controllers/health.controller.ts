import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../helpers/http";

class HealthController {
  async health(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HttpStatusCode.OK).json({
        status: "OK",
      });
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error!",
      });
    }
  }
}

export default new HealthController
