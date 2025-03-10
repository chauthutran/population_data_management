import { PAGE_LOGIN } from "@/constants";
import { JSONObject } from "@/types/definations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: JSONObject = {
    curPage: PAGE_LOGIN,
}

const currentPageSlide = createSlice({
    name: "page",
    initialState,
    
    reducers: {
        setPage: (state, action: PayloadAction<JSONObject>) => {
            state.curPage  = action.payload; 
        }
    }
});

export const { setPage } = currentPageSlide.actions;

const currentPageReducer = currentPageSlide.reducer;
export default currentPageReducer;