import { JSONObject } from '@/types/definations';
import { useEffect, useState } from 'react';

export default function Alert({
    id = 1,
    message,
    type,
    duration = 3000, // default 3 seconds
}: {
    id?: number; // some unique value to reload alert when the same message comes
    message: string;
    type: string;
    duration?: number;
}) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (message) {
            setShow(true); // show alert when new message comes
            
            const timer = setTimeout(() => {
                setShow(false);
            }, duration);
            return () => clearTimeout(timer); // cleanup on unmount
        }
    }, [message, duration, id]);
    
    if (!message || !show) return <div></div>;

    const colors: JSONObject = {
        error: 'bg-red-100 border-red-400 text-red-700',
        success: 'bg-green-100 border-green-400 text-green-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-xl w-full border-l-4 p-4 rounded shadow-md ${colors[type]}`}
            role="alert"
        >
            <div className="flex justify-between items-center">
                <p className="font-medium">{message}</p>
                <button
                    onClick={() => setShow(false)}
                    aria-label="Close alert"
                    className="text-2xl font-bold leading-none hover:text-black focus:outline-none"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
