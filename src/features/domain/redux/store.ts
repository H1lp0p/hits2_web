import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./persist";
import { AxiosInstance } from "axios";
import { createApi } from "../../../common/axios-builder";
import { refreshSession } from "./slices/user-sessions-slice";
import { RootState } from "./store-types";

export type Dependencies = {
    api: AxiosInstance
}

export const createStore = (preloaded? : Partial<RootState>) => {
    let store: any;

    const api = createApi(
        () => {
        const state = store.getState();
        return state.session.accessToken;
        },
        async () => {
        await store.dispatch(refreshSession());
        return store.getState().session.accessToken;
        }
    );

    const deps: Dependencies = {
        api
    }

    const real_store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/PURGE', 'persist/REGISTER'],
            },
            thunk: {
                extraArgument: deps
            }
        }),
    })

    store = real_store

    const perisstor = persistStore(real_store);

    return {store: real_store, perisstor, deps}
}