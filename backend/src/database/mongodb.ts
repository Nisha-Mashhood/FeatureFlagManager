import mongoose from "mongoose";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";


export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI);

        logger.success("MongoDB connected successfully.");
    } catch (error) {
        logger.error("Failed to connect to MongoDB.", error);

        process.exit(1);
    }
};