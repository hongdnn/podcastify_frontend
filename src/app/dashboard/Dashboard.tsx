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

type Notification = {
    type: "processing" | "success" | "error";
    message: string;
};

export default function Dashboard() {
    const { setAuthenticated } = useAuth();
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number | null>(0);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);

    const limit = 8;
    const isFetchingRef = useRef<boolean>(false);
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

    const fetchPodcasts = useCallback(async (offset: number) => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        setIsLoading(true);
        setError(null);
        try {
            const data = await dashboardSerice.getPodcastList(limit, offset);
            setPodcasts((p) => p.concat(data.podcasts));
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
            setPodcasts(data.podcasts);
            setPage(null);
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
                const response = await dashboardSerice.generatePodcast({
                    topics: data.fields[0],
                    duration: data.podcastLength,
                    voice_preference: data.voicePreference,
                });

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
                        <div className="mb-2 space-y-2">
                            <h2 className="text-xl">Today Podcasts</h2>
                            {isLoading && podcasts.length === 0 && (
                                <p className="text-sm text-gray-300">
                                    Loading podcasts...
                                </p>
                            )}
                            {podcasts.map(
                                (p) => p.created_at.getTime() >= today.getTime() && (
                                        <CardItem key={p.id} podcast={p} />
                                    )
                            )}
                        </div>
                        <div>
                            <h2 className="mb-2 text-xl">Previous Podcasts</h2>
                            {error && (
                                <p className="mb-3 rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-sm text-red-400">
                                    {error}
                                </p>
                            )}
                            {isLoading && podcasts.length === 0 && (
                                <p className="text-sm text-gray-300">
                                    Loading podcasts...
                                </p>
                            )}
                            {podcasts.map(
                                (p) =>
                                    p.created_at < today && (
                                        <CardItem key={p.id} podcast={p} />
                                    ),
                            )}
                            {isLoading && podcasts.length > 0 && (
                                <p className="mt-3 text-sm text-gray-300">
                                    Loading more...
                                </p>
                            )}
                        </div>
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
        </>
    );
}
