export default function PendingApprovalData () {
    
    return (
        <div className="bg-card-bg p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
            <div className="border-b py-2 flex justify-between">
                <span>City A - 1,000,000</span>
                <button className="bg-button-primary text-white px-3 py-1 rounded">Approve</button>
            </div>
            <div className="border-b py-2 flex justify-between">
                <span>City B - 500,000</span>
                <button className="bg-button-primary text-white px-3 py-1 rounded">Approve</button>
            </div>
        </div>
    )
}   