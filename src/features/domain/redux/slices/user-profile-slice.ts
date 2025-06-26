import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../../data/user-profile";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { FileDto } from "../../../data/file";
import { Dependencies } from "../store";

export interface UserProfileState{
    user: UserProfile | null,
    pending: boolean,
    error: string | null,
    avatar: AvatarState
}

export interface AvatarState{
    avatarBase64: string | null,
    state: "pending" | "error" | "success"
}

const initState : UserProfileState = {
    user: null,
    pending: false,
    error: null,
    avatar: {
        state: "pending",
        avatarBase64: null
    },
}

const loadProfileUrl = "/api/Profile"

export const loadProflie = createAsyncThunk<UserProfile, void, {extra: Dependencies}>(
    "user-profile-slice.load",
    async (_, {extra, rejectWithValue, dispatch}) => {
        const {api} = extra;
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

const loadAvatar = createAsyncThunk<AvatarState, FileDto, {extra: Dependencies}>(
    "user-profile-slice.loadAvatat",
    async (file: FileDto, {rejectWithValue, extra}) => {
        const {api} = extra
        try{
            const response = await api.get(`api/Files/${file.id}`, {
                responseType: 'blob'
            })

            const imageBlob = response.data

            const extension = file.extension.toLowerCase();
            const mimeType = `image/${
                extension === 'jpg' ? 'jpeg' : extension
            }`;

            return await new Promise<AvatarState>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string
                    const dto : AvatarState = {
                        state: "success",
                        avatarBase64: `${base64}`
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

        builder.addCase(loadAvatar.pending, (state, action) => {
            state.avatar.state = "pending"
        })

        builder.addCase(loadAvatar.fulfilled, (state, action) => {
            state.avatar.state = "success"
            state.avatar = action.payload
        })
        builder.addCase(loadAvatar.rejected, (state, action) => {
            state.avatar.state = "error"
            state.error = action.error.message || "Untracked error"
        })
    }
})

export default userProflieSlice.reducer