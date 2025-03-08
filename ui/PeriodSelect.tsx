import { IPeriod } from "@/types/definations";
import { generatePeriodsByType, getCurrentYear } from "@/utils/periodUtils";
import { useState } from "react";


const curYear = getCurrentYear();

export default function PeriodSelect( {periodType}: {periodType: string} ) {
    
    const [selectedyear, setSelectedYear] = useState<number>(curYear);
    
    const handleOnPrev = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev - 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev - 1);
    }
    
    const handleOnNext = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev + 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev + 1);
    }
    
    // const [periods, setPeriods] = useState<IPeriod[]>(generatePeriodsByType(periodType, curYear));
    const periods = generatePeriodsByType(periodType, selectedyear);
    
    return (
         <div className="w-64 h-full border border-slate-200">
            <div className="py-4 text-xl font-bold px-3">Period</div>
            <button className="bg-greenTest hover:bg-blue-700  font-bold py-2 px-4 rounded">
  Hover over me
</button>
                {/* Navigation buttons */}
                <div className="flex justify-between px-3 py-4 hover:bg-amber-300">
                    <button
                        onClick={handleOnPrev}
                        className="bold text-xl text-greenTest hover:text-greenTest disabled:text-gray-300 cursor-pointer"
                    >
                        &#128896;
                    </button>
                    <button 
                        onClick={() => setSelectedYear(curYear)}
                        className="bold text-2xl text-[#90EE90] hover:text-[#a2f0a2] disabled:text-gray-300 cursor-pointer">
                            &#9679;
                    </button>
                    <button
                        onClick={handleOnNext}
                        disabled={selectedyear === curYear}
                        className="bold text-xl text-[#1E90FF] hover:text-[#ADD8E6] disabled:text-gray-300 cursor-pointer"
                    >
                        &#128898;
                    </button>
                </div>
                 
                <ul className="">
                    {periods.map((item: IPeriod) => (
                        <li key={item.name} className="border-y border-slate-200 py-5 px-3 hover:bg-blue-100">{item.name}</li>
                    ))}
                </ul>
                
        </div>
    )
}