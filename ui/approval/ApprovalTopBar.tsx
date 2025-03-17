import DataSetSelect from "../layout/selection/DataSetSelect";
import PeriodSelect from "../layout/selection/PeriodSelect";
import OrgUnitTree from "../layout/selection/OrgUnitTree";
import { useSelection } from "@/hooks/useSelection";

export default function ApprovalTopBar () {
    const { selectedDataSet, selectedOrgUnit, selectedPeriod, cleanAll, selectDataSet, selectOrgUnit, selectPeriod } = useSelection();
    
    return (
        <nav className="flex gap-4 items-center mb-6 px-4 py-2 bg-gray-100 border-t-2 text-black border-gray-300">
            <div className="flex-1">
                <DataSetSelect onItemSelect={selectDataSet} selected={selectedDataSet} />
            </div>

            <div className="flex-1">
                <PeriodSelect
                    disabled={!selectedDataSet}
                    periodType={selectedDataSet?.periodType.name || ""}
                    onChange={selectPeriod}
                    selected={selectedPeriod}
                />
            </div>

            <div className="flex-1">
                <OrgUnitTree onItemClick={selectOrgUnit} selected={selectedOrgUnit} disabled={!selectedPeriod} />
            </div>

            <button
                className="w-auto hover:bg-color-4 bg-deep-green border border-gray-200 text-white font-semibold rounded-lg py-3 px-6 transition-all duration-300 transform hover:scale-105"
                onClick={cleanAll}
            >
                Clear Data
            </button>
        </nav>

    )
}