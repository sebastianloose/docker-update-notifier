import axios from "axios";
import type { Subscription } from "src/types/subscription";
import type { SubscribeRequest } from "../types/subscribeRequest";

// const baseUrl = "https://api.docker-notifier.sebastianloose.de";
const baseUrl = "http://localhost:1640";

interface ApiResponse {
    status: "success" | "error";
    data: unknown;
}

const subscribe = async ({ email, organization, repository }: SubscribeRequest): Promise<ApiResponse> => {
    try {
        const res = await axios.post(`${baseUrl}/subscribe`, {
            email,
            organization,
            repository,
        });
        return { status: "success", data: res?.data as unknown as string };
    } catch (error) {
        return { status: "error", data: error?.response?.data };
    }
};

const sendLoginToken = async (email: string): Promise<ApiResponse> => {
    try {
        const res = await axios.post(`${baseUrl}/sendLoginToken`, { email });
        return { status: "success", data: res?.data as unknown as string };
    } catch (error) {
        return { status: "error", data: error?.response?.data };
    }
};

const getSubscriptions = async (token: string): Promise<ApiResponse> => {
    try {
        const res = await axios.post(`${baseUrl}/subscriptions`, { token });
        return { status: "success", data: res?.data as unknown as Subscription[] };
    } catch (error) {
        return { status: "error", data: error?.response?.data };
    }
};

export { subscribe, sendLoginToken, getSubscriptions };
