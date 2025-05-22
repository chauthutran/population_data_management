import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from './selectionSlice';
import currentPageReducer from './currentPageSlide';
import authReducer from './authSlide';
import chartReducer from './chartSlide';
import dataEntryReducer from './dataEntrySlice';
import forecastReducer from './forecastSlice';

export const store = configureStore({
    reducer: {
        dataEntry: dataEntryReducer,
        selection: selectionReducer,
        chart: chartReducer,
        currentPage: currentPageReducer,
        forecast: forecastReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
