import { useEffect, useRef } from 'react';

export default function useClickOutside(callback: () => void) {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // }, [callback]);
    }, [callback]);

    return ref; // Return the ref to attach to the component
}
