import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;

  // signup(req: Request, res: Response, next: NextFunction): Promise<void>;

  signupOrganizationAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  signupEndUser(req: Request, res: Response, next: NextFunction): Promise<void>;

  logout(req: Request, res: Response, next: NextFunction): Promise<void>;

  me(req: Request, res: Response): Promise<void>;
}
