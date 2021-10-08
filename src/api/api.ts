import axios from "axios";
import type { SubscribeRequest } from "../types/subscribeRequest";

// const baseUrl = "http://api.docker-notifier.sebastianloose.de";
const baseUrl = "http://localhost:1640";

const subscribe = async ({
    email,
    organization,
    repository,
}: SubscribeRequest): Promise<{
    status: string;
    data: string;
}> => {
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

export { subscribe };
