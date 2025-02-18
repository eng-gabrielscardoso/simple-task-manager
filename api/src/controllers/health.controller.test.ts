import { Request, Response, NextFunction } from "express";
import { HealthController } from "./health.controller";
import { HttpStatusCode } from "../helpers/http";

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};

const mockRequest = (): Partial<Request> => ({});

const mockNext = jest.fn();

describe("HealthController", () => {
  describe("health", () => {
    it("should return status OK with message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next: NextFunction = mockNext;

      await HealthController.health(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ message: "OK" });
    });
  });
});
