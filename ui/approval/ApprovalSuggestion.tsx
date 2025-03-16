import { useSelection } from "@/hooks/useSelection";
import Link from "next/link";

const orgUnits = [
    { id: 1, name: "Health Department", dataSetId: "health-data" },
    { id: 2, name: "Education Department", dataSetId: "education-data" },
    { id: 3, name: "Finance Office", dataSetId: "finance-data" },
    { id: 4, name: "Public Works", dataSetId: "public-works-data" },
];

export default function ApprovalSuggestion() {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, selectOrgUnit } = useSelection();
    
    if( selectedDataSet == null || selectedPeriod == null || selectedOrgUnit == null ) return (<></>);
    
    return (
        <div className="w-full p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-50 max-w-80">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Suggestions</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto"> {/* Add max height and vertical scroll */}
                {selectedDataSet.orgUnits.filter((item) => item._id !== selectedOrgUnit._id).map((orgUnit) => (
                    <div
                        key={orgUnit._id}
                        className="p-2 transition-transform transform text-gray-600 hover:text-blue-400 cursor-pointer border-b border-gray-200"
                        onClick={() => selectOrgUnit(orgUnit)}
                    >
                        <h3 className="text-lg">{orgUnit.name}</h3>
                    </div>
                ))}
            </div>
        </div>

    );
}