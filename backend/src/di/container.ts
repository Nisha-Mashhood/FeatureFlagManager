import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "@/di/identifiers";

import { IOrganizationRepository } from "@/interfaces/repositories/i-organization-repository";
import { IUserRepository } from "@/interfaces/repositories/i-user-repository";

import { IOrganizationService } from "@/interfaces/services/i-organization-service";
import { IAuthService } from "@/interfaces/services/i-auth-service";

import { IOrganizationController } from "@/interfaces/controllers/i-organization-controller";
import { IAuthController } from "@/interfaces/controllers/i-auth-controller";

import { OrganizationRepository } from "@/repositories/organization.repository";
import { UserRepository } from "@/repositories/user.repository";

import { OrganizationService } from "@/services/organization.service";
import { AuthService } from "@/services/auth.service";

import { OrganizationController } from "@/controllers/organization.controller";
import { AuthController } from "@/controllers/auth.controller";
import { IUserService } from "@/interfaces/services/i-user-service";
import { UserService } from "@/services/user.service";
import { IUserController } from "@/interfaces/controllers/i-user-controller";
import { UserController } from "@/controllers/user.controller";

const container = new Container();

// Repositories
container
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(OrganizationRepository);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

// Services
container
  .bind<IOrganizationService>(TYPES.OrganizationService)
  .to(OrganizationService);

container.bind<IAuthService>(TYPES.AuthService).to(AuthService);

container.bind<IUserService>(TYPES.UserService).to(UserService);

// Controllers
container
  .bind<IOrganizationController>(TYPES.OrganizationController)
  .to(OrganizationController);

container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

container.bind<IUserController>(TYPES.UserController).to(UserController);

export { container };
