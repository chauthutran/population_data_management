import { IDataSet } from "@/types/definations";
import { useEffect, useState } from "react";
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "./useClickOutside";
import { useSetSelection } from "@/hooks/useSetSelection";
import { useSelection } from "@/hooks/useSelection";
import { get } from "@/utils/apiClient";

export default function DataSetSelect() {
    
    const { selectedDataSet } = useSelection();
    const { selectDataSet} = useSetSelection();
    
    const[dataSets, setDataSets] = useState<IDataSet[] | null>(null);
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside
    
    useEffect(() => {
        fetchDataSets();
    }, [])
    
    const fetchDataSets = async () => {
        const list = await get<IDataSet[]>("/api/dataSets");
        setDataSets(list);
    }
    
    const title = (selectedDataSet) ? selectedDataSet.name : "Select Data Set";
    
    return (
        <div className="relative border rounded-md border-light-gray-blue-event bg-sunset-orange">
           
            <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={false} />
            
            {showed && <div 
                className="absolute w-full rounded-md z-50 top-10 left-0 right-0 bg-sunset-orange shadow-lg min-w-56 max-h-96 min-h-fit overflow-y-auto"
                ref={dropdownRef}
            >
                {dataSets === null ? (
                    <div className="p-4 text-white">Loading...</div>
                ) : (
                    <ul className="border border-gray-300 text-white divide-y divide-gray-300">
                        {dataSets!.map((item: IDataSet) => (
                            <li 
                                key={item._id} 
                                className={`cursor-pointer py-3 px-4 transition duration-200 ease-in-out hover:bg-light-sunset-orange hover:text-gray-800 ${
                                    selectedDataSet && selectedDataSet._id === item._id && "bg-light-sunset-orange text-gray-800 font-semibold"
                                }`}
                                onClick={() => selectDataSet(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>}
        </div>
    )
}