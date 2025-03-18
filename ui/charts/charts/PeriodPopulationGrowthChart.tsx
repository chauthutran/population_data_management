import { IDataElement,JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Chart - Population Growth Over Time
	* Chart Type: Line Chart
	* X-Axis: Period (Months or Years)
	* Y-Axis: Population Count
	* Data: Show population trends over time for different organizational units
	* Use Case: Track growth patterns across different years
 */
export default function PeriodPopulationGrowthChart(
{
	data,
	dataElements,
}: {
	data: JSONObject[] | null;
	dataElements: IDataElement[],
}
) {
	useEffect(() => {

	}, [data]);

	/**
	 * convert data to
	 *   [
	 * 		{
		* 		period: '<Period Name>', --> X
		* 		<dataElement Name 1>: value1, --> Y
		* 		<dataElement Name 2>: value2, --> Y
		* 		... --> Y
	 * 		}
	 * 	  ]
	 *  },
	 */
	const transformData = (): JSONObject[] => {
		const result = data!.reduce((acc, item) => {
			const periodName = item.period.name;
			if (!acc[periodName]) {
				acc[periodName] = { period: periodName };
			}
			acc[periodName][item.dataElement.name] = item.value;
			return acc;
		}, {}) as Record<string, string>[];
		
		return Object.values(result);
	}
	
	if(!data) return (<></>);
	
    return (
        <ResponsiveContainer width={"100%"} height={300}>
			<LineChart data={transformData()} margin={{ top: 20 }} accessibilityLayer>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="period" padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				{dataElements.map((item) => {
					return <Line type="monotone" dataKey={item.name} stroke={getColorFromString(item._id)} strokeWidth={3}></Line>
				})}
			</LineChart>
        </ResponsiveContainer>
      );
}