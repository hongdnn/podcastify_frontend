import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Podcast } from "../../models/podcast";
import CardItem from "./CardItem";
import { getErrorMessage } from "../../services/apiClient";
import { dashboardSerice } from "../../services/dashboardService";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Dashboard() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number | null>(0);
    const limit = 8;
    const isFetchingRef = useRef<boolean>(false)
    const navigate = useNavigate()

    const handleNavClick = (nav: string) => {
        switch (nav) {
            case "Log out":
                authService.logout()
                navigate('/login')
                break
            default:
                break
        }
    }

    const fetchPodcasts = useCallback(async (offset: number) => {
        if (isFetchingRef.current) return

        isFetchingRef.current = true;
        setIsLoading(true);
        setError(null);
        try {
            const data = await dashboardSerice.getPodcastList(limit, offset);
            setPodcasts(p => p.concat(data.podcasts));
            setPage(prev => data.podcasts.length == 8 ? (prev ?? 0) + 1 : null);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false)
            isFetchingRef.current = false
        }
    }, []);

    useEffect(() => {
        if (page !== null) {
            fetchPodcasts(page ?? 0);
        }
    }, [page, fetchPodcasts]);

    return (
        <>
            <Header />
            <div className="relative mt-20 flex">
                <Sidebar onNavClick={handleNavClick} />
                <div className="flex w-full justify-center">
                    <div className="mt-8 flex w-full max-w-2xl flex-col bg-linear-to-br from-slate-800 via-purple-800 to-slate-800 p-6">
                        <div className="mb-2">
                            <h2 className="text-xl">Today Podcasts</h2>
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
                            {podcasts.map((p) => (
                                <CardItem key={p.id} podcast={p} />
                            ))}
                            {isLoading && podcasts.length > 0 && (
                                <p className="mt-3 text-sm text-gray-300">
                                    Loading more...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
