import { useState } from "react";
import PopulationDistributionGrowthChart from "./charts/PopulationDistributionGrowthChart";
import ChartTopBar from "./ChartTopBar";
import { useSelection } from "@/hooks/useSelection";
import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { useChart } from "@/hooks/useChart";

export default function ChartPage () {
	
	const { selectedOrgUnit, selectedOrgUnitLevel, selectedDataElements, selectedPeriods, selectedChartType } = useChart();
	
    return (
		<div className="flex bg-gray-100 pb-1 w-full h-full ">
			{/* Sidebar Filters */}
			<div className="w-1/4">
				<ChartTopBar />
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4"> Chart</h2>
				
				{selectedPeriods && selectedDataElements && selectedOrgUnit && selectedOrgUnitLevel && selectedChartType && <>
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