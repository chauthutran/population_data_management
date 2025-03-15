import DataSetSelect from "../selection/DataSetSelect";
import OrgUnitLevelSelect from "../selection/OrgUnitLevelSelect";
import ChartTypeSelect from "../selection/ChartTypeSelect";
import { IDataElement, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import { useState } from "react";
import OrgUnitTree from "../selection/OrgUnitTree";
import DataElementMultiSelect from "../selection/DataElementMultiSelect";
import PeriodMultiSelect from "../selection/PeriodMultiSelect";
import OrgUnitFilterPanel from "./filter/OrgUnitFilterPanel";
import DataElementAndPeriodPanel from "./filter/DataElementAndPeriodPanel";

const panels = [
    { id: 1, title: "Panel 1", content: "This is the content of Panel 1" },
    { id: 2, title: "Panel 2", content: "This is the content of Panel 2" },
    { id: 3, title: "Panel 3", content: "This is the content of Panel 3" }
];

export default function ChartTopBar () {
    
    const [openPanel, setOpenPanel] = useState<number | null>(null);

    const { selectedDataSet, selectedOrgUnit } = useSelection();
    
    const [selectedOrgUnitLevel, setOrgUnitLevel] = useState<JSONObject | null>(null);
    const [selectedPeriods, setPeriods] = useState<ISerializePeriod[] | null>(null);
    const [selectedDataElements, setDataElements] = useState<IDataElement[] | null>(null);
    const [chartType, setChartType] = useState<JSONObject | null>(null);
    
    const togglePanel = (id: number) => {
        setOpenPanel(openPanel === id ? null : id); // Toggle or close all
    };
    
    const handleOrgUnitLevelOnChange = (orgUnitLevel: JSONObject) => {
        setOrgUnitLevel(orgUnitLevel);
    }
    
    const handlePeriodOnChange = (periods: ISerializePeriod[]) => {
        setPeriods(periods);
    }
    
    const handleDataElementOnChange = (dataElements: IDataElement[]) => {
        setDataElements(dataElements);
    }
    
    const handleChartTypeOnChange = (chartType: JSONObject) => {
        setChartType(chartType);
    }
    
    return (
        <aside className="w-72 bg-white py-4 shadow-lg flex flex-col space-y-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            
            {/* <div className="font-semibold">OrgUnit</div>
            <OrgUnitTree />
            
            <OrgUnitLevelSelect onChange={handleOrgUnitLevelOnChange} /> */}
            
            <OrgUnitFilterPanel
                panelIdx={1}
                isOpen={openPanel === 1}
                togglePanel={() => togglePanel(1)}
                handleOrgUnitLevelOnChange={handleOrgUnitLevelOnChange}
            />
            
            {/* <div className="font-semibold pt-3">Data Elements and Periods</div>
            <DataSetSelect />
            <DataElementMultiSelect onChange={handleDataElementOnChange} />
            {selectedDataSet  && <PeriodMultiSelect periodType={selectedDataSet!.periodType.name} onChange={handlePeriodOnChange} />} */}
    
            <DataElementAndPeriodPanel
                panelIdx={2}
                isOpen={openPanel === 2}
                togglePanel={() => togglePanel(2)}
                handlePeriodOnChange={handlePeriodOnChange}
                handleDataElementOnChange={handleDataElementOnChange}
            />
            
            <div className="font-semibold pt-3">Chart Type</div>
            <ChartTypeSelect onChange={handleChartTypeOnChange} />
            
            <button 
                // onClick={() => unacceptData()}
                // disabled={loading} // Disable the button if the request is in progress
                className="w-auto bg-color-4 hover:bg-deep-green border border-gray-200 text-white rounded-lg disabled:bg-gray-400 py-3 px-6 transition-all duration-300 transform hover:scale-105"
            >
                Generate Chart
            </button>
        </aside>
    )
}