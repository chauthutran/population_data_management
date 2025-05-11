export default function DataAccuracyTips() {
    return (
        <>
            <h2 className="text-lg font-semibold text-gray-800">
                Data Accuracy Tips
            </h2>
            <ul className="list-inside text-gray-700 text-sm space-y-2">
                <li className="flex items-start space-x-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <p>Double-check population numbers before submission.</p>
                </li>
                <li className="flex items-start space-x-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <p>Ensure the correct year and period are selected.</p>
                </li>
                <li className="flex items-start space-x-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <p>Only authorized personnel should submit entries.</p>
                </li>
            </ul>
        </>
    );
}
