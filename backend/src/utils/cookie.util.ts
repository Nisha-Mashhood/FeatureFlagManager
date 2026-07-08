import { Response } from "express";

import { env } from "@/config/env";
import { COOKIE } from "@/constants/cookie-names";

export class CookieUtil {
    public static setAccessToken(
        res: Response,
        accessToken: string,
    ): void {
        res.cookie(COOKIE.ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
    }

    public static setRefreshToken(
        res: Response,
        refreshToken: string,
    ): void {
        res.cookie(COOKIE.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }

    public static clearAuthCookies(
        res: Response,
    ): void {
        res.clearCookie(COOKIE.ACCESS_TOKEN);
        res.clearCookie(COOKIE.REFRESH_TOKEN);
    }
}