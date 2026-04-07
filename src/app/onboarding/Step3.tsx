import { useMemo, useState } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { useOnboarding } from "../../context/OnboardingContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PROFESSIONS = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Marketing Manager",
    "Business Analyst",
    "Designer",
    "Teacher",
    "Consultant",
    "Entrepreneur",
    "Student",
    "Researcher",
    "Accountant",
    "Lawyer",
    "Doctor",
    "Nurse",
    "Engineer",
    "Architect",
    "Writer",
    "Journalist",
    "Sales Manager",
    "Project Manager",
    "HR Manager",
    "Financial Analyst",
    "Real Estate Agent",
    "Photographer",
    "Chef",
    "Artist",
    "Musician",
    "Scientist",
    "Pharmacist",
];

export default function Step3() {
    const { setCurrentStep, data, updateData } = useOnboarding();
    const [profession, setProfession] = useState<string>(data.profession);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const navigate = useNavigate();

    const filteredProfessions = useMemo(() => {
        if (profession.trim().length === 0) return [];
        return PROFESSIONS.filter((p) =>
            p.toLowerCase().includes(profession.toLowerCase()),
        ).slice(0, 6);
    }, [profession]);

    console.log(showSuggestions, filteredProfessions);

    const handleNext = () => {
        updateData("profession", profession);
        setCurrentStep(4);
        navigate("/onboarding/step-4");
    };

    const handleSelect = (selectedProfession: string) => {
        setProfession(selectedProfession);
        updateData("profession", selectedProfession);
        setShowSuggestions(false);
    };

    const handleSkip = () => {
        updateData("profession", "");
        setCurrentStep(4);
        navigate("/onboarding/step-4");
    };

    return (
        <OnboardingLayout
            step={3}
            onNext={handleNext}
            nextDisabled={!PROFESSIONS.includes(profession)}
        >
            <>
                <p className="text-3xl font-semibold">
                    What&apos;s your profession?
                </p>
                <p className="my-3 text-gray-500">
                    This helps us tailor content relevant to your field.
                </p>

                {/* Input */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setShowSuggestions(false)}
                            placeholder="e.g., Software Engineer, Teacher, Doctor..."
                            className="w-full max-w-xl rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-lg placeholder-gray-500 transition-colors duration-300 focus:border-indigo-500 focus:outline-none"
                        />
                    </motion.div>
                    <AnimatePresence>
                        {showSuggestions && filteredProfessions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="glass-strong absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-700 shadow-xl"
                            >
                                {filteredProfessions.map((p) => (
                                    <motion.button
                                        key={p}
                                        onClick={() => handleSelect(p)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex w-full items-center space-x-3 px-6 py-3 text-left text-white transition-colors duration-200 hover:bg-white/10"
                                    >
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>{p}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Popular Professions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8"
                    >
                        <p className="mt-10! mb-3 text-sm text-gray-400">
                            Popular professions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Software Engineer",
                                "Designer",
                                "Teacher",
                                "Entrepreneur",
                                "Student",
                                "Consultant",
                            ].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handleSelect(p)}
                                    className="glass rounded-full px-2 py-2 text-sm text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skip Option */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <button
                            onClick={handleSkip}
                            className="text-sm text-gray-400 transition-colors duration-200 hover:text-gray-300"
                        >
                            Prefer not to say
                        </button>
                    </motion.div>
                </div>
            </>
        </OnboardingLayout>
    );
}
