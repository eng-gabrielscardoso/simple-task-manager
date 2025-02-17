import { Router } from "express";
import { HealthRouter } from "./health.route";

const router: Router = Router();

router.use(HealthRouter)

export const Routes: Router = router;
