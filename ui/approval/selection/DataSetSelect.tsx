import { IDataSet } from "@/types/definations";
import { useEffect, useState } from "react";
import SelectionHeader from "../../basics/SelectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setDataSet } from "@/store/selectionSlice";
import useClickOutside from "@/ui/approval/selection/useClickOutside";
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
    
    return (
        <div className="relative">
           
            <SelectionHeader title="Data Set" showed={showed} setShowed={setShowed} />
            
            {showed && <div className="absolute z-50 top-10 left-0 right-0 bg-white shadow-lg min-w-56 max-h-96 min-h-fit" ref={dropdownRef}>
                {(dataSets === null)
                    ? (<div>Loading ...</div>)
                    : <ul className=" border border-slate-200">
                        {dataSets!.map((item: IDataSet) => (
                            <li key={item._id} 
                                className={`cursor-pointer border-b border-slate-200 py-5 px-3 hover:bg-blue-100 ${selectedDataSet && selectedDataSet._id === item._id && "bg-slate-200"}`}
                                onClick={() => selectDataSet(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>}
            </div>}
        </div>
    )
}