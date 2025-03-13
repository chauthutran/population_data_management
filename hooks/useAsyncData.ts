import { useCallback, useEffect, useState } from "react";

type AsyncFunction<T> = () => Promise<T>;

export default function useAsyncData<T> () {
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const refetch = useCallback(async (asyncFunction: AsyncFunction<T>) => {
        setLoading(true);
        setError(null);
        
        try{
            const result = await asyncFunction();
            setData(result);
        }
        catch(error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        }
        finally {
            setLoading(false);
        }
    }, []);
    
    
    return {data, loading, error, refetch}
}