import ChartTopBar from "./filterPanel/ChartFilterPanel";
import { useChart } from "@/hooks/useChart";
import { retrieveAndTransformData, transformData } from "@/utils/chartUtils";
import ChartTypeSelector from "./filterPanel/ChartTypeOption";
import { useState } from "react";
import { IChartData, JSONObject } from "@/types/definations";
import CustomBarChart from "./charts/CustomBarChart";
import CustomPieChart from "./charts/CustomPieChart";
import CustomLineChart from "./charts/CustomLineChart";
import CustomHeatmap from "./charts/CustomHeatmap";

export default function ChartPage () {
	
	const { selectedOrgUnit, selectedOrgUnitLevel, selectedDataElements, selectedPeriods, selectedChartX, selectedChartY, selectedChartType } = useChart();
    const [chartData, setChartData] = useState<IChartData>({ chartData:[], axisY: []});
	
	const fetchData = async (): Promise<JSONObject[]> => {
		return await retrieveAndTransformData(
			selectedPeriods!,
			selectedDataElements!,
			selectedOrgUnit!,
			selectedOrgUnitLevel!
		);
	}
	
	const handleOnClick = async () => {
		const data = await fetchData();
		
		const orgUnits: JSONObject[] =  Array.from(
			new Map(data.map(item => [item.orgUnit, { _id: item.orgUnit, name: item.orgUnitName }])).values()
		);
		
		const transformedData = transformData(data, selectedChartX, selectedChartY, orgUnits, selectedDataElements!, selectedPeriods! );
console.log("==== transformedData : ", transformedData)
		setChartData(transformedData);
	}
	
    return (
		<div className="flex bg-gray-100 pb-1 w-full h-full ">
			{/* Sidebar Filters */}
			<div className="w-1/3">
				<ChartTopBar onClick={handleOnClick} />
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4">
					<ChartTypeSelector />
				</h2>
					{selectedChartType?._id === "Line" &&
						<CustomLineChart
							data={chartData || {}}
						/>}
					{selectedChartType?._id === "Bar" &&
						<CustomBarChart
							data={chartData || {}}
						/>}
					{selectedChartType?._id === "Pie" &&
						<CustomPieChart
							data={chartData || {}}
						/>}
					{selectedChartType?._id === "Heatmap" &&
						<CustomHeatmap
							data={chartData || {}}
						/>}
			</div>
		</div>
    )
}