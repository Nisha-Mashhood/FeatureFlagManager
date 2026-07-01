import { CorsOptions } from "cors";

import { env } from "@/config/env";

export const corsConfig: CorsOptions = {
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};