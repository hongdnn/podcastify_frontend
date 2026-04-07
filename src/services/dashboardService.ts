
import type { Podcast } from "../models/podcast";
import apiClient from "./apiClient";

interface GetPodcastsResponse {
    podcasts: Podcast[]
}

class DashboardService {
    async getPodcastList(limit: number, offset: number): Promise<GetPodcastsResponse> {
        console.log(limit, offset)
        const response = await apiClient.get('/podcasts/history', {
            params: { limit, offset }
        })
        return response.data
    }
}

export const dashboardSerice = new DashboardService()