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
        const response = await apiClient.post('/auth/signup', data)
        tokenStorage.setToken(response.data.access_token)
        return response.data
    }

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/login', data)
        tokenStorage.setToken(response.data.access_token)
        return response.data
    }

    async SU(data) {
        const a = null
        tokenStorage.setToken(a ?? "eyJhbGciOiJFUzI1NiIsImtpZCI6IjljM2IwNDA2LWExMzEtNDk0NS04ZDVhLWNjNWY1MDUzNGZjMyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3F5Y2FoeHJrcGtyYW13cWd2aWpqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3ZWNjYjk2Mi05ZjBkLTQ0NGUtYmIwZC05MTc3NGQ5ODRmYmMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcxMjM0MTc2LCJpYXQiOjE3NzEyMzA1NzYsImVtYWlsIjoibmFtaG9uZ2RvYW45OUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoibmFtaG9uZ2RvYW45OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkhvbmciLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInByZWZlcmVuY2VzIjoidGVjaG5vbG9neSIsInN1YiI6IjdlY2NiOTYyLTlmMGQtNDQ0ZS1iYjBkLTkxNzc0ZDk4NGZiYyJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcxMjMwNTc2fV0sInNlc3Npb25faWQiOiIzYzFlZTk5YS1hNTdkLTRmY2UtYjY0ZS01NzM0NTZhZjExODkiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.DkdESxbZLNc_HVZzOrcfNxasnrsTsvNt_BWVD7rj3Xxlse4I7VNiXtDNwKdy5dRrlsWeRVT-_x1IlYJlF7Zeeg")
        console.log(tokenStorage.getToken())
    }

    async getCurrentUser() {

    }

    logout() {
        tokenStorage.clearToken();
    }
}

export const authService = new AuthService()
