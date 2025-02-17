import { Router } from "express";
import { HealthRouter } from "./health.routes";

const router: Router = Router();

router.use(HealthRouter)

export const Routes: Router = router;
