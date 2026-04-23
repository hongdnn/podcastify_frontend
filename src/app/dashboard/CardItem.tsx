import type { Podcast } from "../../models/podcast";
import { formatDateTime } from "../../utils/dateUtil";

interface CardItemProps {
    podcast: Podcast;
    isSelected?: boolean;
    isPlaying?: boolean;
    isLoading?: boolean;
    currentTime?: number;
    duration?: number;
    onPlay: (podcast: Podcast) => void;
}

function formatPlaybackTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}

export default function CardItem({
    podcast,
    isSelected = false,
    isPlaying = false,
    isLoading = false,
    currentTime = 0,
    duration = 0,
    onPlay,
}: CardItemProps) {
    const progress =
        isSelected && duration > 0
            ? Math.min((currentTime / duration) * 100, 100)
            : 0;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onPlay(podcast)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onPlay(podcast);
                }
            }}
            className={`flex w-full cursor-pointer items-center rounded-sm border bg-gray-900 p-4 transition-colors hover:border-gray-400 ${
                isSelected
                    ? "border-indigo-500 ring-1 ring-indigo-500/40"
                    : "border-gray-700"
            }`}
        >
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${
                    isSelected ? "bg-indigo-500" : "bg-primary"
                }`}
            >
                <button
                    type="button"
                    aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
                    className="flex h-full w-full items-center justify-center"
                >
                    {isLoading && isSelected ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : isSelected && isPlaying ? (
                        <svg
                            className="h-5 w-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                        </svg>
                    ) : (
                        <svg
                            className="h-5 w-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="ml-4 flex w-full flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <span>{podcast.title}</span>
                    <span className="text-sm text-gray-400">
                        {isSelected && duration > 0
                            ? `${formatPlaybackTime(currentTime)} / ${formatPlaybackTime(duration)}`
                            : "5 mins"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">{podcast.topic}</span>
                    <span className="text-sm text-gray-400">
                        {formatDateTime(podcast.created_at)}
                    </span>
                </div>
                {isSelected && (
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                        <div
                            className="h-full rounded-full bg-indigo-400 transition-[width]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
