import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { apiUrl } from "../../../../config/default-config"
import axios, { AxiosResponse } from "axios"
import ErrorRespone from "../../../../common/ErrorInterface"

interface UserSessionState{
    accessToken: string | null,
    pending: boolean,
    error: string | null,
}

interface setCretetialsPayload{
    access: string,
    refresh: string,
    rememberMe: boolean,
}

const initState : UserSessionState = {
    accessToken: null,
    pending: false,
    error: null,
}

const loginUrl = "api/Auth/login"
const logoutUrl = "/api/Auth/logout"
const refreshUrl = "/api/Auth/refresh"

const LOCAL_KEY_REFRESH = "local_refresh"

interface loginResponse{
    accessToken: string,
    refreshToken: string,
    loginSucceeded: boolean
}

interface loginInterface{
    email: string, 
    password: string, 
    rememberMe: boolean
}

interface TokenPair{
    accessToken: string,
    refreshToken: string
}

export const loginUser = createAsyncThunk<TokenPair, loginInterface>(
    "user-session-slice.login",
    async (data: loginInterface, {rejectWithValue}) => {
        try {
            const response = await axios.post<loginResponse>(apiUrl + loginUrl, data);
            if (!response.data.loginSucceeded){
                const error_response: ErrorRespone = {
                    status: 404,
                    message: "Unathorized",
                    payload: null
                } 
                return rejectWithValue(error_response);
            }
            return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
        }
        catch (error){
            if (axios.isAxiosError(error)){
                const error_response: ErrorRespone = {
                    status: error.response?.status || -1,
                    message: error.response?.statusText || "Unknown",
                    payload: error.response?.data
                } 
                return rejectWithValue(error_response)
            }
            return rejectWithValue({
                status: "internal",
                message: "You dum"
            })
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user-session-slice.logout",
    async (token: string, {rejectWithValue}) => {
        try{
            await axios.post(apiUrl + logoutUrl, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        catch(error){
            if (axios.isAxiosError(error)){
                const error_response: ErrorRespone = {
                    status: error.response?.status || -1,
                    message: error.response?.statusText || "Unknown",
                    payload: error.response?.data
                } 
                return rejectWithValue(error_response)
            }
            return rejectWithValue({
                status: "internal",
                message: "You dum"
            })
        }
    }
)

export const refreshSession = createAsyncThunk(
    "user-session-slice.refresh",
    async (_, {rejectWithValue}) => {
        const refresh = localStorage.getItem(LOCAL_KEY_REFRESH)
        if (refresh){
            try{
                const response = await axios.post<TokenPair>(
                    apiUrl + refreshUrl,
                    {
                        refreshToken: refresh
                    }
                )
                return response.data
            }
            catch(error){
                if (axios.isAxiosError(error)){
                    if (error.response?.status == 401){
                        localStorage.removeItem(LOCAL_KEY_REFRESH)
                    }
                    const error_response: ErrorRespone = {
                        status: error.response?.status || -1,
                        message: error.response?.statusText || "Unknown",
                        payload: error.response?.data
                    } 
                    return rejectWithValue(error_response)
                }
                return rejectWithValue({
                    status: "internal",
                    message: "You dum"
                })
            }
        }
        const error_response : ErrorRespone = {
            status: 401,
            message: "Unathorized",
            payload: null
        }
        return rejectWithValue(error_response)
    }
)

const userSessionSlice = createSlice({
    name: "user-session-slice",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        //configuring login thunk
        builder.addCase(loginUser.pending, (state, action) => {
            state.pending = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.pending = false
            state.error = null,
            state.accessToken = action.payload.accessToken
            if (action.meta.arg.rememberMe){
                localStorage.setItem(LOCAL_KEY_REFRESH, action.payload.refreshToken)
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.pending = false
            state.error = action.error.message || "Untracked error"
        })

        //configuring logout thunk
        builder.addCase(logoutUser.pending, (state) => {
            state.pending = true
            state.error = null
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.accessToken = null
            state.error = null
            state.pending = false
            localStorage.removeItem(LOCAL_KEY_REFRESH)
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.pending = false
            state.error = action.error.message || "Untracked error"
        })

        //configuring refresh thunk
        builder.addCase(refreshSession.pending, (state) => {})
        builder.addCase(refreshSession.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken
            if (localStorage.getItem(LOCAL_KEY_REFRESH)){
                localStorage.setItem(LOCAL_KEY_REFRESH, action.payload.refreshToken)
            }
        })
        builder.addCase(refreshSession.rejected, (state, action) => {
            state.accessToken = null
            state.error = action.error.message || "Untracked error"
            localStorage.removeItem(LOCAL_KEY_REFRESH)
        })
    }
})

const session = userSessionSlice.reducer

export default session

