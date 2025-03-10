import { IPeriod, ISerializePeriod } from "@/types/definations";
import { generatePeriodsByType, getCurrentYear, serializePeriod } from "@/utils/periodUtils";
import { FormEvent, useEffect, useRef, useState } from "react";
import SelectionHeader from "../../basics/SelectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPeriod } from "@/store/selectionSlice";
import useClickOutside from "@/hooks/useClickOutside";


const curYear = getCurrentYear();

export default function PeriodSelect( {periodType}: {periodType: string} ) {
        
    const selectedPeriod = useSelector((state: RootState) => state.selection.period);
    const dispatch = useDispatch();

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
    
    return (
        
        <div className="relative h-full">
           
            <SelectionHeader title="Period" showed={showed} setShowed={setShowed} />
            
            {showed && <div className="absolute w-64 z-50 top-10 left-0 right-0 bg-white shadow-lg h-96" ref={dropdownRef}>
                
                {/* Navigation buttons */}
                <div className="flex">
                    <button
                        onClick={handleOnPrev}
                        className="bold text-xl text-white bg-blue-600 hover:bg-blue-500 disabled:text-gray-300 cursor-pointer flex-1"
                    >
                        &#128896;
                    </button>
                    
                    <button 
                        onClick={() => setSelectedYear(curYear)}
                        className="bold text-2xl text-white bg-green-600 hover:bg-green-500 disabled:text-gray-300 cursor-pointer flex-1"
                    >
                        &#9679;
                    </button>
                    
                    <button
                        onClick={handleOnNext}
                        disabled={selectedyear === curYear}
                        className="bold text-xl text-white bg-orange-600 hover:bg-orange-500 disabled:text-gray-300 cursor-pointer flex-1"
                    >
                        &#128898;
                    </button>
                </div>

                {/* Period List */}
                <div className="border border-slate-200 min-h-96 overflow-y-auto">
                    <ul className="border border-slate-200 max-h-80">
                        {periods.map((item: ISerializePeriod) => (
                            <li key={item.name} 
                                className={`cursor-pointer py-5 px-3 border-y border-slate-200 bg-white hover:bg-blue-100 ${selectedPeriod && selectedPeriod.name === item.name && "bg-slate-300"}`}
                                onClick={() => dispatch(setPeriod(item))}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
        </div>
    )
}