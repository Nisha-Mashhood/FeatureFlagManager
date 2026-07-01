import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT ?? "5000",
    NODE_ENV: process.env.NODE_ENV ?? "development",

    MONGO_URI: process.env.MONGO_URI!,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ?? "15m",

    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ?? "7d",

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL!,

    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD!,

    CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
};