import { useState } from "react";
import PopulationDistributionGrowthChart from "./charts/PopulationDistributionGrowthChart";
import ChartTopBar from "./ChartTopBar";

export default function ChartPage () {
    
  const [orgUnit, setOrgUnit] = useState("National");
  const [period, setPeriod] = useState("Yearly");
  const [dataSet, setDataSet] = useState("Demographics");
  const [dataElement, setDataElement] = useState("TotalPop");
  const [chartType, setChartType] = useState("Bar");

    return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar Filters */}
			<ChartTopBar />

			{/* Chart Display */}
			<main className="flex-1 p-6">
				<h2 className="text-xl font-semibold mb-4"> Chart</h2>
				
				<PopulationDistributionGrowthChart
					// periods={}
					// dataElement={setDataElement}
					// orgUnit={orgUnit}
					// orgUnitLevel 
				/>
				
				{/* {chartType === "Bar" && <Bar data={chartData} />}
				{chartType === "Line" && <Line data={chartData} />}
				{chartType === "Pie" && <Pie data={chartData} />} */}
			</main>
		</div>
    )
}