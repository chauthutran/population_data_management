import { useSelection } from "@/hooks/useSelection";
import ApprovalButtonBar from "./BottomBar";
import DataValueList from "./DataValueList";
import TopBar from "./TopBar";

export default function ApprovalPage () {
    
    
    return (
        <div className="bg-white shadow rounded">
            <TopBar />
            
            <div>
                <DataValueList />
            </div>
            
            <div className="mx-4">
                <ApprovalButtonBar />
            </div>
        </div>
    )
}