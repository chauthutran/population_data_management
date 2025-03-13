import { IUser, JSONObject } from "@/types/definations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
    user: IUser | null;
}

const initialState: SelectionState = {
    user: null,
}

const authSlide = createSlice({
    name: "auth",
    initialState,
    
    reducers: {
        setUserData: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        }
    }
});

export const { setUserData } = authSlide.actions;

const authReducer = authSlide.reducer;
export default authReducer;