import ErrorRespone from "../../../common/ErrorInterface";
import { persistedReducer } from "./persist";
import { createStore, Dependencies } from "./store";

// Тип состояния корневого редьюсера
export type RootState = ReturnType<typeof persistedReducer>;

// Тип нашего store
export type AppStore = ReturnType<typeof createStore>;

// Тип dispatch
export type AppDispatch = AppStore["store"]["dispatch"];

// Тип зависимостей
export type ThunkDependencies = Dependencies;

export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
  rejectValue: ErrorRespone;
};