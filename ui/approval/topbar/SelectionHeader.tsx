import { useState } from "react";

export default function SelectionHeader ({
    title,
    showed,
    setShowed,
    disabled,
}: {
    title: string;
    showed: boolean;
    setShowed: (flag: boolean) => void;
    disabled: boolean;
}) {
    
    const handleOnClick = () => {
        if(!disabled) setShowed(!showed);
    }
    
    return (
        <div className={`cursor-pointer py-2 px-3 space-x-3 text-justify flex items-center  ${disabled ? "bg-gray-300 text-gray-500" : "text-white"}`} onClick={() => handleOnClick()}>
            <span className="flex-1 truncate-text">{title}</span>
            {showed && (
                <span className="">
                    &#128899;
                </span>
            )}
            {!showed && (
                <span className="">
                    &#128897;
                </span>
            )}
        </div>
    )
}