import useAsyncData from '@/hooks/useAsyncData';
import { useAuth } from '@/hooks/useAuth';
import { useSelection } from '@/hooks/useSelection';
import { IApprovalData } from '@/types/definations';
import { post } from '@/utils/apiClient';
import { useEffect } from 'react';

export default function ApproveButton() {
    const {
        selectedDataSet,
        selectedPeriod,
        selectedOrgUnit,
        selectApprovalData,
    } = useSelection();
    const { curUser } = useAuth();
    const { loading, error, refetch } = useAsyncData<IApprovalData | null>();

    const approveData = async (): Promise<IApprovalData | null> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
            approvedBy: curUser!._id,
        };

        const result = await post<IApprovalData, any>(
            '/api/approvalData/approve',
            payload,
        );
        selectApprovalData(result);

        return result;
    };

    return (
        <button
            onClick={() => refetch(approveData)}
            className="bg-blue-600 text-white hover:bg-blue-500 border-2 border-gray-200 disabled:bg-gray-400 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            disabled={loading}
        >
            Approve
        </button>
    );
}
