import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../../config/default-config";
import axios from "axios";
import ErrorResponse from "../../../../common/ErrorInterface";
import { CertificateCreateDto, CertificateDto, CertificateUserType } from "../../../data/certificates";

export const getCertificates = createAsyncThunk<CertificateDto[], { userType: CertificateUserType; ownerId: string }, { rejectValue: ErrorResponse }>(
  "certificates/getCertificates",
  async ({ userType, ownerId }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      const response = await axios.get<CertificateDto[]>(
        `${apiUrl}/api/Certificates/userType/${userType}/entity/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
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

export const createCertificate = createAsyncThunk<void, CertificateCreateDto, { rejectValue: ErrorResponse }>(
  "certificates/createCertificate",
  async (certificateData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: { accessToken: string } };
      await axios.post(`${apiUrl}/api/Certificates`, certificateData, {
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