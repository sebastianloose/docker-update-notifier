import axios from "axios";
import type { SubscribeRequest } from "../types/subscribeRequest";

const baseUrl = "http://localhost:1640";

const subscribe = async ({
  email,
  organization,
  repository,
}: SubscribeRequest) => {
  try {
    const res = await axios.post(`${baseUrl}/subscribe`, {
      email,
      organization,
      repository,
    });
    return { status: "success", data: res?.data };
  } catch (error) {
    return { status: "error", data: error?.response?.data };
  }
};

const verifyEmail = async (uuid) => {
  try {
    await axios.post(`${baseUrl}/verifyEmail`, {
      uuid,
    });
  } catch (error) {}
};

export { subscribe, verifyEmail };
