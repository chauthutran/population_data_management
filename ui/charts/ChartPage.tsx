import { useEffect, useState } from "react";
import PopulationDistributionGrowthChart from "./charts/PopulationDistributionGrowthChart";
import ChartTopBar from "./ChartTopBar";
import { useSelection } from "@/hooks/useSelection";
import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { useChart } from "@/hooks/useChart";
import useAsyncData from "@/hooks/useAsyncData";
import { retrieveAndTransformData } from "@/utils/chartUtils";

export default function ChartPage () {
	
	const { selectedOrgUnit, selectedOrgUnitLevel, selectedDataElements, selectedPeriods, selectedChartType } = useChart();
	const {data, loading, error, refetch} = useAsyncData<Record<string, string>[]>();
		
	const fetchData = async (): Promise<Record<string, string>[]> => {
		return await retrieveAndTransformData(selectedPeriods!, selectedDataElements!, selectedOrgUnit!, selectedOrgUnitLevel!);
	}
	
	const handleOnClick = () => {
		if( selectedPeriods && selectedDataElements && selectedOrgUnit && selectedOrgUnitLevel) {
			refetch(fetchData);
		}
	}
	
    return (
		<div className="flex bg-gray-100 pb-1 w-full h-full ">
			{/* Sidebar Filters */}
			<div className="w-1/4">
				<ChartTopBar onClick={handleOnClick} />
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4">Chart</h2>
					{selectedChartType?._id === "Line" && 
						<PopulationDistributionGrowthChart
							data={data}
							dataElements={selectedDataElements || []}
						/>}
			</div>
		</div>
    )
}