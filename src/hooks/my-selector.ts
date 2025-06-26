import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../features/domain/redux/store-types";

export const useMySelector: TypedUseSelectorHook<RootState> = useSelector;