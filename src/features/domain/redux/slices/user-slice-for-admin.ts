import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { PagedListMetaData } from "../../../data/page-list-metadata";
import { ProfileShortDtoPagedListWithMetadata, UserProfile } from "../../../data/user-profile";

// Thunks
export const getUsersList = createAsyncThunk<ProfileShortDtoPagedListWithMetadata, {
  email?: string;
  name?: string;
  filterLastName?: string;
  page?: number;
  pageSize?: number;
}, { rejectValue: ErrorRespone }>(
  "user/getList",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      const response = await axios.get<ProfileShortDtoPagedListWithMetadata>(`${apiUrl}/api/User/list`, {
        params,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          status: error.response?.status || -1,
          message: error.response?.statusText || "Unknown error",
          payload: error.response?.data,
        });
      }
      return rejectWithValue({
          status: -1,
          message: "Unknown error",
          payload: undefined
      });
    }
  }
);

export const getUserProfile = createAsyncThunk<UserProfile, string, { rejectValue: ErrorRespone }>(
  "user/getProfile",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      const response = await axios.get<UserProfile>(`${apiUrl}/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          status: error.response?.status || -1,
          message: error.response?.statusText || "Unknown error",
          payload: error.response?.data,
        });
      }
      return rejectWithValue({
          status: -1,
          message: "Unknown error",
          payload: undefined
      });
    }
  }
);

// TODO: well, all other