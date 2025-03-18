import ChartTopBar from "./filterPanel/ChartFilterPanel";
import { useChart } from "@/hooks/useChart";
import useAsyncData from "@/hooks/useAsyncData";
import { retrieveAndTransformData } from "@/utils/chartUtils";
import PeriodPopulationGrowthChart from "./charts/PeriodPopulationGrowthChart";
import OrgUnitPopulationComparisonChart from "./charts/OrgUnitPopulationComparisonChart";
import ChartTypeSelector from "./filterPanel/ChartTypeOption";
import { useState } from "react";
import { JSONObject } from "@/types/definations";
import PopulationChangeChart from "./charts/PopulationChangeChart";

export default function ChartPage () {
	
	const { selectedOrgUnit, selectedOrgUnitLevel, selectedDataElements, selectedPeriods, selectedChartType } = useChart();
    const [chartData, setChartData] = useState<JSONObject | null>(null);
	
	const fetchData = async (): Promise<Record<string, string>[]> => {
		return await retrieveAndTransformData(
			selectedPeriods!,
			selectedDataElements!,
			selectedOrgUnit!,
			selectedOrgUnitLevel!
		);
	}
	
	const handleOnClick = async () => {
		console.log("== handleOnClick");
		// if( selectedPeriods && selectedDataElements && selectedOrgUnit && selectedOrgUnitLevel) {
			const newData = await fetchData();
            setChartData({
				data: newData,
				dataElements: selectedDataElements,
				periods: selectedPeriods
			}); // Update state only on button click
		// }
	}
	
    return (
		<div className="flex bg-gray-100 pb-1 w-full h-full ">
			{/* Sidebar Filters */}
			<div className="w-1/4">
				<ChartTopBar onClick={handleOnClick} />
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4">
					<ChartTypeSelector />
				</h2>
					{selectedChartType?._id === "Line" &&
						<PeriodPopulationGrowthChart
							data={chartData?.data || []}
							dataElements={chartData?.dataElements || []}
						/>}
					{selectedChartType?._id === "Bar" &&
						<OrgUnitPopulationComparisonChart
							data={chartData?.data || []}
							periods={chartData?.periods || []}
						/>}
					{selectedChartType?._id === "Heatmap" &&
						<PopulationChangeChart
							data={chartData?.data || []}
							periods={chartData?.periods || []}
						/>}
			</div>
		</div>
    )
}