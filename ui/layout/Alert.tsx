import { JSONObject } from '@/types/definations';
import { useState } from 'react';

export default function Alert({
    message,
    type,
}: {
    message: string;
    type: string;
}) {
    const [show, setShow] = useState(true);

    if (!message || !show) return null;

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
