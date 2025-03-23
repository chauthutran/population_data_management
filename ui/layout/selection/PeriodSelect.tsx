import { IPeriod, ISerializePeriod } from "@/types/definations";
import { generatePeriodsByType, getCurrentYear } from "@/utils/periodUtils";
import { FormEvent, useEffect, useRef, useState } from "react";
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "../../../hooks/useClickOutside";
import DisableField from "../basic/DisableField";


const curYear = getCurrentYear();

export default function PeriodSelect(
{
    periodType,
    selected,
    disabled,
    onChange
}: {
    periodType: string,
    selected?: ISerializePeriod | null;
    disabled: boolean;
    onChange: (periods: ISerializePeriod ) => void
}) {

    const [selectedyear, setSelectedYear] = useState<number>(curYear);
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside

    useEffect(() => {
        
    }, [selected, periodType]);
    
    const handleOnPrev = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev - 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev - 1);
    }
    
    const handleOnNext = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev + 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev + 1);
    }
    
    const handleOnClickItem = (item: ISerializePeriod) => {
        onChange(item);
        setShowed(false);
    }
    
    const periods = generatePeriodsByType(periodType, selectedyear);
    const title = (selected) ? selected.name : "Select Period";
    
    return (
        <div
            className={`relative bg-rich-teal border-2 border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-blue-300 ${selected ? "border-blue-300" : "border-gray-300"}`}
            tabIndex={0}
            ref={dropdownRef}
        >
            {/* Header Section */}
            <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={disabled} />
        
            {showed && (
                <div
                    className="absolute bg-white w-full z-50 top-10 left-0 right-0 bg-rich-teal shadow-lg rounded-md border border-gray-200"
                >
                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center bg-gray-300">
                        <button
                            onClick={handleOnPrev}
                            disabled={selectedyear <= 1000 }
                            className="text-xl text-gray-600 disabled:text-gray-200 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                        >
                            &#128896;
                        </button>
                        
                        <button 
                            onClick={() => setSelectedYear(curYear)}
                            className="text-2xl text-gray-600 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                        >
                            &#9679;
                        </button>
                        
                        <button
                            onClick={handleOnNext}
                            disabled={selectedyear === curYear}
                            className="text-xl text-gray-600 disabled:text-gray-200 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                        >
                            &#128898;
                        </button>
                    </div>

                    {/* Period List */}
                    <div className="border border-gray-200 min-h-96 max-h-80 overflow-y-auto rounded-b-md">
                        <ul className="divide-y divide-gray-200">
                            {periods.map((item: ISerializePeriod) => (
                                <li 
                                    key={item.name} 
                                    className={`cursor-pointer py-4 px-4 hover:bg-blue-300 transition-all duration-150 ${
                                        selected && selected?.code === item.code
                                            && "bg-blue-300 font-semibold"
                                    }`}
                                    onClick={() => handleOnClickItem(item)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}