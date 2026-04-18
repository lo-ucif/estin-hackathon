import axios, { AxiosError } from "axios";
import type {
  WorkerPayload,
  EmployerPayload,
  WorkerResponse,
  EmployerResponse,
} from "../types/api";

const API_BASE_URL = "https://videoedit.app.n8n.cloud";
const RECRUITMENT_ENDPOINT = "/webhook/recruitment";

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submit worker (candidate) profile to the API
 * Sends CV, skills, and profile information
 * Returns AI-parsed summary and recommended roles
 */
export const submitWorkerProfile = async (
  payload: WorkerPayload,
): Promise<WorkerResponse> => {
  try {
    const response = await apiClient.post<WorkerResponse>(
      RECRUITMENT_ENDPOINT,
      payload,
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(
        response.data.message || "Failed to submit worker profile",
      );
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.data &&
      typeof axiosError.response.data === "object" &&
      "message" in axiosError.response.data
        ? (axiosError.response.data as { message: string }).message
        : axiosError.message || "Failed to submit worker profile";

    throw new Error(errorMessage);
  }
};

/**
 * Submit employer job posting to the API
 * Finds matching candidates from database and web scraping
 * Returns ranked list of candidate matches with scores
 */
export const submitEmployerJob = async (
  payload: EmployerPayload,
): Promise<EmployerResponse> => {
  try {
    const response = await apiClient.post<EmployerResponse>(
      "/webhook/recruitment?employer=true",
      payload,
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Failed to submit employer job posting");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.data &&
      typeof axiosError.response.data === "object" &&
      "message" in axiosError.response.data
        ? (axiosError.response.data as { message: string }).message
        : axiosError.message || "Failed to submit employer job posting";

    throw new Error(errorMessage);
  }
};


