import DataSetSelect from "../selection/DataSetSelect";
import OrgUnitLevelSelect from "../selection/OrgUnitLevelSelect";
import ChartTypeSelect from "../selection/ChartTypeSelect";
import { IDataElement, IOrgUnit, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import { useState } from "react";
import OrgUnitTree from "../selection/OrgUnitTree";
import DataElementMultiSelect from "../selection/DataElementMultiSelect";
import PeriodMultiSelect from "../selection/PeriodMultiSelect";
import AccordionPanel from "../layout/AccordionPanel";

export default function ChartTopBar ({
    periods,
	dataElements,
	orgUnit,
	orgUnitLevel,
    handleOrgUnitLevelOnChange,
    handlePeriodOnChange,
    handleDataElementOnChange,
    handleChartTypeOnChange,
}: { 
    periods: ISerializePeriod[];
    dataElements: IDataElement[];
    orgUnit: IOrgUnit;
    orgUnitLevel: JSONObject;
    handleOrgUnitLevelOnChange: (orgUnitLevel: JSONObject) => void;
    handlePeriodOnChange: (periods: ISerializePeriod[]) => void;
    handleDataElementOnChange: (dataElements: IDataElement[]) => void;
    handleChartTypeOnChange: (chartType: JSONObject) => void;
}) {
    
    const [activePanel, setActivePanel] = useState<string>("");

    const { selectedDataSet, selectedOrgUnit } = useSelection();
    
    // const [selectedOrgUnitLevel, setOrgUnitLevel] = useState<JSONObject | null>(null);
    // const [selectedPeriods, setPeriods] = useState<ISerializePeriod[] | null>(null);
    // const [selectedDataElements, setDataElements] = useState<IDataElement[] | null>(null);
    // const [chartType, setChartType] = useState<JSONObject | null>(null);
    
    // const handleOrgUnitLevelOnChange = (orgUnitLevel: JSONObject) => {
    //     setOrgUnitLevel(orgUnitLevel);
    // }
    
    // const handlePeriodOnChange = (periods: ISerializePeriod[]) => {
    //     setPeriods(periods);
    // }
    
    // const handleDataElementOnChange = (dataElements: IDataElement[]) => {
    //     setDataElements(dataElements);
    // }
    
    // const handleChartTypeOnChange = (chartType: JSONObject) => {
    //     setChartType(chartType);
    // }
    
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
                    <OrgUnitTree />
                    <OrgUnitLevelSelect onChange={handleOrgUnitLevelOnChange} />
                </div>
            </AccordionPanel>
    
            <AccordionPanel title="Data Element and Periods" isOpen={activePanel === "dataSet"} onClick={() => handleAccordionPanelOnClick("dataSet")}>
                <DataSetSelect />
                <DataElementMultiSelect onChange={handleDataElementOnChange} />
                {selectedDataSet && <PeriodMultiSelect
                    periodType={selectedDataSet!.periodType.name}
                    onChange={handlePeriodOnChange}
                />}
            </AccordionPanel>
    
            <AccordionPanel title="Chart Type" isOpen={activePanel === "chartType"} onClick={() => handleAccordionPanelOnClick("chartType")}>
                <ChartTypeSelect onChange={handleChartTypeOnChange} />
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