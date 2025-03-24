import { DATA_ACCEPTED, DATA_APPROVED, DATA_UNAPPROVED } from "@/constants";
import { useSelection } from "@/hooks/useSelection";
import { getApprovalStatus } from "@/utils/dataValueUtils";
import { FaCheckCircle } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { FiClock } from "react-icons/fi";

export default function CurrentApprovalStatus () {
    
    const { selectedApprovalData } = useSelection();
    
    const approvalStatus = getApprovalStatus(selectedApprovalData);
    
    const getIcon = () => {
        if (approvalStatus === DATA_UNAPPROVED) return <FiClock className="text-yellow-500 text-2xl" />
        
        if (approvalStatus === DATA_APPROVED) return <FaCheckCircle className="text-blue-400 text-2xl" />
        
        return <FcApproval className="text-green-500 text-2xl" />
    }
    
    return (
        <>
            <h3 className="text-md font-medium text-gray-700 flex flex-row space-x-2 mb-1">
                {getIcon()}
                <div>Status</div>
            </h3>
            <div className="flex items-center">
                <span className="text-sm text-gray-600">Current Status: </span>
                <span className="ml-2 font-semibold">
                    {approvalStatus === DATA_UNAPPROVED && <p className="text-yellow-500">Ready to approve</p>}
                    {approvalStatus === DATA_APPROVED && <p className="text-blue-500">Approved</p>}
                    {approvalStatus === DATA_ACCEPTED && <p className="text-green-600">Accepted</p>}
                </span>
            </div>
        </>
    )
}