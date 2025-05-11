import { DATA_ACCEPTED, DATA_APPROVED, DATA_UNAPPROVED } from '@/constants';
import { useSelection } from '@/hooks/useSelection';
import { JSONObject } from '@/types/definations';
import { getApprovalStatus } from '@/utils/dataValueUtils';
import { formatDate } from '@/utils/dateUtils';
import { MdOutlineHistory } from 'react-icons/md';

export default function ApprovalHistory() {
    const { selectedApprovalData } = useSelection();
    const approvalStatus = getApprovalStatus(selectedApprovalData);

    return (
        <>
            {approvalStatus !== DATA_UNAPPROVED && (
                <>
                    <h3 className="text-md font-medium mb-2 space-x-2 items-center flex">
                        <MdOutlineHistory
                            className="text-orange-400"
                            size={25}
                        />
                        <div className="text-gray-700">Approval History</div>
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                        <li className="lowercase">
                            {selectedApprovalData?.approvedBy.email}{' '}
                            <span className="font-semibold">approved</span> on{' '}
                            {formatDate(
                                selectedApprovalData?.approvedDate! + '',
                            )}
                        </li>
                        {approvalStatus === DATA_ACCEPTED && (
                            <li className="lowercase">
                                {selectedApprovalData?.acceptedBy.email}{' '}
                                <span className="font-semibold">accepted</span>{' '}
                                on{' '}
                                {formatDate(
                                    selectedApprovalData?.acceptedDate! + '',
                                )}
                            </li>
                        )}
                    </ul>
                </>
            )}
        </>
    );
}
