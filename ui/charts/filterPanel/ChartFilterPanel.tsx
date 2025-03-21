import { useEffect, useState } from "react";
import { useChart } from "@/hooks/useChart";
import OrgUnitPanel from "./OrgUnitPanel";
import DataSetPanel from "./DataSetPanel";
import ChartAxisPanel from "./ChartAxisPanel";

export default function ChartTopBar ({
    onClick,
}: {
    onClick: () => void;
}) {
    
    const { selectedPeriods, selectedDataElements, selectedOrgUnit, selectedOrgUnitLevel, selectedChartX, selectedChartY, cleanAll } = useChart();
    const [activePanel, setActivePanel] = useState<string>("");

    useEffect(() => {
        onClick();
    }, [])
    
    const handleAccordionPanelOnClick = (name: string) => {
        if( activePanel === name ) setActivePanel("");
        else setActivePanel(name);
    }
    
    return (
        <aside className="w-full h-full bg-white py-4 shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold">Filters</h2>
        
            {/* Make this div grow to fill remaining space */}
            <div className="w-full flex flex-col flex-grow overflow-auto">
                <OrgUnitPanel
                    activePanel={activePanel}
                    handlePanelOnClick={handleAccordionPanelOnClick} />
                    
                <DataSetPanel
                    activePanel={activePanel}
                    handlePanelOnClick={handleAccordionPanelOnClick} />
                    
			    <ChartAxisPanel
                    activePanel={activePanel}
                    handlePanelOnClick={handleAccordionPanelOnClick} />
            </div>
        
            {/* Button should not be affected by height changes */}
            <div className="flex flex-grow-0">
                <button
                    className="w-auto bg-color-4 hover:bg-deep-green border border-gray-200 text-white rounded-lg disabled:bg-gray-400 py-3 px-6 transition-all duration-300 transform hover:scale-105"
                    onClick={onClick}
                    disabled={ !selectedOrgUnit || !selectedOrgUnitLevel 
                        || !selectedDataElements || !selectedPeriods 
                        || !selectedChartX || selectedChartX.length == 0 
                        || !selectedChartY || selectedChartY.length == 0 }
                >
                    Generate Chart
                </button>
                <button
                    className="w-auto border-color-4 border text-black rounded-lg py-3 px-6 transition-all duration-300 transform hover:scale-105"
                    onClick={cleanAll}
                    disabled={false}
                >
                    Clean All
                </button>
            </div>
        </aside>
    )
}