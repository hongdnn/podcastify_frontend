
import type { Podcast } from "../models/podcast";
import apiClient from "./apiClient";

interface GetPodcastsResponse {
    podcasts: Podcast[]
}

export type GeneratePodcastStatus =
    "pending" | "processing" | "completed" | "failed"

interface GeneratePodcastResponse {
    task_id: string,
    status: GeneratePodcastStatus,
}

class DashboardService {
    async getPodcastList(limit: number, offset: number): Promise<GetPodcastsResponse> {
        console.log(limit, offset)
        const response = await apiClient.get('/podcasts/history', {
            params: { limit, offset }
        })
        response.data.podcasts.forEach((p: Podcast)=> {
            p.created_at = new Date(p.created_at);
        });
        return response.data;
    }

    async generatePodcast(data: { topics: string, duration: string, voice_preference: string }): Promise<GeneratePodcastResponse> {
        const response = await apiClient.post<GeneratePodcastResponse>(
            "/podcasts/generate",
            data,
        )
        return response.data
    }

    subscribeToPodcastEvents(taskId: string) {
        return new EventSource(
            `${import.meta.env.VITE_API_BASE_URL}/podcasts/events/${taskId}`,
        );
    }
}

export const dashboardSerice = new DashboardService()
