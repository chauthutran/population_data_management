import { IDataSet } from "@/types/definations";
import { useEffect, useState } from "react";
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "../../hooks/useClickOutside";
import { get } from "@/utils/apiClient";

export default function DataSetSelect({selected, onItemSelect}: {selected?: IDataSet | null; onItemSelect: (item: IDataSet) => void}) {
    
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
    
    const handleOnClickItem = (item: IDataSet) => {
        onItemSelect(item);
        setShowed(false);
    }
    
    const title = (selected) ? selected.name : "Select Data Set";

    return (
        <div 
            className="relative border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-lemon-lime"
            tabIndex={0}
            ref={dropdownRef}
        >
           
            <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={false} />
            
            {showed && <div 
                className="absolute w-full rounded-md z-50 top-10 left-0 right-0 bg-white shadow-lg overflow-y-auto"
            >
                {dataSets === null ? (
                    <div className="p-4">Loading...</div>
                ) : (
                    <ul className="border border-gray-200 divide-y divide-gray-300">
                        {dataSets!.map((item: IDataSet) => (
                            <li 
                                key={item._id} 
                                className={`cursor-pointer py-3 px-4 transition duration-200 ease-in-out hover:bg-lemon-lime ${
                                    selected && selected._id === item._id && "bg-lemon-lime font-semibold"
                                }`}
                                onClick={() => handleOnClickItem(item)}
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