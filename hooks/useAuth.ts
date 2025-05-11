import { setUserData } from '@/store/authSlide';
import { AppDispatch, RootState } from '@/store/store';
import { IUser } from '@/types/definations';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const curUser = useSelector((state: RootState) => state.auth.user);

    // Menoize the callback for performance
    const setUser = useCallback(
        (user: IUser | null) => {
            dispatch(setUserData(user));
        },
        [dispatch],
    );

    return { curUser, setUser };
};
