import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { FileDto } from "../../../data/file";
import { UsefulServiceCategory, UsefulServiceDtoPagedListWithMetadata, UsefulServiceEditCreateDto } from "../../../data/useful-serices";

// Interfaces


// Thunks
export const getUsefulServices = createAsyncThunk<UsefulServiceDtoPagedListWithMetadata, {
  categories?: UsefulServiceCategory[];
  page?: number;
  pageSize?: number;
}, { rejectValue: ErrorRespone }>(
  "usefulServices/get",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      const response = await axios.get<UsefulServiceDtoPagedListWithMetadata>(`${apiUrl}/api/UsefulServices`, {
        params: {
          ...params,
          categories: params.categories?.join(","),
        },
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

export const createUsefulService = createAsyncThunk<void, UsefulServiceEditCreateDto, { rejectValue: ErrorRespone }>(
  "usefulServices/create",
  async (data, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      await axios.post(`${apiUrl}/api/UsefulServices`, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
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

// TODO: update и delete