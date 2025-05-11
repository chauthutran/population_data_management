import { DATA_ACCEPTED, DATA_APPROVED, DATA_UNAPPROVED } from '@/constants';
import { IApprovalData } from '@/types/definations';
import { getApprovalStatus } from '@/utils/dataValueUtils';
import { FaCheckCircle } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

export default function DataApprovalStatus({
    approvalData,
}: {
    approvalData: IApprovalData | null;
}) {
    const approvalStatus = getApprovalStatus(approvalData);

    return (
        <>
            {approvalStatus === DATA_UNAPPROVED && (
                <div className="flex space-x-3 items-center bg-yellow-300 p-2 rounded-md">
                    <FiClock className="text-white text-2xl" />
                    <div className="">Data is ready to approve</div>
                </div>
            )}

            {approvalStatus === DATA_APPROVED && (
                <div className="flex space-x-3 items-center bg-blue-400 p-2 rounded-md">
                    <FaCheckCircle className="text-white text-2xl" />
                    <div>Data is approved</div>
                </div>
            )}

            {approvalStatus === DATA_ACCEPTED && (
                <div className="flex space-x-3 items-center bg-green-500 p-2 rounded-md">
                    <FaCheckCircle className="text-white text-2xl" />
                    <div>Data is accepted</div>
                </div>
            )}
        </>
    );
}
