import type { User } from "../models/user";
import apiClient from "./apiClient";
import { tokenStorage } from "../utils/tokenStorage";

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    preferences: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token?: string;
}

class AuthService {
    async signup(data: SignupRequest): Promise<AuthResponse> {
        const response = await apiClient.post("/auth/signup", data);
        tokenStorage.setToken(response.data.access_token);
        return response.data;
    }

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post("/auth/login", data);
        tokenStorage.setToken(response.data.access_token);
        return response.data;
    }

    async getCurrentUser() {}

    logout() {
        tokenStorage.clearToken();
    }
}

export const authService = new AuthService();
