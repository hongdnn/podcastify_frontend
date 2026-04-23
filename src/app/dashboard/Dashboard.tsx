import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Podcast } from "../../models/podcast";
import CardItem from "./CardItem";
import { getErrorMessage } from "../../services/apiClient";
import { dashboardSerice } from "../../services/dashboardService";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import GeneratePodcastModal from "../../components/dashboard/GeneratePodcastModal";
import type { OnboardingData } from "../../context/OnboardingContext";
import NoPodcast from "../../components/dashboard/NoPodcast";

type Notification = {
    type: "processing" | "success" | "error";
    message: string;
};

function formatPlaybackTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}

export default function Dashboard() {
    const { setAuthenticated } = useAuth();
    const [todayPodcasts, setTodayPodcasts] = useState<Podcast[]>([]);
    const [previousPodcasts, setPreviousPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number | null>(0);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(
        null,
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const limit = 8;
    const isFetchingRef = useRef<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const navigate = useNavigate();

    const handleNavClick = (nav: string) => {
        switch (nav) {
            case "Generate a podcast":
                setShowGenerateModal(true);
                break;
            case "Log out":
                authService.logout();
                setAuthenticated(false);
                navigate("/login");
                break;
            default:
                break;
        }
    };

    const playAudio = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        setAudioError(null);
        setIsAudioLoading(true);
        await audio.play();
        setIsPlaying(true);
        setIsAudioLoading(false);
    }, []);

    const handlePlayPodcast = useCallback(
        (podcast: Podcast) => {
            const audio = audioRef.current;

            if (selectedPodcast?.id === podcast.id) {
                if (!audio) return;

                if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                    return;
                }

                playAudio();
                return;
            }

            setSelectedPodcast(podcast);
            setCurrentTime(0);
            setDuration(0);
            setAudioError(null);
            setIsAudioLoading(true);
            setIsPlaying(false);

            if (!audio) return;

            audio.pause();
            audio.src = podcast.audio_url;
            audio.currentTime = 0;
            audio.load();

            void audio.play();
        },
        [isPlaying, playAudio, selectedPodcast?.id],
    );

    const handleSeek = (value: string) => {
        const nextTime = Number(value);
        const audio = audioRef.current;

        if (!audio || !Number.isFinite(nextTime)) return;

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const fetchPodcasts = useCallback(async (offset: number) => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        setIsLoading(true);
        setError(null);
        try {
            const data = await dashboardSerice.getPodcastList(limit, offset);
            const todayPodcasts = data.podcasts.filter(p => p.created_at >= today)
            const previousPodcasts = data.podcasts.filter(p => p.created_at < today)
            setTodayPodcasts((p) => p.concat(todayPodcasts))
            setPreviousPodcasts((p) => p.concat(previousPodcasts))
            setPage((prev) =>
                data.podcasts.length == 8 ? (prev ?? 0) + 1 : null,
            );
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    const refreshPodcasts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await dashboardSerice.getPodcastList(limit, 0);
            const todayPodcasts = data.podcasts.filter(p => p.created_at >= today)
            setTodayPodcasts((p) => p.concat(todayPodcasts))
            setPage((prev) =>
                data.podcasts.length == 8 ? (prev ?? 0) + 1 : null,
            );
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const showTemporaryNotification = useCallback(
        (nextNotification: Notification) => {
            setNotification(nextNotification);
            window.setTimeout(() => {
                setNotification(null);
            }, 3000);
        },
        [],
    );

    const generatePodcast = useCallback(
        async (data: OnboardingData) => {
            setNotification({
                type: "processing",
                message: "Generating your podcast...",
            });

            try {
                const payload = {
                    topics: data.fields[0],
                    duration: data.podcastLength,
                    voice_preference: data.voicePreference,
                };

                const response = await dashboardSerice.generatePodcast(payload);
                if (response.status === "processing") {
                    const eventSource =
                        dashboardSerice.subscribeToPodcastEvents(
                            response.task_id,
                        );

                    eventSource.addEventListener("completed", () => {
                        showTemporaryNotification({
                            type: "success",
                            message: "Podcast generated!",
                        });
                        refreshPodcasts();
                        eventSource.close();
                    });

                    eventSource.addEventListener("failed", (event) => {
                        console.error("Podcast generation failed:", event.data);
                        showTemporaryNotification({
                            type: "error",
                            message: "Podcast generation failed.",
                        });
                        eventSource.close();
                    });

                    eventSource.onerror = (error) => {
                        console.error("Podcast generation error:", error);
                        showTemporaryNotification({
                            type: "error",
                            message: "Podcast generation interrupted.",
                        });
                        eventSource.close();
                    };
                    return;
                }

                if (response.status === "completed") {
                    showTemporaryNotification({
                        type: "success",
                        message: "Podcast generated!",
                    });
                    refreshPodcasts();
                    return;
                }

                showTemporaryNotification({
                    type: "error",
                    message: "Podcast generation failed.",
                });
            } catch (error) {
                showTemporaryNotification({
                    type: "error",
                    message: getErrorMessage(error),
                });
            }
        },
        [refreshPodcasts, showTemporaryNotification],
    );

    useEffect(() => {
        if (page !== null) {
            fetchPodcasts(page ?? 0);
        }
    }, [page, fetchPodcasts]);

    return (
        <>
            <Header />
            {notification && (
                <div
                    className={`fixed top-6 right-6 z-1001 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
                        notification.type === "success"
                            ? "border-green-500/30 bg-green-500/15 text-green-200"
                            : notification.type === "error"
                              ? "border-red-500/30 bg-red-500/15 text-red-200"
                              : "border-indigo-500/30 bg-indigo-500/15 text-indigo-200"
                    }`}
                >
                    {notification.message}
                </div>
            )}
            <div className="relative mt-20 flex">
                <Sidebar onNavClick={handleNavClick} />
                <div className="flex w-full justify-center">
                    <div className="mt-8 flex w-full max-w-2xl flex-col bg-linear-to-br from-slate-800 via-purple-800 to-slate-800 p-6">
                        <div className="mb-2 space-y-4">
                            <h2 className="text-xl">Today Podcasts</h2>
                            {isLoading && todayPodcasts.length === 0 && (
                                <p className="text-sm text-gray-300">
                                    Loading podcasts...
                                </p>
                            )}
                            {error && (
                                <p className="mb-3 rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-sm text-red-400">
                                    {error}
                                </p>
                            )}
                            {!isLoading && todayPodcasts.length === 0 && (
                                <NoPodcast isShowButton={true} onClick={() => setShowGenerateModal(true)} />
                            )}
                            {todayPodcasts.map(
                                (p) => (
                                        <CardItem
                                            key={p.id}
                                            podcast={p}
                                            isSelected={
                                                selectedPodcast?.id === p.id
                                            }
                                            isPlaying={isPlaying}
                                            isLoading={isAudioLoading}
                                            currentTime={currentTime}
                                            duration={duration}
                                            onPlay={handlePlayPodcast}
                                        />
                                    )
                            )}
                        </div>
                        
                        {previousPodcasts.length > 0 &&<div className="space-y-4">
                            <h2 className="mb-2 text-xl">Previous Podcasts</h2>
                            
                            {previousPodcasts.map(
                                (p) => (
                                        <CardItem
                                            key={p.id}
                                            podcast={p}
                                            isSelected={
                                                selectedPodcast?.id === p.id
                                            }
                                            isPlaying={isPlaying}
                                            isLoading={isAudioLoading}
                                            currentTime={currentTime}
                                            duration={duration}
                                            onPlay={handlePlayPodcast}
                                        />
                                    ),
                            )}
                            {isLoading && previousPodcasts.length > 0 && (
                                <p className="mt-3 text-sm text-gray-300">
                                    Loading more...
                                </p>
                            )}
                        </div>}
                    </div>
                </div>
            </div>
            {showGenerateModal && (
                <GeneratePodcastModal
                    onClose={(data) => {
                        setShowGenerateModal(false);

                        if (data) {
                            console.log("Generate podcast with:", data);
                            generatePodcast(data);
                        }
                    }}
                />
            )}
            {selectedPodcast && (
                <div className="fixed bottom-6 right-6 left-6 z-50">
                    <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-lg border border-gray-700 bg-gray-900/95 p-4 text-white shadow-2xl backdrop-blur">
                        <button
                            type="button"
                            onClick={() => handlePlayPodcast(selectedPodcast)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-indigo-500 transition-colors hover:bg-indigo-600"
                            aria-label={
                                isPlaying ? "Pause podcast" : "Play podcast"
                            }
                        >
                            {isAudioLoading ? (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : isPlaying ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {selectedPodcast.title}
                                    </p>
                                    <p className="truncate text-sm text-gray-400">
                                        {audioError ??
                                            (isAudioLoading
                                                ? "Loading audio..."
                                                : selectedPodcast.topic)}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm text-gray-300">
                                    {formatPlaybackTime(currentTime)} /{" "}
                                    {formatPlaybackTime(duration)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                step="0.1"
                                value={Math.min(currentTime, duration || 0)}
                                onChange={(event) =>
                                    handleSeek(event.target.value)
                                }
                                className="mt-3 w-full accent-indigo-500"
                                aria-label="Podcast progress"
                            />
                        </div>
                    </div>
                </div>
            )}
            <audio
                ref={audioRef}
                preload="metadata"
                onLoadedMetadata={(event) => {
                    setDuration(event.currentTarget.duration || 0);
                }}
                onCanPlay={() => {
                    setIsAudioLoading(false);
                }}
                onTimeUpdate={(event) => {
                    setCurrentTime(event.currentTarget.currentTime);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsAudioLoading(true)}
                onPlaying={() => setIsAudioLoading(false)}
                onEnded={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                }}
                onError={() => {
                    setIsAudioLoading(false);
                    setIsPlaying(false);
                    setAudioError("Could not load this podcast.");
                }}
            />
        </>
    );
}
