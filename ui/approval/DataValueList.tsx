import { IDataValue } from "@/types/definations";
import { useEffect } from "react";
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
                
        return await post<IDataValue[], any>("/api/dataValues/retrieve", payload);
    }
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);

    if (loading || !data) return <div className="flex justify-center items-center">Loading...</div>;

    if (error) return <div className="text-red-500">An error occurred while fetching data. Please try again.</div>;

    return (
        <div className="flex-1"> {/* Ensure it has a height */}
    {data.length === 0 ? (
        <span className="italic">No data values</span>
    ) : (
        <div className="overflow-auto max-h-[40vh] bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full table-auto">
            {/* Table Head (Sticky) */}
            <thead className="bg-gray-100 text-gray-700 sticky top-0 shadow-md">
                <tr>
                    <th className="text-left p-4 font-semibold">Data Element</th>
                    <th className="text-left p-4 font-semibold">Value</th>
                </tr>
            </thead>
    
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
                {data!.map((item: IDataValue, index) => (
                    <tr
                        key={item._id}
                        className={`transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer 
                        ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <td className="font-semibold text-gray-700 p-4">{item.dataElement.name}:</td>
                        <td className="text-gray-600 p-4">{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    )}
</div>

    )
}