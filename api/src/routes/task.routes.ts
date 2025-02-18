import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router: Router = Router();

router.get("/tasks", TaskController.index);
router.post("/tasks", TaskController.store);
router.get("/tasks/:id", TaskController.show);
router.patch("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.destroy);

export const TaskRouter: Router = router;
