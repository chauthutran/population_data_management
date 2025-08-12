import DashboardChart1 from '@/ui/dashboard/DashboardChart1';
import DashboardChart2 from '@/ui/dashboard/DashboardChart2';
import RecentEntries from '@/ui/dashboard/RecentEntries';
import Alert from '@/ui/layout/Alert';

export default function DashboardPage() {
    return (
        <>
            <Alert message={"Welcome back to Population Data Management! Let's get to work."} type="success" />
            
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                {/* Charts Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart & Heatmap*/}
                    <DashboardChart1 />

                    {/* Bar Chart & Heatmap */}
                    <DashboardChart2 />
                </section>

                {/* Data Table */}
                <section className="mt-6 bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Recent Entries</h3>
                    <div className="overflow-auto">
                        <RecentEntries />
                    </div>
                </section>
            </div>
        </>
    );
}
