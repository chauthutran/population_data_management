import { setPage } from '@/store/currentPageSlide';
import { AppDispatch, RootState } from '@/store/store';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCurrentPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const curPage = useSelector((state: RootState) => state.currentPage.name);
    const title = useSelector((state: RootState) => state.currentPage.title);

    // Menoize the callback for performance
    const setCurrentPage = useCallback(
        ({ name, title }: { name: string; title: string }) => {
            dispatch(setPage({ name, title }));
        },
        [dispatch],
    );

    return { curPage, title, setCurrentPage };
};
