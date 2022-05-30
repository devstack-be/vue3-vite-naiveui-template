import axios from "axios";
import type { AxiosInstance } from "axios";
import { useUserStore } from "@/stores/user";

let api: AxiosInstance;

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config) => {
    const userStore = useUserStore();

    if (userStore.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userStore.token}`,
      };
    }

    return config;
  })
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const userStore = useUserStore();
      //401 Unauthorized (not auth); 419 Session expired
      if ([401, 419].includes(error.response?.status)) {
        userStore.logoutUser()
      }
    }
  )
  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
