"use client";

import { useState, useCallback } from "react";
import apiClient from "@ats/lib/apiClient";
import type { AxiosRequestConfig, AxiosError } from "axios";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  request: (
    method: string,
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  reset: () => void;
}

export function useApi<T = unknown>(): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (
      method: string,
      url: string,
      body?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<T> => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await apiClient.request<T>({
          method: method as AxiosRequestConfig["method"],
          url,
          data: body,
          ...config,
        });
        setState({ data: response.data, loading: false, error: null });
        return response.data;
      } catch (err) {
        const message =
          (err as AxiosError<{ message: string }>).response?.data?.message ||
          (err as Error).message ||
          "An unexpected error occurred";
        setState({ data: null, loading: false, error: message });
        throw err;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, request, reset };
}
