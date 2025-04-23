import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../../data/user-profile";
import { api } from "../../../../common/axios-builder";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { FileDto } from "../../../data/file";

interface UserProfileState{
    user: UserProfile | null,
    pending: boolean,
    error: string | null,
    avatarBase64: string | null
}

const initState : UserProfileState = {
    user: null,
    pending: false,
    error: null,
    avatarBase64: null,
}

const loadProfileUrl = "/api/Profile"

const loadProflie = createAsyncThunk(
    "user-profile-slice.load",
    async (_, {rejectWithValue, dispatch}) => {
        try{
            const response = await api.get<UserProfile>(
                loadProfileUrl
            )
            dispatch(loadAvatar(response.data.avatar))
            return response.data
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
        }
        return rejectWithValue({
            status: "internal",
            message: "You dum"
        })
    }
)

interface SetAvatarDto{
    base64: string,
}

const loadAvatar = createAsyncThunk(
    "user-profile-slice.loadAvatat",
    async (file: FileDto, {rejectWithValue}) => {
        try{
            const response = await api.get(`api/Files/${file.id}`, {
                responseType: 'blob'
            })

            const imageBlob = response.data

            return new Promise<SetAvatarDto>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string
                    const dto : SetAvatarDto = {
                        base64
                    }
                    resolve(dto)
                }
                reader.onerror = reject
                reader.readAsDataURL(imageBlob)
            })
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
        }
        return rejectWithValue({
            status: "internal",
            message: "You dum"
        })
    }
)

const userProflieSlice = createSlice({
    name: "user-proflie-slice",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadProflie.pending, (state) => {
            state.pending = true
            state.error = null
        })
        builder.addCase(loadProflie.fulfilled, (state, action) => {
            state.pending = false
            state.user = action.payload
        })
        builder.addCase(loadProflie.rejected, (state, action) => {
            state.pending = false
            state.error = action.error.message || "Untraced error"
        })

        builder.addCase(loadAvatar.fulfilled, (state, action) => {
            state.pending = false
            state.avatarBase64 = action.payload.base64
        })
        builder.addCase(loadAvatar.rejected, (state, action) => {
            state.pending = false
            state.error = action.error.message || "Untracked error"
        })
    }
})

export default userProflieSlice.reducer