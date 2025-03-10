import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "./selectionSlice";
import currentPageReducer from "./currentPageSlide";

export const store = configureStore({
    reducer: {
        selection: selectionReducer,
        currentPage: currentPageReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;