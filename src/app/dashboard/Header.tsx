export default function Header() {
    return (
        <div className="absolute top-0 left-0 right-0 w-full border-b border-gray-700">
            <div className="flex h-20 items-center space-x-2 px-6">
                <div className="from-primary to-accent flex rounded-lg border border-gray-700 bg-linear-to-br p-2">
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
        </div>
    );
}
