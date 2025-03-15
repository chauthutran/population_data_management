import { useState } from "react";
import PopulationDistributionGrowthChart from "./charts/PopulationDistributionGrowthChart";
import ChartTopBar from "./ChartTopBar";
import { useSelection } from "@/hooks/useSelection";
import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";

export default function ChartPage () {
    
	// const [orgUnit, setOrgUnit] = useState("National");
	// const [period, setPeriod] = useState("Yearly");
	// const [dataSet, setDataSet] = useState("Demographics");
	// const [dataElement, setDataElement] = useState("TotalPop");
	// const [chartType, setChartType] = useState("Bar");

	const { selectedOrgUnit } = useSelection();
	const [selectedOrgUnitLevel, setOrgUnitLevel] = useState<JSONObject | null>(null);
    const [selectedPeriods, setPeriods] = useState<ISerializePeriod[] | null>(null);
    const [selectedDataElements, setDataElements] = useState<IDataElement[] | null>(null);
    const [chartType, setChartType] = useState<JSONObject | null>(null);
    
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
	console.log("===== selectedPeriods: ", selectedPeriods);
	console.log("selectedDataElements: ", selectedDataElements);
	console.log("selectedOrgUnit: ", selectedOrgUnit);
	console.log("selectedOrgUnitLevel: ", selectedOrgUnitLevel);
	console.log("chartType: ", chartType);
    return (
		<div className="flex bg-gray-100 pb-1 w-full h-full ">
			{/* Sidebar Filters */}
			<div className="w-1/4">
				<ChartTopBar 
					periods={selectedPeriods!}
					dataElements={selectedDataElements!}
					orgUnit={selectedOrgUnit!}
					orgUnitLevel={selectedOrgUnitLevel!}
					handleOrgUnitLevelOnChange={handleOrgUnitLevelOnChange}
					handlePeriodOnChange={handlePeriodOnChange}
					handleDataElementOnChange={handleDataElementOnChange}
					handleChartTypeOnChange={handleChartTypeOnChange}
				/>
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4"> Chart</h2>
				
				{selectedPeriods && selectedDataElements && selectedOrgUnit && selectedOrgUnitLevel && chartType && <>
					<PopulationDistributionGrowthChart
						periods={selectedPeriods!}
						dataElements={selectedDataElements!}
						orgUnit={selectedOrgUnit!}
						orgUnitLevel={selectedOrgUnitLevel!}
					/>
				</>}
			</div>
		</div>
    )
}