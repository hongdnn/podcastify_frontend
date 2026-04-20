import { useState } from "react";
import { createPortal } from "react-dom";
import GenerateStep1 from "./GenerateStep1";
import GenerateStep2 from "./GenerateStep2";
import {
    useOnboarding,
    type OnboardingData,
} from "../../context/OnboardingContext";

interface GeneratePodcastModalProps {
    onClose: (data?: OnboardingData) => void;
}

export default function GeneratePodcastModal({
    onClose,
}: GeneratePodcastModalProps) {
    const { data } = useOnboarding();
    const [step, setStep] = useState<1 | 2>(1);

    return createPortal(
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70 p-4">
            <div className="relative flex max-h-[90vh] min-h-[520px] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-gray-900 text-white shadow-2xl">
                <button
                    onClick={() => onClose()}
                    className="absolute top-4 right-4 z-10 text-3xl text-gray-300 hover:text-white"
                >
                    ×
                </button>

                <div className="shrink-0 border-b border-gray-700 px-6 py-4 text-center">
                    <h2 className="text-xl font-semibold">
                        Generate a podcast
                    </h2>
                </div>

                <div className="min-h-0 flex-1">
                    {step === 1 && <GenerateStep1 onNext={() => setStep(2)} />}

                    {step === 2 && (
                        <GenerateStep2
                            onBack={() => setStep(1)}
                            onNext={() => onClose(data)}
                        />
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}
