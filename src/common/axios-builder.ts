import axios from "axios";

import { store } from "../features/domain/redux/store";
import { refreshSession } from "../features/domain/redux/slices/user-sessions-slice";
import { apiUrl } from "../config/default-config";

const axiosBuilder = () => {
    const axiosInst = axios.create({
        baseURL: apiUrl
    })

    axiosInst.interceptors.request.use(
        (config) => {
            {
                const state = store.getState()
                const token = state.session.accessToken
                if (token){
                    config.headers.Authorization = `Bearer ${token}`
                }

                return config
            }
        }
    )

    axiosInst.interceptors.response.use(
        response => response,
        async (error) => {
            const originRequest = error.config
            if (error.response.status == 401 && !originRequest._retry){
                originRequest._retry = true
                await store.dispatch(refreshSession());
                const new_state = store.getState()
                originRequest.headers.Authorization = `Bearer ${new_state.session.accessToken}`
                return axiosInst(originRequest)
            }

            return Promise.reject(error)
        }
    )
    
    return axiosInst
}


export const api = axiosBuilder();