import { useState, useCallback } from "react";
import { submitWorkerProfile, submitEmployerJob } from "../api/recruitment";
import type {
  WorkerPayload,
  EmployerPayload,
  WorkerResponse,
  EmployerResponse,
} from "../types/api";

/**
 * Custom hook for managing worker profile submission
 * Handles loading state, errors, and response data
 */
export const useSubmitWorkerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WorkerResponse | null>(null);

  const submit = useCallback(async (payload: WorkerPayload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await submitWorkerProfile(payload);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, data };
};

/**
 * Custom hook for managing employer job submission
 * Handles loading state, errors, and candidate matches
 */
export const useSubmitEmployerJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EmployerResponse | null>(null);

  const submit = useCallback(async (payload: EmployerPayload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await submitEmployerJob(payload);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, data };
};
