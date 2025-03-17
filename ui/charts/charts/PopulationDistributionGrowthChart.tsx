import { IDataElement, IDataValue, IOrgUnit, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { getRandomColor } from "@/utils/colorUtils";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PopulationDistributionGrowthChart(
{
	data,
	dataElements,
}: {
	data: Record<string, string>[] | null;
	dataElements: IDataElement[],
}
) {
	
	useEffect(() => {
		
	}, [data])
	
	if(!data) return (<></>);
	
    return (
        <ResponsiveContainer width={"100%"} height={300}>
			<LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="period" padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				{dataElements.map((item) => {
					return <Line type="monotone" dataKey={item.name} stroke={getRandomColor()} strokeWidth={3}></Line>
				})}
			</LineChart>
        </ResponsiveContainer>
      );
}