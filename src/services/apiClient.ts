import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

apiClient.interceptors.request.use(function (config) {
    const token = tokenStorage.getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})



apiClient.interceptors.response.use(function onFulfilled(response) {
    return response
}, function onRejected(error) {
    if (error.response?.status === 401) {
        tokenStorage.clearToken()
        window.location.href = '/login'
    }
    return Promise.reject(error)
})

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.detail || "Request failed";
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "Something went wrong";
}

export default apiClient