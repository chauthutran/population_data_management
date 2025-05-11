import useAsyncData from '@/hooks/useAsyncData';
import { useSelection } from '@/hooks/useSelection';
import { IApprovalData } from '@/types/definations';
import { deleteData } from '@/utils/apiClient';
import { useRef } from 'react';

export default function UnacceptButton() {
    const {
        selectedDataSet,
        selectedPeriod,
        selectedOrgUnit,
        selectApprovalData,
    } = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData>();

    const unacceptData = async () => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
        };

        try {
            const result = await deleteData<IApprovalData, any>(
                '/api/approvalData/accept',
                payload,
            );
            selectApprovalData(result);
        } catch (error) {
            alert('Error occurred while unaccepting:' + error);
        }
    };

    return (
        <button
            onClick={() => unacceptData()}
            disabled={loading} // Disable the button if the request is in progress
            className="w-auto bg-green-700 hover:bg-green-600 border border-gray-200 text-white rounded-lg disabled:bg-gray-400 py-3 px-6 transition-all duration-300 transform hover:scale-105"
        >
            Un-Accept
        </button>
    );
}
