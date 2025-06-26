import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/domain/redux/store-types";

export const useMyDispatch = () => useDispatch<AppDispatch>();