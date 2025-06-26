import { useCallback } from "react"
import { useMyDispatch } from "./my-dispatch"
import { useMySelector } from "./my-selector"
import axios from "axios"
import { apiUrl } from "../config/default-config"
import { refreshSession } from "../features/domain/redux/slices/user-sessions-slice"

export const useAxios = () => {
    const dispatch = useMyDispatch()
    const access = useMySelector((state) => state.session.accessToken)

    const createApi = useCallback(() => {

        const instance = axios.create({baseURL: apiUrl})

        instance.interceptors.request.use(config => {
            if (access) {
                config.headers.Authorization = `Bearer ${access}`;
            }
            return config;
        });

        instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await dispatch(refreshSession()).unwrap();
                    const newToken = useMySelector(state => state.session.accessToken);
                    if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return instance(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    return Promise.reject(error);
                }
                }
                return Promise.reject(error);
            }
        );

        return instance;

    }, [dispatch, access]);

    return createApi();
}