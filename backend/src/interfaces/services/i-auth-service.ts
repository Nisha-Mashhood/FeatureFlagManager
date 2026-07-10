import { IAuthResponseDto } from "@/interfaces/dto/auth/i-auth-response.dto";
import { ILoginDto } from "@/interfaces/dto/auth/i-login.dto";
import { ISignupDto } from "@/interfaces/dto/auth/i-signup.dto";

export interface IAuthService {
  login(loginDto: ILoginDto): Promise<IAuthResponseDto>;

  // signup(
  //     signupDto: ISignupDto,
  // ): Promise<void>;

  signupOrganizationAdmin(signupDto: ISignupDto): Promise<void>;

  signupEndUser(signupDto: ISignupDto): Promise<void>;

  logout(): Promise<void>;
}
