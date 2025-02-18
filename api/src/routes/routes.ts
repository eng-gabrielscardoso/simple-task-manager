import { Router } from "express";
import { HealthRouter } from "./health.routes";
import { TaskRouter } from "./task.routes";

const router: Router = Router();

router.use(HealthRouter)
router.use(TaskRouter)

export const Routes: Router = router;
