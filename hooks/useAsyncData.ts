import { useState, useCallback, useRef } from 'react';

type AsyncFunction<T> = () => Promise<T>;

export default function useAsyncData<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const refetch = useCallback(
        async (asyncFunction: AsyncFunction<T>) => {
            if (loading) return; // Prevent multiple calls

            setLoading(true);

            try {
                const result = await asyncFunction();
                setData(result);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred',
                );
            } finally {
                setLoading(false); // Reset once request is complete
            }
        },
        [loading],
    );

    return { data, error, refetch, loading };
}
