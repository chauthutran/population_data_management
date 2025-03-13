import { IDataValue } from "@/types/definations";
import { useEffect } from "react";
import ApprovalButtonBar from "./approvalButtons/ApprovalButtonBar";
import { useSelection } from "@/hooks/useSelection";
import { post } from "@/utils/apiClient";
import useAsyncData from "@/hooks/useAsyncData";

export default function DataValueList () {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit } = useSelection();
    const { data, loading, error, refetch } = useAsyncData<IDataValue[]>();
    
    useEffect(() => {
        if (selectedDataSet !== null && selectedPeriod !== null && selectedOrgUnit !== null) {
            refetch(fetchDataValues);
        }
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);
    
    const fetchDataValues = async (): Promise<IDataValue[]> => {
         const payload = {
            period: selectedPeriod?.code,
            dataElements: selectedDataSet?.dataElements.map((de) => de._id),
            orgUnit: selectedOrgUnit?._id,
        }
                
        const list = await post<IDataValue[], any>("/api/dataValues?action=loadData", payload);
        return list;
    }
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);
    
    if (loading || !data) return (<>Loading ...</>);
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{selectedDataSet!.name} - {selectedPeriod!.name}</h1>
        
            {/* Table for larger screens (md and above) */}
            <div className="hidden md:block">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-grayish-yellow text-black">
                        <tr>
                            <th className="p-2 border text-left">Data Element</th>
                            <th className="p-2 border">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data!.map((item: IDataValue) => (
                            <tr key={item._id} className="odd:bg-white even:bg-gray-200">
                                <td className="border p-2">{item.dataElement.name}</td>
                                <td className="border p-2">{item.value}</td>
                            </tr>
                        ))}
                   </tbody>
                </table>
            </div>
        
            {/* List format for small screens (below md) */}
            <ul className="md:hidden divide-y divide-gray-200">
            {data!.map((item: IDataValue) => (
                <li key={item._id} className="px-3 py-4 odd:bg-light-gray-blue-odd even:bg-light-gray-blue-event">
                    <span className="font-semibold">{item.dataElement.name}:</span> {item.value}
                </li>
            ))}
            </ul>
            
            <ApprovalButtonBar />
      </div>
      
    )
}