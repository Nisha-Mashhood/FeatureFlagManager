import bcrypt from "bcrypt";

import { appConfig } from "@/config/app.config";

export class PasswordUtil {
    public static async hashPassword(
        password: string,
    ): Promise<string> {
        return await bcrypt.hash(
            password,
            appConfig.BCRYPT_SALT_ROUNDS,
        );
    }

    public static async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(
            password,
            hashedPassword,
        );
    }
}