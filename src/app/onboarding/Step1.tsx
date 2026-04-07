
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";

export default function Step1() {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/onboarding/step-2');
    };

    return (
        <OnboardingLayout step={1} onNext={handleNext} nextLabel="Get Started">
            <div className="flex flex-col items-center">
                <div className="rounded-full bg-linear-to-r from-indigo-500 to-purple-600 p-6">
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
                <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold text-transparent">
                    Let's Personalize
                </span>
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
                    Your Experience
                </span>
                <p className="mx-3 text-center text-xl">
                    We&apos;ll ask you a few questions to create your perfect
                    daily podcast experience. This will only take a few minutes.
                </p>
                <div className="grid max-w-3xl md:grid-cols-3 gap-6 sm:grid-cols-1">
                    {[
                        {
                            icon: "🎯",
                            title: "Choose Your Topics",
                            description: "Select what interests you most",
                        },
                        {
                            icon: "🤖",
                            title: "AI-Curated",
                            description: "Get personalized content daily",
                        },
                        {
                            icon: "⚡",
                            title: "Quick Setup",
                            description: "Takes less than 5 minutes",
                        },
                    ].map((feature, index) => (
                        <div key={index} className="border border-gray-700 rounded-xl flex flex-col items-center justify-center px-2 py-1">
                            <span className="text-3xl">{feature.icon}</span>
                            <span>{feature.title}</span>
                            <span className="text-sm text-gray-400">{feature.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </OnboardingLayout>
    );
}
