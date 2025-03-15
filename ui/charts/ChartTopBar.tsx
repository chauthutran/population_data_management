import DataSetSelect from "../selection/DataSetSelect";
import OrgUnitLevelSelect from "../selection/OrgUnitLevelSelect";
import DataElementSelect from "../selection/DataElementSelect";
import ChartTypeSelect from "../selection/ChartTypeSelect";
import { IDataElement, IPeriodType, JSONObject } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import { useState } from "react";
import OrgUnitTree from "../selection/OrgUnitTree";

export default function ChartTopBar () {
    
    const { selectedDataSet, selectedOrgUnit } = useSelection();
    
    const [selectedOrgUnitLevel, setOrgUnitLevel] = useState<JSONObject | null>(null);
    const [selectedPeriodType, setPeriodType] = useState<IPeriodType | null>(null);
    const [selectedDataElements, setDataElements] = useState<IDataElement[] | null>(null);
    const [chartType, setChartType] = useState<JSONObject | null>(null);
    
    
    const handleOrgUnitLevelOnChange = (orgUnitLevel: JSONObject) => {
        setOrgUnitLevel(orgUnitLevel);
    }
    
    const handlePeriodTypeOnChange = (periodType: IPeriodType) => {
        setPeriodType(periodType);
    }
    
    const handleDataElementOnChange = (dataElements: IDataElement[]) => {
        setDataElements(dataElements);
    }
    
    const handleChartTypeOnChange = (chartType: JSONObject) => {
        setChartType(chartType);
    }
    
    return (
        <aside className="w-72 bg-white p-4 shadow-lg flex flex-col space-y-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            
            <div className="font-semibold">OrgUnit</div>
            <OrgUnitTree />
            
            <OrgUnitLevelSelect onChange={handleOrgUnitLevelOnChange} />
            
            
            <div className="font-semibold pt-3">Data Elements and Periods</div>
            <DataSetSelect />
            
            <DataElementSelect onChange={handleDataElementOnChange} />
            
            {/* <Period /> */}
            
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