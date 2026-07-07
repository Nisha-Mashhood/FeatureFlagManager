import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appConfig } from "@/config/app.config";
import { corsConfig } from "@/config/cors.config";
import router from "./routes";
import { API_PREFIX } from "@/constants/routes";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export class App {
    private readonly app: Application;

    constructor() {
        this.app = express();

        this.registerMiddlewares();
        this.registerRoutes();
        this.registerExceptionHandlers();
    }

    private registerMiddlewares(): void {
        this.app.use(cors(corsConfig));

        this.app.use(
            express.json({
                limit: appConfig.JSON_LIMIT,
            }),
        );

        this.app.use(
            express.urlencoded({
                extended: true,
                limit: appConfig.URL_ENCODED_LIMIT,
            }),
        );

        this.app.use(cookieParser());
    }

    private registerRoutes(): void {
        this.app.use(API_PREFIX, router)
    } 

    private registerExceptionHandlers(): void {
        this.app.use(notFoundMiddleware);
        this.app.use(errorMiddleware);
    }

    public getApp(): Application {
        return this.app;
    }
}