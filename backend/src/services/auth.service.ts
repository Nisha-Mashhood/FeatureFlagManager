import { IUserRepository } from "@/interfaces/repositories/i-user-repository";
import { IAuthService } from "@/interfaces/services/i-auth-service";
import { ILoginDto } from "@/interfaces/dto/auth/i-login.dto";
import { ISignupDto } from "@/interfaces/dto/auth/i-signup.dto";
import { IAuthResponseDto } from "@/interfaces/dto/auth/i-auth-response.dto";
import { ROLE, Role } from "@/constants/roles";
import { JwtUtil } from "@/utils/jwt.util";
import { IUser } from "@/interfaces/models/i-user";
import { IAuthUserDto } from "@/interfaces/dto/auth/i-auth-user.dto";
import { PasswordUtil } from "@/utils/password.util";
import { STATUS_CODE } from "@/constants/status-codes";
import { AUTH_MESSAGES } from "@/constants/auth-messages";
import { HttpError } from "@/errors/http-error";
import { env } from "@/config/env";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/identifiers";
import { IOrganizationRepository } from "@/interfaces/repositories/i-organization-repository";
import { ORGANIZATION_MESSAGES } from "@/constants/organization-message";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  private generateTokens(userId: string, role: Role) {
    const payload = {
      userId,
      role,
    };

    return {
      accessToken: JwtUtil.generateAccessToken(payload),

      refreshToken: JwtUtil.generateRefreshToken(payload),
    };
  }

  private mapUserToAuthUserDto(user: IUser): IAuthUserDto {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    };
  }

  private async loginSuperAdmin(
    loginDto: ILoginDto,
  ): Promise<IAuthResponseDto> {
    const isPasswordValid = await PasswordUtil.comparePassword(
      loginDto.password,
      env.SUPER_ADMIN_PASSWORD,
    );

    if (!isPasswordValid) {
      throw new HttpError(
        STATUS_CODE.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    const tokens = this.generateTokens("super-admin", ROLE.SUPER_ADMIN);

    return {
      user: {
        id: "super-admin",
        name: "Super Admin",
        email: env.SUPER_ADMIN_EMAIL,
        role: ROLE.SUPER_ADMIN,
      },

      accessToken: tokens.accessToken,

      refreshToken: tokens.refreshToken,
    };
  }

  private async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpError(
        STATUS_CODE.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    return user;
  }

  private ensureUserApproved(user: IUser): void {
    if (!user.isApproved) {
      throw new HttpError(
        STATUS_CODE.FORBIDDEN,
        AUTH_MESSAGES.ACCOUNT_NOT_APPROVED,
      );
    }
  }
  
  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordValid = await PasswordUtil.comparePassword(
      plainPassword,
      hashedPassword,
    );

    if (!isPasswordValid) {
      throw new HttpError(
        STATUS_CODE.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS,
      );
    }
  }

  private async loginOrganizationAdmin(
    loginDto: ILoginDto,
  ): Promise<IAuthResponseDto> {
    const user = await this.findUserByEmail(loginDto.email);

    this.ensureUserApproved(user);

    await this.validatePassword(loginDto.password, user.password);

    const tokens = this.generateTokens(user.id!, user.role);

    return {
      user: this.mapUserToAuthUserDto(user),

      accessToken: tokens.accessToken,

      refreshToken: tokens.refreshToken,
    };
  }

  public async login(loginDto: ILoginDto): Promise<IAuthResponseDto> {
    const email = loginDto.email.trim().toLowerCase();

    if (email === env.SUPER_ADMIN_EMAIL.toLowerCase().trim()) {
      return await this.loginSuperAdmin(loginDto);
    }

    return await this.loginOrganizationAdmin(loginDto);
  }

  private async ensureOrganizationExists(
    organizationId: string,
  ): Promise<void> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new HttpError(
        STATUS_CODE.NOT_FOUND,
        ORGANIZATION_MESSAGES.NOT_FOUND,
      );
    }
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpError(
        STATUS_CODE.CONFLICT,
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
      );
    }
  }

  private async createOrganizationAdmin(signupDto: ISignupDto): Promise<void> {
    const hashedPassword = await PasswordUtil.hashPassword(signupDto.password);

    await this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      organizationId: signupDto.organizationId,
      role: ROLE.ORGANIZATION_ADMIN,
      isApproved: false,
    });
  }

  public async signup(signupDto: ISignupDto): Promise<void> {
    await this.ensureOrganizationExists(signupDto.organizationId);

    await this.ensureEmailIsUnique(signupDto.email);

    await this.createOrganizationAdmin(signupDto);
  }
}
