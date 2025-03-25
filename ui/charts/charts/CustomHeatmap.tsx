import { IChartAxist, IChartData, IDataElement,ISerializePeriod,JSONObject } from "@/types/definations";
import { getColorForNumber, getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";

// Example Heatmap 🔲🔳🟧🟥🟦🟩 (Colors vary based on values)
// OrgUnit	Jan	Feb	Mar	Apr	May	Jun	Jul	Aug	Sep	Oct	Nov	Dec
// City A	500	520	530	550	600	620	650	680	700	750	800	850
// City B	450	460	470	490	500	530	550	570	600	630	650	700

export default function ({data, loading}: {data: IChartData, loading: boolean}) {
	useEffect(() => {

	}, [data]);

	if (loading) return (<div>Loading ...</div>);
	
	if(!data) return (<></>);
	
	// Extract all numeric values (excluding 'axisX')
	const allValues = data.chartData.flatMap((d) => Object.values(d).filter((v) => typeof v === "number"));
	// Get min and max
	const minValue = Math.min(...allValues);
	const maxValue = Math.max(...allValues);
	
    return (
        <div className="overflow-x-auto bg-gray-100 p-3 rounded-md shadow-md h-full">
			<table className="min-w-full w-full table-auto">
				<thead>
				<tr>
					<th className="border px-4 py-2 text-left">#</th>
					{data.axisY.map((axisY: string) => (
						<th key={`heatmap_th_${axisY}`} className="border px-4 py-2 text-center">{axisY}</th>
					))}
				</tr>
				</thead>
				<tbody>
					{data.chartData.map((item) => (
						<tr 
							key={item.axisX}
							className="transition-transform transform hover:scale-105 hover:shadow-md hover:bg-gray-100 cursor-pointer"
						>
							<td className="border px-4 py-2 text-left">{item.axisX}</td>
							{data.axisY.map((axisY: string) => (
								<td
									key={`heatmap_td_${axisY}`}
									className="border px-4 py-2 text-center"
									style={{
										backgroundColor: getColorForNumber(item[axisY] || 0, minValue, maxValue)
									}}
								>
									{item[axisY] || 'N/A'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}