import "reflect-metadata";

import { App } from "@/app";
import { env } from "@/config/env";
import { connectDatabase } from "@/database/mongodb";
import { logger } from '@/utils/logger';

const bootstrap = async (): Promise<void> => {
    try {
        await connectDatabase();

        const application = new App();

        application.getApp().listen(env.PORT, () => {
            logger.success(
                `🚀 Server is running on http://localhost:${env.PORT}`,
            );
        });
    } catch (error) {
        logger.error("Failed to start server.", error);

        process.exit(1);
    }
};

void bootstrap();