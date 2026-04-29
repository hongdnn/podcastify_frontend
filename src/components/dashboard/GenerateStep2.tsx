import { useOnboarding } from "../../context/OnboardingContext";
import { useState } from "react";
import { motion } from "framer-motion";

type PodcastLength = "5" | "10";
type VoicePreference = "male" | "female" | "neutral";

interface GenerateStep2Props {
    onBack: () => void;
    onNext: (updates: {
        podcastLength: PodcastLength;
        voicePreference: VoicePreference;
    }) => void;
}

export default function GenerateStep2({ onBack, onNext }: GenerateStep2Props) {
    const { data, updateMultiData } = useOnboarding();
    const [podcastLength, setPodcastLength] = useState<PodcastLength | "">(
        data.podcastLength,
    );
    const [voicePreference, setVoicePreference] = useState<
        VoicePreference | ""
    >(data.voicePreference);

    const handleNext = () => {
        if (podcastLength && voicePreference) {
            updateMultiData({
                podcastLength,
                voicePreference,
            });
            onNext({
                podcastLength,
                voicePreference,
            });
        }
    };

    const isNextDisabled = !podcastLength || !voicePreference;

    return (
        <div className="flex h-full min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
                <div className="mx-auto w-full max-w-4xl">
                    <p className="text-3xl font-semibold">
                        Customize your podcast
                    </p>
                    <p className="my-3 text-gray-500">
                        Choose your preferred podcast length and voice.
                    </p>

                    <div className="max-w-2xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <label className="mb-2 block text-lg font-semibold text-white">
                                Podcast Length
                            </label>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {(["5", "10"] as PodcastLength[]).map(
                                    (length) => (
                                        <button
                                            key={length}
                                            onClick={() =>
                                                setPodcastLength(length)
                                            }
                                            className={`relative transform rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 ${
                                                podcastLength === length
                                                    ? "glass-strong border-indigo-500 bg-indigo-500/10"
                                                    : "glass border-gray-700 hover:border-gray-600"
                                            }`}
                                        >
                                            <div
                                                className={`absolute top-2 right-2 ${podcastLength === length ? "" : "hidden"} flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600`}
                                            >
                                                <svg
                                                    className="h-4 w-4 text-white"
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
                                            </div>
                                            <div className="my-2 text-2xl font-bold text-white">
                                                {length}
                                            </div>
                                            <div className="my-2 text-sm text-gray-400">
                                                minutes
                                            </div>
                                        </button>
                                    ),
                                )}
                            </div>
                        </motion.div>

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
                                        className={`relative transform rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 ${
                                            voicePreference === option.value
                                                ? "glass-strong border-indigo-500 bg-indigo-500/10"
                                                : "glass border-gray-700 hover:border-gray-600"
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-2 right-2 ${voicePreference === option.value ? "" : "hidden"} flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600`}
                                        >
                                            <svg
                                                className="h-4 w-4 text-white"
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
                                        </div>
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
                    </div>
                </div>
            </div>

            <div className="shrink-0 border-t border-gray-700 px-6 py-4">
                <div className="mx-auto flex w-full max-w-4xl justify-between">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`px-8 py-3 font-semibold transition-all duration-300 ${
                            isNextDisabled
                                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                                : "glow-hover bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                        }`}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}
