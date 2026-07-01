import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { appConfig } from "@/config/app.config";
import { corsConfig } from "@/config/cors.config";

export class App {
    private readonly app: Application;

    constructor() {
        this.app = express();

        this.registerMiddlewares();
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

    public getApp(): Application {
        return this.app;
    }
}