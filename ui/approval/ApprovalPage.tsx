import { useSelection } from "@/hooks/useSelection";
import ApprovalButtonBar from "./ApprovalButtonBar";
import DataValueList from "./DataValueList";
import TopBar from "./ApprovalTopBar";
import ApprovalSuggestion from "./ApprovalSuggestion";

export default function ApprovalPage () {
    
    
    return (
        <div className="bg-white shadow rounded pb-1 w-full">
            <TopBar />
            
            <div className="flex flex-row space-x-6 mx-4">
                
                <div className="flex-1 border border-gray-200 rounded-lg shadow-lg bg-gray-50 p-6">
                    <DataValueList />
                    <ApprovalButtonBar />
                </div>
                
                <ApprovalSuggestion />
            </div>
            
        </div>
    )
}