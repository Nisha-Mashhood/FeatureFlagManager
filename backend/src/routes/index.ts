import { Router } from "express";
import healthRouter from "@/routes/health.routes";
import organizationRouter from "@/routes/organization.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/organizations", organizationRouter);

export default router;