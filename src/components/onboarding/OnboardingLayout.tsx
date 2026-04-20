import type { ReactNode } from "react";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

interface OnboardingLayoutProps {
    children: ReactNode;
    step: number;
    onNext: () => void;
    onBack?: () => void;
    nextDisabled?: boolean;
    nextLabel?: string;
    totalSteps?: number;
}

export default function OnboardingLayout({
    children,
    step,
    onNext,
    onBack,
    nextDisabled = false,
    nextLabel = "Next",
    totalSteps = 5,
}: OnboardingLayoutProps) {
    const { setCurrentStep } = useOnboarding();
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (step > 1) {
            setCurrentStep(step - 1);
            navigate(`/onboarding/step-${step - 1}`);
        }
    };

    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
            <div className="w-full max-w-3xl">
                <div className="mb-5">
                    <ProgressBar currentStep={step} totalSteps={totalSteps} />
                </div>
                <div className="glass-strong flex w-full flex-col border border-gray-300 p-8">
                    {children}
                    <div className="flex w-full justify-between border-t border-gray-700 mt-15">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center space-x-2 px-6 py-3 text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <span>Back</span>
                            </button>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={onNext}
                            disabled={nextDisabled}
                            className={`flex items-center space-x-2 px-8 py-3 font-semibold transition-all duration-300 ${
                                nextDisabled
                                    ? "cursor-not-allowed bg-gray-700 text-gray-500"
                                    : "glow-hover transform bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
                            }`}
                        >
                            <span>{nextLabel}</span>
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
