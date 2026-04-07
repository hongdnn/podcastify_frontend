export default function Navigation() {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center space-x-2">
                    <div className="flex rounded-lg border border-gray-700 bg-linear-to-br from-primary to-accent p-2">
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
                    <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                        Podcastify
                    </span>
                </div>

                <div className="items-center space-x-8 md:flex">
                    <a>Features</a>
                    <a>How It Works</a>
                    <a>Pricing</a>
                </div>
                <div className="items-center space-x-4 md:flex">
                    <button className="border border-gray-700 bg-transparent p-2 hover:bg-white/10">
                        Login
                    </button>
                    <button className="border border-gray-700 bg-linear-to-r from-indigo-600 to-purple-600 p-2 hover:bg-white/10">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
