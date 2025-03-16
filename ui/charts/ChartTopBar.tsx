import DataSetSelect from "../selection/DataSetSelect";
import OrgUnitLevelSelect from "../selection/OrgUnitLevelSelect";
import ChartTypeSelect from "../selection/ChartTypeSelect";
import { IDataElement, IDataSet, IOrgUnit, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import { useState } from "react";
import OrgUnitTree from "../selection/OrgUnitTree";
import DataElementMultiSelect from "../selection/DataElementMultiSelect";
import PeriodMultiSelect from "../selection/PeriodMultiSelect";
import AccordionPanel from "../layout/AccordionPanel";
import { useChart } from "@/hooks/useChart";

export default function ChartTopBar () {
    
    const { selectedPeriods, selectedDataElements, selectedOrgUnit, selectedOrgUnitLevel, selectedChartType, selectPeriods, selectDataElements, selectOrgUnit, selectOrgUnitLevel, selectChartType, cleanAll } = useChart();
    
    const [activePanel, setActivePanel] = useState<string>("");
    const [selectedDataSet, setSelectedDataSet] = useState<IDataSet | null>(null);

    const handleAccordionPanelOnClick = (name: string) => {
        if( activePanel === name ) setActivePanel("");
        else setActivePanel(name);
    }
    
    return (
        <aside className="w-full h-full bg-white py-4 shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold">Filters</h2>
    
        {/* Make this div grow to fill remaining space */}
        <div className="w-full flex flex-col flex-grow overflow-auto">
            <AccordionPanel title="OrgUnit" isOpen={activePanel === "orgUnit"} onClick={() => handleAccordionPanelOnClick("orgUnit")}>
                <div className="flex-grow-0">
                    <OrgUnitTree onItemClick={selectOrgUnit} selected={selectedOrgUnit} />
                    <OrgUnitLevelSelect onChange={selectOrgUnitLevel} />
                </div>
            </AccordionPanel>
    
            <AccordionPanel title="Data Element and Periods" isOpen={activePanel === "dataSet"} onClick={() => handleAccordionPanelOnClick("dataSet")}>
                <DataSetSelect onItemSelect={setSelectedDataSet}  />
                <DataElementMultiSelect onChange={selectDataElements} />
                {selectedDataSet && <PeriodMultiSelect
                    periodType={selectedDataSet!.periodType.name}
                    onChange={selectPeriods}
                />}
            </AccordionPanel>
    
            <AccordionPanel title="Chart Type" isOpen={activePanel === "chartType"} onClick={() => handleAccordionPanelOnClick("chartType")}>
                <ChartTypeSelect onChange={selectChartType} />
            </AccordionPanel>
        </div>
    
        {/* Button should not be affected by height changes */}
        <button
            className="w-auto bg-color-4 hover:bg-deep-green border border-gray-200 text-white rounded-lg disabled:bg-gray-400 py-3 px-6 transition-all duration-300 transform hover:scale-105"
        >
            Generate Chart
        </button>
    </aside>
    

    )
}