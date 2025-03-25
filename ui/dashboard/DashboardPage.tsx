import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FiHome, FiBarChart2, FiTable, FiSettings } from 'react-icons/fi';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 600 },
];

export default function Dashboard() {
    return (
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
            
            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-gray-600">Total Users</p>
                    <h3 className="text-2xl font-bold">1,240</h3>
                </div>
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-gray-600">Revenue</p>
                    <h3 className="text-2xl font-bold">$12,500</h3>
                </div>
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-gray-600">Orders</p>
                    <h3 className="text-2xl font-bold">324</h3>
                </div>
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-gray-600">Bounce Rate</p>
                    <h3 className="text-2xl font-bold">34%</h3>
                </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
                {/* Line Chart */}
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Revenue Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                            <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Data Table */}
            <section className="mt-6 bg-white p-6 shadow rounded-lg">
                <h3 className="text-lg font-bold mb-4">Recent Entries</h3>
                <div className="overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3">Date</th>
                                <th className="p-3">User</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">2024-03-25</td>
                                <td className="p-3">John Doe</td>
                                <td className="p-3">$120.00</td>
                                <td className="p-3 text-green-600">Completed</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3">2024-03-24</td>
                                <td className="p-3">Jane Smith</td>
                                <td className="p-3">$85.00</td>
                                <td className="p-3 text-yellow-600">Pending</td>
                            </tr>
                            <tr>
                                <td className="p-3">2024-03-23</td>
                                <td className="p-3">David Brown</td>
                                <td className="p-3">$150.00</td>
                                <td className="p-3 text-red-600">Canceled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
