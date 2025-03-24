import { useDataEntry } from "@/hooks/useDataEntry";
import DataEntryForm from "./DataEntryForm";
import DataEntryTopBar from "./DataEntryTopBar";
import RecentEntriesTimeline from "./RecentEntriesTimeline";
import { getApprovalStatus } from "@/utils/dataValueUtils";
import { FiClock, FiThumbsUp } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

export default function DataEntryPage() {
    const { selectedOrgUnit, selectedPeriod, selectedDataSet, selectedApprovalData } = useDataEntry();

    const approvalStatus = getApprovalStatus(selectedApprovalData);
    

    
    return (
       
        <div className="flex flex-col w-full">
            <div>
                <DataEntryTopBar />
            </div>
            
            <div className="flex flex-1">
                {/* Left Side - Data Entry Form */}
                <div className="w-2/3 px-6 space-y-4">
                    <header>
                        {(!selectedDataSet || !selectedPeriod || !selectedOrgUnit) 
                            ? <h2 className="text-xl mb-2 italic">Please select options</h2>
                            : <>
                                <h2 className="text-xl font-semibold mb-2">{selectedDataSet?.name} - {selectedPeriod?.name} - {selectedOrgUnit?.name}</h2>
                                <p className="text-gray-600">Fill out the form below to add new records.</p>
                            </>
                        }
                    </header>
                    
                    <DataEntryForm />
                </div>
            
                {/* Right Side - Sidebar & Info */}
                <div className="w-1/3 bg-gray-100 p-6 flex flex-col">
                    <aside className="mb-6">
                        <h2 className="text-lg font-semibold">Need Help?</h2>
                        <p className="text-gray-600 text-sm">
                        This form collects population data for statistical purposes. Please input the correct population count and verify before submission.
                        </p>
                    </aside>

                    <section className="mb-8 space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800">Data Accuracy Tips</h2>
                        <ul className="list-inside text-gray-700 text-sm space-y-2">
                            <li className="flex items-start space-x-2">
                                <span className="text-green-500 text-lg">✅</span>
                                <p>Double-check population numbers before submission.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="text-green-500 text-lg">✅</span>
                                <p>Ensure the correct year and period are selected.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="text-green-500 text-lg">✅</span>
                                <p>Only authorized personnel should submit entries.</p>
                            </li>
                        </ul>
                    </section>

                    {selectedPeriod && selectedDataSet && selectedOrgUnit && <section>
                        <h2 className="text-lg font-semibold mb-2">Data Overview</h2>
                            {approvalStatus.canApprove && <div className="flex space-x-3 items-center bg-yellow-300 p-2 rounded-md">
                                <FiClock className="text-white text-2xl" />
                                <div className="">
                                    Data is ready to approve
                                </div>
                            </div>}
                            {!approvalStatus.canApprove && <div className="flex space-x-3 items-center bg-blue-400 p-2 rounded-md">
                                <FaCheckCircle className="text-white text-2xl" />
                                <div>
                                    Data is approved
                                </div>
                            </div>}
                            {approvalStatus.canAccept && <div className="flex space-x-3 items-center bg-green-500 p-2 rounded-md">
                                <FaCheckCircle className="text-white text-2xl" />
                                <div>
                                    Data is accepted
                                </div>
                            </div>}
                    </section> }
                </div>
            </div>
        </div>
    )
}