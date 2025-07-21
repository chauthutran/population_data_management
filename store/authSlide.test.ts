import { IUser } from "@/types/definations"
import authReducer, { setUserData } from "./authSlide"

describe('authSlide', () => {
    const user: IUser = {
        _id: "123",
        email: "test1@gmail.com",
    }
    
    it("should return the init state", () => {
        const state = authReducer(undefined, {type: ""});
        expect(state).toEqual({user: null});
    });
    
    it("should handle setUserData with valid user", () => {
        const initialState = { user };
        const newState = authReducer(initialState, setUserData(null));
        expect(newState.user).toBeNull();
    });
});