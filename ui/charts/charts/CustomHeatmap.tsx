import { IDataElement,ISerializePeriod,JSONObject } from "@/types/definations";
import { getColorForNumber, getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const transformData = (data: JSONObject[]): JSONObject[] => {
	const transformedData: any[] = [];

	// Collect all unique periods and orgUnits
	data!.forEach(item => {
		const orgUnit = transformedData.find((d) => d.orgUnit === item.orgUnitName);
		if (!orgUnit) {
			transformedData.push({
				orgUnit: item.orgUnitName,
				periods: {
				[item.period.code]: item.value
				}
			});
		} else {
			orgUnit.periods[item.period.code] = item.value;
		}
	});

	return transformedData;
}

// Example Heatmap 🔲🔳🟧🟥🟦🟩 (Colors vary based on values)
// OrgUnit	Jan	Feb	Mar	Apr	May	Jun	Jul	Aug	Sep	Oct	Nov	Dec
// City A	500	520	530	550	600	620	650	680	700	750	800	850
// City B	450	460	470	490	500	530	550	570	600	630	650	700

export default function CustomHeatmap(
{
	data,
	periods,
}: {
	data: JSONObject[] | null;
	periods: ISerializePeriod[],
}
) {
	useEffect(() => {

	}, [data]);

	
	if(!data) return (<></>);
	
	const transformedData = transformData(data);
	const minValue = Math.min(...data.map(item => item.value));
	const maxValue = Math.max(...data.map(item => item.value));
	
    return (
        <div className="overflow-x-auto">
			<table className="min-w-full table-auto border-collapse">
				<thead>
				<tr>
					<th className="border px-4 py-2 text-left">OrgUnit</th>
					{periods.map((pe) => (
						<th key={pe.code} className="border px-4 py-2 text-center">{pe.name}</th>
					))}
				</tr>
				</thead>
				<tbody>
					{transformedData.map((item) => (
						<tr key={item.orgUnit}>
						<td className="border px-4 py-2">{item.orgUnit}</td>
						{periods.map((pe) => (
							<td
								key={pe.code}
								className="border px-4 py-2 text-center"
								style={{
									backgroundColor: getColorForNumber(item.periods[pe.code] || 0, minValue, maxValue)
								}}
							>
								{item.periods[pe.code] || 'N/A'}
							</td>
						))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}