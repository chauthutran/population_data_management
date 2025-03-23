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
            <h2 className="text-2xl font-semibold p-2">Filters</h2>
        
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
            <div className="flex space-x-4 p-3">
                <button
                    className="flex-1 shadow-lg hover:shadow-gray-400 bg-blue-400 to-white font-semibold rounded-lg transition-transform transform hover:scale-105 flex flex-row text-black space-x-3 items-center justify-center p-4"
                    onClick={onClick}
                    disabled={ !selectedOrgUnit || !selectedOrgUnitLevel 
                        || !selectedDataElements || !selectedPeriods 
                        || !selectedChartX || selectedChartX.length == 0 
                        || !selectedChartY || selectedChartY.length == 0 }
                >
                    Generate Chart
                </button>
                <button
                    className="flex-1 shadow-lg hover:shadow-gray-400 border-2 border-blue-400 to-white font-semibold rounded-lg transition-transform transform hover:scale-105 flex flex-row text-black space-x-3 items-center justify-center p-4"
                    onClick={cleanAll}
                    disabled={false}
                >
                    Clean All
                </button>
            </div>
        </aside>
    )
}