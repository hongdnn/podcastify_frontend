import type { Podcast } from "../../models/podcast";
import { formatDateTime } from "../../utils/dateUtil";

interface CardItemProps {
    podcast: Podcast;
}

export default function CardItem({ podcast }: CardItemProps) {
    return (
        <div className="flex w-full items-center rounded-sm border border-gray-700 bg-gray-900 p-4 hover:border-gray-400">
            <div className="bg-primary flex items-center rounded-sm p-1.5">
                <svg
                    className="h-4 w-4 text-white md:h-5 md:w-5"
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
            <div className="flex w-full ml-4 flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <span className="">{podcast.title}</span>
                    <span className="text-sm text-gray-400">5 mins</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">{podcast.topic}</span>
                    <span className="text-sm text-gray-400">{formatDateTime(podcast.created_at)}</span>
                </div>
            </div>
        </div>
    );
}
