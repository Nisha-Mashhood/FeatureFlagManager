import { env } from "./env";

export const appConfig = {
    JSON_LIMIT: "10mb",
    URL_ENCODED_LIMIT: "10mb",
    BCRYPT_SALT_ROUNDS: Number(env.BCRYPT_SALT_ROUNDS),
} as const;