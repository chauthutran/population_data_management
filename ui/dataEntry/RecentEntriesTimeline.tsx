import { FaCalendarAlt } from 'react-icons/fa';

const recentEntries = [
    {
        dataset: 'City A Population',
        period: 'January 2025',
        count: '1,230,000',
        date: 'March 22, 2025',
    },
    {
        dataset: 'Rural Area Growth',
        period: '2024',
        count: '450,000',
        date: 'March 20, 2025',
    },
    {
        dataset: 'Urban Migration',
        period: 'February 2025',
        count: '120,000',
        date: 'March 19, 2025',
    },
];

export default function RecentEntriesTimeline() {
    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Recent Entries</h2>
            <div className="relative border-l-4 border-blue-500">
                {recentEntries.map((entry, index) => (
                    <div key={index} className="mb-6 ml-6">
                        <div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaCalendarAlt className="text-white text-sm" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            {entry.dataset}
                        </h3>
                        <p className="text-gray-600">{entry.period}</p>
                        <p className="text-gray-700 font-medium">
                            👥 {entry.count} people
                        </p>
                        <p className="text-gray-500 text-sm">
                            📅 Entered: {entry.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
