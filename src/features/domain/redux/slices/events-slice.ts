import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorRespone from "../../../../common/ErrorInterface";
import { EventDto, EventExternalRegisterDto, EventInnerRegisterDto, EventShortDtoPagedListWithMetadata } from "../../../data/evets";

// Interfaces


// Thunks
export const getPublicEvents = createAsyncThunk<EventShortDtoPagedListWithMetadata, {
  name?: string;
  eventDate?: string;
  timezoneOffset?: number;
  page?: number;
  pageSize?: number;
}, { rejectValue: ErrorRespone }>(
  "events/getPublicEvents",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<EventShortDtoPagedListWithMetadata>(`${apiUrl}/api/Events/public`, {
        params,
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

export const getPublicEventDetails = createAsyncThunk<EventDto, string, { rejectValue: ErrorRespone }>(
  "events/getPublicEventDetails",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get<EventDto>(`${apiUrl}/api/Events/public/${eventId}`);
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

export const registerForEventInner = createAsyncThunk<void, EventInnerRegisterDto, { rejectValue: ErrorRespone }>(
  "events/registerInner",
  async (data, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      await axios.post(`${apiUrl}/api/Events/register/inner`, data, {
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

export const registerForEventExternal = createAsyncThunk<void, EventExternalRegisterDto, { rejectValue: ErrorRespone }>(
  "events/registerExternal",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`${apiUrl}/api/Events/register/external`, data);
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

// TODO: admin endpoints