import { Router } from "express";
import healthRouter from "@/routes/health.routes";
import organizationRouter from "@/routes/organization.routes";
import authRouter from "@/routes/auth.routes";
import userRouter from "./user.routes";
import featureFlagRouter from "./feature-flag.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/organizations", organizationRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/feature-flags", featureFlagRouter);

export default router;
