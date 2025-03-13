import { useSetSelection } from "@/hooks/useSetSelection";
import DataSetSelect from "./DataSetSelect";
import OrgUnitTree from "./OrgUnitTree";
import PeriodSelect from "./PeriodSelect";

export default function TopBar () {
    const { cleanAll } = useSetSelection();
    
    return (
        <nav className="flex gap-4 items-center mb-6 px-4 py-2 bg-gray-100 border-t-2 text-black border-gray-300">
            <div className="flex-1"><DataSetSelect /></div>

            <div className="flex-1"><PeriodSelect periodType="Yearly" /></div>

            <div className="flex-1"><OrgUnitTree /></div>

            <button
                className="w-auto bg-pale-lemon border border-gray-200 text-black font-semibold rounded-lg py-3 px-6 transition-all duration-300 transform hover:bg-lemon-lime hover:scale-105"
                onClick={cleanAll}
            >
                Clear Data
            </button>
        </nav>

    )
}