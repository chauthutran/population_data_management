export default function OverviewCards () {
    
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold">Data Entries</h3>
                <p className="text-2xl">123</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold">Pending Approvals</h3>
                <p className="text-2xl">15</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold">Insights</h3>
                <p className="text-2xl">5 Reports</p>
            </div>
    </div>
    )
}