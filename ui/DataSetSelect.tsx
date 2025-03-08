import { IDataSet } from "@/types/definations";
import { useEffect, useState } from "react";

export default function DataSetSelect() {
    
    const[dataSets, setDataSets] = useState<IDataSet[]>([]);
    
    useEffect(() => {
        fetchDataSets();
    }, [])
    
    const fetchDataSets = async () => {
        const res = await fetch("/api/dataSets");
        const list = await res.json();
        
        setDataSets(list);
    }
    
    return (
        <div className="w-64 h-full border border-slate-200">
            <div className="py-4 text-xl font-bold px-3">Data Set</div>
                <ul className="">
                    {dataSets.map((item: IDataSet) => (
                        <li key={item.name} className="border-y border-slate-200 py-5 px-3 hover:bg-blue-100">{item.name}</li>
                    ))}
                </ul>
        </div>
    )
}