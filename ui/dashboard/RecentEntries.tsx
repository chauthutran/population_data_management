import { DATA_ACCEPTED, DATA_APPROVED } from "@/constants";
import useAsyncData from "@/hooks/useAsyncData";
import { useAuth } from "@/hooks/useAuth";
import { IApprovalData } from "@/types/definations";
import { get } from "@/utils/apiClient";
import { getApprovalStatus } from "@/utils/dataValueUtils";
import { formatDate } from "@/utils/dateUtils";
import { useEffect } from "react";

export default function RecentEntries () {
    
    const { curUser } = useAuth();
    const { data, loading, error, refetch } = useAsyncData<IApprovalData[]>();
        
    useEffect(() => {
        refetch(fetchApprovalData);
    }, [])
    
    const fetchApprovalData = async (): Promise<IApprovalData[]> => {
       return await get<IApprovalData[]>(`/api/approvalData/${curUser?._id}`);
    }
    
    if (loading) return (<div>Loading ...</div>);
    if (error) return (<div>{error}</div>);
    if (!data) return (<></>);
    
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-3">Period</th>
                    <th className="p-3">OrgUnit</th>
                    <th className="p-3">Data Set</th>
                    <th className="p-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: IApprovalData) => {
                    const approvalStatus = getApprovalStatus(item);
                    
                    return (
                        <>
                            <tr className="border-b">
                                <td className="p-3">{item.period.name}</td>
                                <td className="p-3">{item.orgUnit.name}</td>
                                <td className="p-3">{item.dataSet.name}</td>
                                <td className="text-blue-500">Approved on {formatDate(item.approvedDate + "")}</td>
                            </tr>
                            
                            {approvalStatus === DATA_ACCEPTED && <tr className="border-b">
                                <td className="p-3">{item.period.name}</td>
                                <td className="p-3">{item.orgUnit.name}</td>
                                <td className="p-3">{item.dataSet.name}</td>
                                <td className="text-green-600">Accepted on {formatDate(item.acceptedDate + "")}</td>
                            </tr>}
                        </>
                    )})
                }
            </tbody>
        </table>
    )
}