import DataSetSelect from "./selection/DataSetSelect";
import OrgUnitTree from "./selection/OrgUnitTree";
import PeriodSelect from "./selection/PeriodSelect";

export default function HomePage () {
    
    return (
    // <header className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
            {/* Dataset Dropdown */}
          <DataSetSelect />

            {/* Period Dropdown */}
                <PeriodSelect periodType="Yearly" />

            {/* Orgunit Tree */}
            <OrgUnitTree />
        </div>
    // </header>
    )
}