import { IPeriod, ISerializePeriod } from "@/types/definations";
import { generatePeriodsByType, getCurrentYear, serializePeriod } from "@/utils/periodUtils";
import { FormEvent, useEffect, useRef, useState } from "react";
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "./useClickOutside";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";


const curYear = getCurrentYear();

export default function PeriodSelect( {periodType}: {periodType: string} ) {
    
    const { selectedPeriod, selectedDataSet } = useSelection();
    const { selectPeriod } = useSetSelection();

    const [selectedyear, setSelectedYear] = useState<number>(curYear);
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside

    const handleOnPrev = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev - 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev - 1);
    }
    
    const handleOnNext = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev + 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev + 1);
    }
    
    const periods = generatePeriodsByType(periodType, selectedyear);
    const title = (selectedPeriod) ? selectedPeriod.name : "Select Period";
    
    return (
        <div className="relative bg-rich-teal border border-gray-300 rounded-md shadow-md">
    
        {/* Header Section */}
        <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={selectedDataSet === null}/>
    
        {showed && (
            <div 
                className="absolute w-full z-50 top-10 left-0 right-0 bg-rich-teal shadow-lg rounded-md border border-gray-200"
                ref={dropdownRef}
            >
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center p-1 bg-teal-600">
                    <button
                        onClick={handleOnPrev}
                        disabled={selectedyear <= 1000 }
                        className="text-xl text-white bg-teal-700 hover:bg-teal-600 disabled:text-gray-300 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                        &#128896;
                    </button>
                    
                    <button 
                        onClick={() => setSelectedYear(curYear)}
                        className="text-2xl text-white bg-teal-500 hover:bg-teal-400 disabled:text-gray-300 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                        &#9679;
                    </button>
                    
                    <button
                        onClick={handleOnNext}
                        disabled={selectedyear === curYear}
                        className="text-xl text-white bg-teal-400 hover:bg-teal-300 disabled:bg-gray-400 disabled:text-gray-200 py-1 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
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
                                className={`cursor-pointer  py-4 px-4 hover:bg-teal-300 hover:text-gray-800 transition-all duration-150 ${
                                    selectedPeriod && selectedPeriod.code === item.code 
                                        ? "bg-teal-300 text-gray-800" : "text-white"
                                }`}
                                onClick={() => selectPeriod(item)}
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