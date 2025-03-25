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
import useAsyncData from "@/hooks/useAsyncData";

export default function ChartPage () {
	
	const { selectedOrgUnit, selectedOrgUnitLevel, selectedDataElements, selectedPeriods, selectedChartX, selectedChartY, selectedChartType } = useChart();
    const [chartData, setChartData] = useState<IChartData>({ chartData:[], axisY: []});
	
	const { data, error, refetch, loading } = useAsyncData<IChartData>();
		
	const fetchData = async (): Promise<IChartData> => {
		const data =  await retrieveAndTransformData(
			selectedPeriods!.map((item) => item.code),
			selectedDataElements!.map((item) => item._id),
			selectedOrgUnit!._id,
			selectedOrgUnitLevel!._id,
		);
		
		const orgUnits: JSONObject[] =  Array.from(
			new Map(data.map(item => [item.orgUnit, { _id: item.orgUnit, name: item.orgUnitName }])).values()
		);
		
		const transformedData = transformData(data, selectedChartX!, selectedChartY!, orgUnits, selectedDataElements!, selectedPeriods!);
	
		setChartData(transformedData);
		
		return transformedData;
	}
	
	const handleOnClick = () => {
		refetch(fetchData);
	}
	
    return (
		<div className="flex pb-1 w-full h-full border-2">
			{/* Sidebar Filters */}
			<div className="w-1/3">
				<ChartTopBar onClick={handleOnClick} />
			</div>

			{/* Chart Display */}
			<div className="flex-1 p-3 flex flex-col">
				<h2 className="text-xl font-semibold">
					<ChartTypeSelector />
				</h2>
				
				<div className="flex-1 overflow-y-auto h-full shadow-md rounded-md p-5">
					{selectedChartType && selectedChartType?._id === "Line" &&
						<CustomLineChart data={chartData} loading={loading} />
					}
					{selectedChartType?._id === "Bar" &&
						<CustomBarChart data={chartData} loading={loading}  />
					}
					{selectedChartType?._id === "Pie" &&
						<CustomPieChart data={chartData} loading={loading}  />
					}
					{selectedChartType?._id === "Heatmap" &&
						<CustomHeatmap data={chartData} loading={loading}  />
					}
				</div>
			</div>
		</div>
    )
}