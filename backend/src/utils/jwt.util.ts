import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { IJwtPayload } from "@/interfaces/common/i-jwt-payload";

export class JwtUtil {
    public static generateAccessToken(
        payload: IJwtPayload,
    ): string {
        return jwt.sign(
            payload,
            env.JWT_ACCESS_SECRET,
            {
                expiresIn: env.ACCESS_TOKEN_EXPIRY,
            },
        );
    }

    public static generateRefreshToken(
        payload: IJwtPayload,
    ): string {
        return jwt.sign(
            payload,
            env.JWT_REFRESH_SECRET,
            {
                expiresIn: env.REFRESH_TOKEN_EXPIRY,
            },
        );
    }

    public static verifyAccessToken(
        token: string,
    ): IJwtPayload {
        const payload = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET,
        );
        return payload as IJwtPayload;
    }

    public static verifyRefreshToken(
        token: string,
    ): IJwtPayload {
        const payload = jwt.verify(
            token,
            env.JWT_REFRESH_SECRET,
        );
        return payload as IJwtPayload;
    }
}