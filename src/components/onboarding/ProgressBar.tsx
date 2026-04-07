import { motion } from "framer-motion";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps } : ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <span>
                    Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="my-2 h-2 w-full overflow-hidden bg-gray-800">
                <motion.div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            {/* Step Dots */}
            <div className="mt-4 flex justify-between">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    return (
                        <div
                            key={stepNumber}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                className={`flex h-8 w-8 items-center justify-center text-xs font-semibold transition-all duration-300 ${
                                    isCompleted
                                        ? "bg-linear-to-br from-indigo-500 to-purple-600 text-white"
                                        : isCurrent
                                          ? "glow bg-linear-to-br from-indigo-500 to-purple-600 text-white"
                                          : "bg-gray-800 text-gray-500"
                                } `}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isCurrent ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    stepNumber
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
