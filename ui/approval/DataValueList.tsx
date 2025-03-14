import { IDataValue } from "@/types/definations";
import { useEffect } from "react";
import ApprovalButtonBar from "./BottomBar";
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
    }, [selectedDataSet?._id, selectedPeriod?.code, selectedOrgUnit?._id]);
    
    const fetchDataValues = async (): Promise<IDataValue[]> => {
         const payload = {
            period: selectedPeriod?.code,
            dataElements: selectedDataSet?.dataElements.map((de) => de._id),
            orgUnit: selectedOrgUnit?._id,
        }
                
        return await post<IDataValue[], any>("/api/dataValues?action=loadData", payload);
    }
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);

    if (loading || !data) return <div className="flex justify-center items-center">Loading...</div>;

    if (error) return <div className="text-red-500">An error occurred while fetching data. Please try again.</div>;

    return (
        <div className="flex-1 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDataSet!.name} - {selectedPeriod!.name}</h2>
            {data.length == 0
                ? <span className="italic">No data values</span>
                : <div className="gap-4">
                    <table className="w-full border-collapse">
                        <tbody className="divide-y divide-gray-200 space-y-10 bg-gray-50">
                            {data!.map((item: IDataValue) => (
                                <tr key={item._id}
                                    className="transition-transform transform hover:scale-105 hover:shadow-md hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="text-lg font-semibold text-gray-700 p-4">{item.dataElement.name}:</td> 
                                    <td className="text-sm text-gray-500 p-4">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
      
    )
}