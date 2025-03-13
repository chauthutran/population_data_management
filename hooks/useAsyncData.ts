import { useState, useCallback, useRef } from 'react';

type AsyncFunction<T> = () => Promise<T>;

export default function useAsyncData<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isRequestInProgress = useRef(false); // Track request state using useRef

    const refetch = useCallback(async (asyncFunction: AsyncFunction<T>) => {
        if (isRequestInProgress.current) return; // Prevent refetch if a request is already in progress

        isRequestInProgress.current = true; // Set to true when request starts

        try {
            const result = await asyncFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            isRequestInProgress.current = false; // Reset once request is complete
        }
    }, []);

    return { data, error, refetch, loading: isRequestInProgress.current };
}
