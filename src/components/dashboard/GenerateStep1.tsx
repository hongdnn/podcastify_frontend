import { useEffect, useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";

const FIELDS = [
    {
        id: "technology",
        label: "Technology",
        icon: "💻",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "business",
        label: "Business",
        icon: "💼",
        color: "from-green-500 to-emerald-500",
    },
    {
        id: "science",
        label: "Science",
        icon: "🔬",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "arts",
        label: "Arts",
        icon: "🎨",
        color: "from-red-500 to-orange-500",
    },
    {
        id: "health",
        label: "Health",
        icon: "🏥",
        color: "from-teal-500 to-cyan-500",
    },
    {
        id: "sports",
        label: "Sports",
        icon: "⚽",
        color: "from-yellow-500 to-orange-500",
    },
    {
        id: "us-politics",
        label: "US Politics",
        icon: "🏛️",
        color: "from-indigo-500 to-blue-500",
    },
    {
        id: "world-news",
        label: "World News",
        icon: "🌍",
        color: "from-blue-500 to-purple-500",
    },
    {
        id: "entertainment",
        label: "Entertainment",
        icon: "🎬",
        color: "from-pink-500 to-rose-500",
    },
    {
        id: "finance",
        label: "Finance",
        icon: "💰",
        color: "from-green-500 to-teal-500",
    },
    {
        id: "education",
        label: "Education",
        icon: "📚",
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: "environment",
        label: "Environment",
        icon: "🌱",
        color: "from-green-500 to-lime-500",
    },
    {
        id: "food",
        label: "Food & Cooking",
        icon: "🍳",
        color: "from-orange-500 to-red-500",
    },
    {
        id: "travel",
        label: "Travel",
        icon: "✈️",
        color: "from-sky-500 to-blue-500",
    },
    {
        id: "fashion",
        label: "Fashion",
        icon: "👗",
        color: "from-pink-500 to-purple-500",
    },
    {
        id: "gaming",
        label: "Gaming",
        icon: "🎮",
        color: "from-purple-500 to-indigo-500",
    },
];

interface GenerateStep1Props {
    onNext: () => void;
}

export default function GenerateStep1({ onNext }: GenerateStep1Props) {
    const { updateData, data } = useOnboarding();
    const [selectedFields, setSelectedFields] = useState<string[]>(
        data.fields,
    );

    useEffect(() => {
        updateData("fields", selectedFields);
    }, [selectedFields, updateData]);

    const toggleField = (fieldId: string) => {
        setSelectedFields((prev) =>
            prev.includes(fieldId)
                ? prev.filter((id) => id !== fieldId)
                : [...prev, fieldId],
        );
    };

    return (
        <div className="flex h-full min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
                <div className="mx-auto w-full max-w-4xl">
                    <p className="text-3xl font-semibold">
                    What topics interest you?
                    </p>
                    <p className="my-3 text-gray-500">
                        Select at least one topic. You can always change this
                        later.
                    </p>
                    {selectedFields.length > 0 && (
                        <p className="text-sm font-medium text-indigo-400">
                            {selectedFields.length}{" "}
                            {selectedFields.length === 1 ? "topic" : "topics"}{" "}
                            selected
                        </p>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {FIELDS.map((field) => {
                            const isSelected = selectedFields.includes(
                                field.id,
                            );
                            return (
                                <div
                                    key={field.id}
                                    onClick={() => toggleField(field.id)}
                                    className={`relative flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-700 p-3 duration-300 hover:scale-105 ${
                                        isSelected
                                            ? "glass-strong border-2 border-indigo-500"
                                            : "glass border border-gray-700 hover:border-gray-600"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-2 right-2 ${isSelected ? "" : "hidden"} flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600`}
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
                                    <span className="text-3xl">
                                        {field.icon}
                                    </span>
                                    <span>{field.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="shrink-0 border-t border-gray-700 px-6 py-4">
                <div className="mx-auto flex w-full max-w-4xl justify-end">
                    <button
                        onClick={onNext}
                        disabled={selectedFields.length === 0}
                        className={`px-8 py-3 font-semibold transition-all duration-300 ${
                            selectedFields.length === 0
                                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                                : "glow-hover bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
