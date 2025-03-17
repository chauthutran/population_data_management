import DataSetSelect from "../layout/selection/DataSetSelect";
import OrgUnitLevelSelect from "../layout/selection/OrgUnitLevelSelect";
import ChartTypeSelect from "../layout/selection/ChartTypeSelect";
import { IDataSet} from "@/types/definations";
import { useState } from "react";
import OrgUnitTree from "../layout/selection/OrgUnitTree";
import DataElementMultiSelect from "../layout/selection/DataElementMultiSelect";
import PeriodMultiSelect from "../layout/selection/PeriodMultiSelect";
import AccordionPanel from "../layout/AccordionPanel";
import { useChart } from "@/hooks/useChart";
import DisableField from "../layout/basic/DisableField";

export default function ChartTopBar () {
    
    const { selectedPeriods, selectedDataElements, selectedOrgUnit, selectedOrgUnitLevel, selectedChartType, selectPeriods, selectDataElements, selectOrgUnit, selectOrgUnitLevel, selectChartType, cleanAll } = useChart();
    
    const [activePanel, setActivePanel] = useState<string>("");
    const [selectedDataSet, setSelectedDataSet] = useState<IDataSet | null>(null);

    const handleAccordionPanelOnClick = (name: string) => {
        if( activePanel === name ) setActivePanel("");
        else setActivePanel(name);
    }
    
    const handleDataSetOnChange = (item: IDataSet) => {
        if (selectedDataSet?.periodType !== item.periodType) {
            selectPeriods(null);
        }
        setSelectedDataSet(null);
        setSelectedDataSet(item);
    }
    
    return (
        <aside className="w-full h-full bg-white py-4 shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold">Filters</h2>
    
        {/* Make this div grow to fill remaining space */}
        <div className="w-full flex flex-col flex-grow overflow-auto">
            <AccordionPanel title="OrgUnit" isOpen={activePanel === "orgUnit"} onClick={() => handleAccordionPanelOnClick("orgUnit")}>
                <div className="flex-grow-0 space-y-4">
                    <OrgUnitTree onItemClick={selectOrgUnit} selected={selectedOrgUnit} />
                    <OrgUnitLevelSelect onChange={selectOrgUnitLevel} selected={selectedOrgUnitLevel} />
                </div>
            </AccordionPanel>
    
            <AccordionPanel title="Data Element and Periods" isOpen={activePanel === "dataSet"} onClick={() => handleAccordionPanelOnClick("dataSet")}>
                <div className="flex-grow-0 space-y-4">
                    <DataSetSelect onItemSelect={handleDataSetOnChange} selected={selectedDataSet} />
                    <DataElementMultiSelect
                        disabled={!selectedDataSet}
                        selected={selectedDataElements}
                        options={selectedDataSet?.dataElements || []}
                        onChange={selectDataElements} />
                    <PeriodMultiSelect
                        disabled={!selectedDataSet}
                        selected={selectedPeriods}
                        periodType={selectedDataSet?.periodType.name || ""}
                        onChange={selectPeriods}
                    />
                </div>
            </AccordionPanel>
    
            <AccordionPanel title="Chart Type" isOpen={activePanel === "chartType"} onClick={() => handleAccordionPanelOnClick("chartType")}>
                <ChartTypeSelect onItemSelect={selectChartType} selected={selectedChartType} />
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