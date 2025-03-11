import { RootState } from "@/store/store";
import { IDataValue } from "@/types/definations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApproveButton from "./approvalButtons/ApproveButton";
import ButtonBar from "./approvalButtons/ApprovalButtonBar";
import ApprovalButtonBar from "./approvalButtons/ApprovalButtonBar";
import { useSelection } from "@/hooks/useSelection";
import { post } from "@/utils/apiClient";

export default function DataValueList () {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit } = useSelection();
    
    const [dataValues, setDataValues] = useState<IDataValue[] | null>(null);
    
    useEffect(() => {
        if (selectedDataSet !== null && selectedPeriod !== null && selectedOrgUnit !== null) {
            fetchDataValues();
        }
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);
    
    const fetchDataValues = async () => {
         const payload = {
            period: selectedPeriod?.code,
            dataElements: selectedDataSet?.dataElements.map((de) => de._id),
            orgUnit: selectedOrgUnit?._id,
        }
                
        const list = await post<IDataValue[], any>("/api/dataValues?action=loadData", payload);
        setDataValues(list);
    }
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);
    
    if (dataValues === null) return (<>Loading ...</>);
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{selectedDataSet!.name} - {selectedPeriod!.name}</h1>
        
            {/* Table for larger screens (md and above) */}
            <div className="hidden md:block">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border p-2 text-left">Data Element</th>
                    <th className="border p-2 text-left">Value</th>
                </tr>
                </thead>
                <tbody>
                {dataValues.map((item: IDataValue) => (
                    <tr key={item._id} className="border">
                    <td className="border p-2">{item.dataElement.name}</td>
                    <td className="border p-2">{item.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        
            {/* List format for small screens (below md) */}
            <ul className="md:hidden divide-y divide-gray-200">
            {dataValues.map((item: IDataValue) => (
                <li key={item._id} className="py-4">
                    <span className="font-semibold">{item.dataElement.name}:</span> {item.value}
                </li>
            ))}
            </ul>
            
            <ApprovalButtonBar />
      </div>
      
    )
}