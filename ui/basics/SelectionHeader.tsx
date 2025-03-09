import { useState } from "react";

export default function SelectionHeader ({
    title,
    showed,
    setShowed,
}: {
    title: string;
    showed: boolean;
    setShowed: (flag: boolean) => void
}) {
    
    return (
        <div className="cursor-pointer py-2 px-3 space-x-3 text-justify flex items-center" onClick={() => setShowed(!showed)}>
            <span className="text-lg font-semibold">{title}</span>
            {showed && (
                <span className="flex items-center justify-center">
                    &#128899;
                </span>
            )}
            {!showed && (
                <span className="flex items-center justify-center">
                    &#128897;
                </span>
            )}
        </div>
    )
}