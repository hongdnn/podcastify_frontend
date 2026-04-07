import { Link } from "react-router-dom";

export default function Content() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col items-center">
                <h1 className="mb-6 text-center font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                    <span>Your Daily AI Podcast,</span>
                    <br />
                    <span>Personalized</span>
                </h1>
                <Link to={"/onboarding/step-1"} className="group glass relative px-8 py-4 font-semibold hover:scale-105">
                    <span className="flex items-center space-x-2">
                        <span>Start Your Journey</span>
                        <svg
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
            </div>
        </section>
    );
}
