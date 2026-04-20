import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/apiClient";
import { authService } from "../../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const { setAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await authService.login({ email, password });
            setAuthenticated(true);
            navigate("/dashboard");
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
            <div className="flex flex-col items-center gap-y-1">
                <div className="flex items-center gap-x-2">
                    <div className="from-primary to-accent flex rounded-lg border border-gray-700 bg-linear-to-br p-2">
                        <svg
                            className="h-5 w-5 text-white md:h-6 md:w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                        </svg>
                    </div>
                    <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                        Podcastify
                    </span>
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Welcome Back</h2>
                <p className="text-gray-400">
                    Sign in to continue your podcast journey
                </p>
                <div className="glass flex w-screen max-w-120 flex-col rounded-2xl p-6">
                    <form onSubmit={handleLogin} className="flex flex-col">
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-2">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}
                        <label htmlFor="email" className="mb-2">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 rounded-xl border border-gray-700 bg-gray-900/50 p-2 focus:border-indigo-500 focus:outline-none"
                        />
                        <label htmlFor="password" className="mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 rounded-xl border border-gray-700 bg-gray-900/50 p-2 focus:border-indigo-500 focus:outline-none"
                        />
                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="glow-hover w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </form>
                    <div className="mt-4 flex justify-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                to={"/onboarding/step-1"}
                                className="text-indigo-400 transition-colors hover:text-indigo-300"
                            >
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-center"
                >
                    <Link
                        to={"/"}
                        className="text-sm text-gray-400 transition-colors duration-200 hover:text-gray-300"
                    >
                        ← Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
