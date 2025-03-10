import { RootState } from "@/store/store";
import { IDataValue } from "@/types/definations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DataValueList () {
    
    const selectedDataSet = useSelector((state: RootState) => state.selection.dataSet);
    const selectedPeriod = useSelector((state: RootState) => state.selection.period);
    const selectedOrgUnit = useSelector((state: RootState) => state.selection.orgUnit);
 
    const [dataValues, setDataValues] = useState<IDataValue[] | null>(null);
    
    useEffect(() => {
        if (selectedDataSet !== null && selectedPeriod !== null && selectedOrgUnit !== null) {
            fetchDataValues();
        }
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);
    
    const fetchDataValues = async () => {
        const payload = {
            period: selectedPeriod?._id,
            dataElements: selectedDataSet?.dataElements.map((de) => de._id),
            orgUnit: selectedOrgUnit?._id,
        }
        const res = await fetch("/api/dataValues?action=loadData", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        
        if (!res.ok) {
            throw new Error("Failed to create data value set");
          }
          
        const list = await res.json();
        
        setDataValues(list);
    }
    
    if (dataValues === null) return (<div>Loading ...</div>);
    
    return (
            <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Value Sets</h1>
            <ul className="divide-y divide-gray-200">
                {dataValues.map((item: IDataValue) => (
                <li key={item._id} className="py-4">
                    <p>
                        <span className="font-semibold">Data Element:</span> {item.dataElement.name}
                    </p>
                    <p>
                        <span className="font-semibold">Period:</span> {item.period.name}
                    </p>
                    <p>
                        <span className="font-semibold">Value:</span> {item.value}
                    </p>
                </li>
                ))}
            </ul>
        </div>
    )
}