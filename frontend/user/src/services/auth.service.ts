import api from "../api/axios";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
    name: string;
    email: string;
    password: string;
    organizationId: string;
}

export const signup = async (
    signupDto: SignupDto,
) => {
    const response = await api.post(
        "/auth/end-user/signup",
        signupDto,
    );

    return response.data;
};

export const me = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const login = async (loginDto: LoginDto) => {
  const response = await api.post("/auth/login", loginDto);

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};