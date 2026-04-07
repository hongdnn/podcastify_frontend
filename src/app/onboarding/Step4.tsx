import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { useOnboarding } from "../../context/OnboardingContext";
import { useState } from "react";
import { motion } from "framer-motion";

type PodcastLength = "5" | "10";
type VoicePreference = "male" | "female" | "neutral";

export default function Step4() {
    const { data, updateMultiData, setCurrentStep } = useOnboarding();
    const [podcastLength, setPodcastLength] = useState<PodcastLength | "">(
        data.podcastLength,
    );
    const [voicePreference, setVoicePreference] = useState<
        VoicePreference | ""
    >(data.voicePreference);
    const navigate = useNavigate();

    const handleNext = () => {
        if (podcastLength && voicePreference) {
            updateMultiData({
                podcastLength,
                voicePreference,
            });
            setCurrentStep(5);
            navigate("/onboarding/step-5");
        }
    };

    const isNextDisabled = !podcastLength || !voicePreference;

    return (
        <OnboardingLayout
            step={4}
            onNext={handleNext}
            nextDisabled={isNextDisabled}
        >
            <>
                <p className="text-3xl font-semibold">Customize your podcast</p>
                <p className="my-3 text-gray-500">
                    Choose your preferred podcast length, time, and voice.
                </p>
                {/* Preferences Section */}
                <div className="max-w-xl space-y-4">
                    {/* Podcast Length */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <label className="mb-2 block text-lg font-semibold text-white">
                            Podcast Length
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {(["5", "10"] as PodcastLength[]).map((length) => (
                                <button
                                    key={length}
                                    onClick={() => setPodcastLength(length)}
                                    className={`m-3 transform rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                                        podcastLength === length
                                            ? "glass-strong border-2 border-indigo-500 bg-indigo-500/10"
                                            : "glass border border-gray-700 hover:border-gray-600"
                                    }`}
                                >
                                    <div className="my-2 text-2xl font-bold text-white">
                                        {length}
                                    </div>
                                    <div className="my-2 text-sm text-gray-400">
                                        minutes
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Voice Preference */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <label className="mb-2 block text-lg font-semibold text-white">
                            Voice Preference
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {[
                                {
                                    value: "male" as VoicePreference,
                                    icon: "👨",
                                    label: "Male",
                                },
                                {
                                    value: "female" as VoicePreference,
                                    icon: "👩",
                                    label: "Female",
                                },
                                {
                                    value: "neutral" as VoicePreference,
                                    icon: "🤖",
                                    label: "Neutral",
                                },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() =>
                                        setVoicePreference(option.value)
                                    }
                                    className={`m-3 transform rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                                        voicePreference === option.value
                                            ? "glass-strong border-2 border-indigo-500 bg-indigo-500/10"
                                            : "glass border border-gray-700 hover:border-gray-600"
                                    }`}
                                >
                                    <div className="my-2 mb-4 text-3xl">
                                        {option.icon}
                                    </div>
                                    <div className="my-2 text-base font-semibold text-white">
                                        {option.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                    {/* Preview Card */}
                    {podcastLength && voicePreference && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="glass-strong rounded-xl border border-indigo-500/30 p-2"
                        >
                            <div className="flex">
                                <svg
                                    className="mx-1 h-5 w-5 text-indigo-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="mx-1 font-semibold text-indigo-400">
                                    Your Preferences
                                </span>
                            </div>
                            <p className="mx-2 my-2 text-sm leading-relaxed text-gray-300">
                                You&apos;ll receive a {podcastLength}-minute
                                podcast every day with a {voicePreference} voice
                                narrating your personalized content.
                            </p>
                        </motion.div>
                    )}
                </div>
            </>
        </OnboardingLayout>
    );
}
