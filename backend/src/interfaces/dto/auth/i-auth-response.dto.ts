import { IAuthUserDto } from "./i-auth-user.dto";

export interface IAuthResponseDto {
    user: IAuthUserDto;

    accessToken: string;

    refreshToken: string;
}