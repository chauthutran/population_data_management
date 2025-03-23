import DataEntryForm from "./DataEntryForm";
import DataEntryTopBar from "./DataEntryTopBar";

export default function DataEntryPage() {
    
    return (
        <div className="w-full">
            <DataEntryTopBar />
            
            <DataEntryForm />
        </div>
    )
}