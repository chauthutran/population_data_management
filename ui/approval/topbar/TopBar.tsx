import DataSetSelect from "./DataSetSelect";
import OrgUnitTree from "./OrgUnitTree";
import PeriodSelect from "./PeriodSelect";

export default function TopBar () {
    return (
        <div className="flex gap-4 items-center mb-6 px-2 py-1">
            <div className="flex-1"><DataSetSelect /></div>

            <div className="flex-1"><PeriodSelect periodType="Yearly" /></div>

            <div className="flex-1"><OrgUnitTree /></div>

            <button className="flex-1 bg-rich-teal text-white rounded hover:bg-deep-navy-blue">Clear Data</button>
        </div>
        
        // <>
        //     <div className="flex space-x-4 mb-6">
        //     <div className="flex space-x-4 mb-6">
        //         <DataSetSelect />
        //     </div>
        //     <div className="p-2 border rounded w-1/3 bg-rich-teal text-white">
        //         <PeriodSelect periodType="Yearly" />
        //     </div>
        //         <div className="p-2 border rounded w-1/3 bg-muted-teal text-white text-center">
        //            <OrgUnitTree />
        //         </div>
        //     </div>
        //     <button className="p-2 bg-deep-navy-blue text-white rounded hover:bg-very-dark-blue">Clear Data</button>
        // </>
    )
}