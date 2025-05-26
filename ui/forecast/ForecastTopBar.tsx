import { KeyboardEvent, useState } from "react";
import { JSONObject } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { extractDataFormWitResponse } from "@/utils/witaiUtils";

export default function ForecastTopBar({
    onResult
}: {
    onResult: (data: JSONObject) => void;
}) {
    const [message, setMessage] = useState("Can you show the Death Rate and birth rate in Highland East and Highland West between 2020 and 2030?");
    
    const handleMessageOnchange = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            extractDataFromMessage();
        }
    };
    
    const extractDataFromMessage = async () => {
        const response = await post<JSONObject, any>(`/api/ask-wit`, { message });
        const data = extractDataFormWitResponse(response);
        onResult(data);
    }
    
    return (
        <nav className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6 px-4 py-2 bg-gray-100 border-t-2 text-black border-gray-300">
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyDown={handleMessageOnchange}
                className="w-full p-2 rounded-md border border-gray-200"
            />
            
            <button
                className="w-full sm:w-auto bg-color-1 text-white border border-gray-200 rounded-lg py-3 px-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={extractDataFromMessage}
            >
                Run
            </button>
        </nav>
    )
}