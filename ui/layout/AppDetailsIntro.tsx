import { FcApproval, FcComboChart, FcDataSheet } from "react-icons/fc";

export default function AppDetailsIntro() {
    return (
        <>
            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcDataSheet size={35} /> 
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Data Entry</h3>
                    <div className="text-sm">
                        Allows users to input, update, and manage data efficiently.
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcApproval size={35} /> 
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Approvals</h3>
                    <div className="text-sm">
                        Ensures that submitted data undergoes a review process before finalization.
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcComboChart size={35} /> 
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Charts</h3>
                    <div className="text-sm">
                        Provides visual insights into the collected data
                    </div>
                </div>
            </div>
        </>
    )
}