import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { FileDto } from "../../../data/file";

// Thunks
export const uploadFile = createAsyncThunk<FileDto, FormData, { rejectValue: ErrorRespone }>(
  "files/upload",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      const response = await axios.post<FileDto>(`${apiUrl}/api/Files`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
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

export const downloadFile = createAsyncThunk<Blob, string, { rejectValue: ErrorRespone }>(
  "files/download",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/Files/${fileId}`, {
        responseType: "blob",
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