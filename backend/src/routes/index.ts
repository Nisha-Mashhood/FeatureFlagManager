import { Router } from "express";
import healthRouter from "@/routes/health.routes";
import organizationRouter from "@/routes/organization.routes";
import authRouter from "@/routes/auth.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/organizations", organizationRouter);
router.use("/auth", authRouter);
router.use("/users",userRouter);

export default router;