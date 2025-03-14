import { useSelection } from "@/hooks/useSelection";
import ApprovalButtonBar from "./BottomBar";
import DataValueList from "./DataValueList";
import TopBar from "./TopBar";
import ApprovalSuggestion from "./ApprovalSuggestion";

export default function ApprovalPage () {
    
    
    return (
        <div className="bg-white shadow rounded pb-1">
            <TopBar />
            
            <div className="flex flex-row space-x-6 mx-4">
                
                <div className="flex-1">
                    <DataValueList />
                </div>
                <div className="mr-auto">
                    <ApprovalSuggestion />
                </div>
            </div>
            
            <div className="mx-4">
                <ApprovalButtonBar />
            </div>
            
        </div>
    )
}