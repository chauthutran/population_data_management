import { IDataElement, IPeriod, ISerializePeriod } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomMultiSelect from "../basic/CustomMultiSelect";
import { generatePeriodsByType, getCurrentYear } from "@/utils/periodUtils";
import { useEffect, useState } from "react";

const curYear = getCurrentYear();

export default function PeriodMultiSelect(
{
    periodType,
    selected,
    onChange
}: {
    periodType: string;
    selected: ISerializePeriod[] | null;
    onChange: (periods: ISerializePeriod[] ) => void
}) {
    
    const [selectedyear, setSelectedYear] = useState<number>(curYear);

    useEffect(() => {
        
    }, [selected]);
    
    const handleOnPrev = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev - 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev - 1);
    }
    
    const handleOnNext = () => {
        if (periodType === "Yearly") setSelectedYear((prev) => prev + 10);
        else if (periodType === "Monthly") setSelectedYear((prev) => prev + 1);
    }
    
    return (
        <>
            <CustomMultiSelect<ISerializePeriod>
                key={selectedyear}
                title="Select Period"
                displayProp="name"
                valueProp="code"
                selected={selected}
                fetchData={async() => generatePeriodsByType(periodType, selectedyear)}
                onChange={onChange}
            />
            
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
        </>
    )
}