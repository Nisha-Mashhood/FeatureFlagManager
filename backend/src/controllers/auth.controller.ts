import { NextFunction, Request, Response } from "express";

import { AbstractController } from "@/controllers/abstract-controller";
import { IAuthController } from "@/interfaces/controllers/i-auth-controller";
import { IAuthService } from "@/interfaces/services/i-auth-service";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/identifiers";
import { CookieUtil } from "@/utils/cookie.util";
import { AUTH_MESSAGES } from "@/constants/auth-messages";

@injectable()
export class AuthController
  extends AbstractController
  implements IAuthController
{
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: IAuthService,
  ) {
    super();
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.authService.login(req.body);

      CookieUtil.setAccessToken(res, result.accessToken);

      CookieUtil.setRefreshToken(res, result.refreshToken);

      this.ok(
        res,
        {
          user: result.user,
        },
        AUTH_MESSAGES.LOGIN_SUCCESS,
      );
    } catch (error) {
      next(error);
    }
  }

  public async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.authService.signup(req.body);

      this.created(res, undefined, "Registration successful.");
    } catch (error) {
      next(error);
    }
  }
}
