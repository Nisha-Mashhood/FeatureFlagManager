import api from "../api/axios";

export interface LoginDto {
  email: string;
  password: string;
}

export const login = async (loginDto: LoginDto) => {
  const response = await api.post("/auth/login", loginDto);

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const me = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
