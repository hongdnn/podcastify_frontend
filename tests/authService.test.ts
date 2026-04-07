import { describe, it, expect, vi, beforeEach } from "vitest";
import apiClient from "../src/services/apiClient";
import { tokenStorage } from "../src/utils/tokenStorage";
import { authService } from "../src/services/authService";

vi.mock("../src/utils/tokenStorage", () => ({
    tokenStorage: {
        setToken: vi.fn(),
        getToken: vi.fn(),
        clearToken: vi.fn(),
    },
}));

vi.mock("../src/services/apiClient", () => ({
    default: { post: vi.fn() },
}));
describe("authService.signup", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("signup success", async () => {
        const payload = {
            email: "test@example.com",
            password: "secret",
            name: "Test User",
            preferences: "tech",
        };

        const responseData = {
            user: {
                id: "u1",
                name: "Test User",
                email: "test@example.com",
                preferences: "tech",
                created_at: "2026-02-16T00:00:00Z",
            },
            access_token: "access123",
            refresh_token: "refresh123",
        };

        const postMock = apiClient.post as ReturnType<typeof vi.fn>;
        postMock.mockResolvedValue({data: responseData})
        const result = await authService.signup(payload)

        expect(apiClient.post).toHaveBeenCalledWith('/auth/signup', payload);
        expect(tokenStorage.setToken).toHaveBeenCalledWith("access123")
        expect(result).toEqual(responseData)
    })

    it("propagates errors and does not store token when signup fails", async () => {
        const payload = {
            email: "test@example.com",
            password: "secret",
            name: "Test User",
            preferences: "tech",
        };

        const error = new Error("Signup failed");
        const postMock = apiClient.post as ReturnType<typeof vi.fn>;
        postMock.mockRejectedValue(error);

        await expect(authService.signup(payload)).rejects.Throw(error);
        expect(tokenStorage.setToken).toHaveBeenCalledTimes(0)
    });
});
