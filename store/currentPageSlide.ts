import { PAGE_LOGIN } from "@/constants";
import { JSONObject } from "@/types/definations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: JSONObject = {
    name: PAGE_LOGIN,
    title: "Login",
}

const currentPageSlide = createSlice({
    name: "page",
    initialState,
    
    reducers: {
        setPage: (state, action: PayloadAction<JSONObject>) => {
            state.name = action.payload.name;
            state.title = action.payload.title;
        }
    }
});

export const { setPage } = currentPageSlide.actions;

const currentPageReducer = currentPageSlide.reducer;
export default currentPageReducer;