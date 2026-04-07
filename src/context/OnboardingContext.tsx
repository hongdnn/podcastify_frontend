/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface OnboardingData {
    fields: string[];
    profession: string;
    podcastLength: "5" | "10";
    voicePreference: "male" | "female" | "neutral";
}

interface OnboardingContextType {
    data: OnboardingData;
    updateData: (key: keyof OnboardingData, value: string | string[]) => void;
    updateMultiData: (updates: Partial<OnboardingData>) => void;
    resetData: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

const defaultData: OnboardingData = {
    fields: [],
    profession: "",
    podcastLength: "5",
    voicePreference: "neutral",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
    undefined,
);

export function OnboardingProvider({children}: { children: React.ReactNode }) {
    const [data, setData] = useState<OnboardingData>(() => {
        const saved = localStorage.getItem("onboardingData");
        return saved ? JSON.parse(saved) : defaultData;
    });
    
      const [currentStep, setCurrentStep] = useState(() => {
        const savedStep = localStorage.getItem("onboardingStep");
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem("onboardingData", JSON.stringify(data));
    }, [data]);

    // Save current step to localStorage
    useEffect(() => {
        localStorage.setItem("onboardingStep", currentStep.toString());
    }, [currentStep]);

    const updateData = useCallback((
        key: keyof OnboardingData,
        value: string | string[],
    ) => {
        setData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const updateMultiData = useCallback((updates: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    }, []);

    const resetData = useCallback(() => {
        setData(defaultData);
        setCurrentStep(1);
        localStorage.removeItem("onboardingData");
        localStorage.removeItem("onboardingStep");
    }, []);

    return (
        <OnboardingContext.Provider
            value={{
                data,
                currentStep,
                updateData,
                updateMultiData,
                resetData,
                setCurrentStep,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext<OnboardingContextType | undefined>(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
}
