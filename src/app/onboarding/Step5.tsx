import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { useOnboarding } from "../../context/OnboardingContext";
import { useCallback, useState } from "react";
import { authService, type SignupRequest } from "../../services/authService";
import { getErrorMessage } from "../../services/apiClient";

export default function Step5() {
    const navigate = useNavigate();
    const { data, resetData } = useOnboarding();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState<{
        email: string | null;
        password: string | null;
        confirmPassword: string | null;
    }>({ email: null, password: null, confirmPassword: null });

    const validateEmail = useCallback((email: string) => {
        setEmail(email);
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setInputError((prev) => ({
            ...prev,
            email: re.test(email) ? null : "Please enter a valid email address",
        }));
    }, []);

    const validatePassword = useCallback(
        (newPassword: string) => {
            setPassword(newPassword);
            setInputError((prev) => ({
                ...prev,
                password:
                    newPassword.length < 6
                        ? "Password must be at least 6 characters"
                        : null,
                confirmPassword:
                    newPassword !== confirmPassword
                        ? "Passwords do not match"
                        : null,
            }));
        },
        [confirmPassword],
    );

    const validateConfirmPassword = useCallback(
        (cp: string) => {
            setConfirmPassword(cp);
            setInputError((prev) => ({
                ...prev,
                confirmPassword:
                    cp !== password ? "Passwords do not match" : null,
            }));
        },
        [password],
    );

    const handleSignup = async () => {
        setIsLoading(true);
        setError("");
        const requestData: SignupRequest = {
            preferences: data.fields[0],
            name,
            email,
            password,
        };
        try {
            await authService.signup(requestData);
            resetData();
            navigate("/dashboard");
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const isNextDisabled =
        isLoading ||
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        inputError.email !== null ||
        password.trim().length === 0 ||
        inputError.password !== null ||
        confirmPassword.trim().length === 0 ||
        inputError.confirmPassword !== null;

    return (
        <OnboardingLayout
            step={5}
            onNext={handleSignup}
            nextDisabled={isNextDisabled}
            nextLabel={`${!isLoading ? "Create Account" : "Creating..."}`}
        >
            <div className="flex flex-col">
                <p className="text-3xl font-semibold">Create your account</p>
                <p className="my-3 text-gray-500">
                    Almost done! Create your account to start receiving
                    personalized podcasts.
                </p>
                {error && (
                    <div className="mt-2! max-w-xl rounded-lg border border-red-500/20 bg-red-500/10 p-2">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}
                <label className="text-sm">Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-xl border border-gray-600 p-2 placeholder:text-sm"
                    placeholder="enter your name here"
                />
                <label className="mt-4 text-sm">Email address *</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    className="max-w-xl border border-gray-600 p-2 placeholder:text-sm"
                    placeholder="your@email.com"
                />
                <span
                    className={`mt-1 text-sm text-red-400 ${inputError.email !== null ? "" : "hidden"}`}
                >
                    {inputError.email}
                </span>
                <label className="mt-4 text-sm">Password *</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    className="max-w-xl border border-gray-600 p-2 placeholder:text-sm"
                    placeholder="minimum 6 characters"
                />
                <span
                    className={`mt-1 text-sm text-red-400 ${inputError.password !== null ? "" : "hidden"}`}
                >
                    {inputError.password}
                </span>
                <label className="mt-4 text-sm">Confirm password *</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                    className="max-w-xl border border-gray-600 p-2 placeholder:text-sm"
                    placeholder="re-enter your password"
                />
                <span
                    className={`mt-1 text-sm text-red-400 ${inputError.confirmPassword !== null ? "" : "hidden"}`}
                >
                    {inputError.confirmPassword}
                </span>
            </div>
        </OnboardingLayout>
    );
}
