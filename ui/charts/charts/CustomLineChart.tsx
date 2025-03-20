import { JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function CustomLineChart ({data}: {data: JSONObject}) {
	useEffect(() => {

	}, [data]);
	
	
	if(!data) return (<></>);
	
    return (
        <ResponsiveContainer width={"100%"} height={400}>
			<LineChart data={data.chartData} margin={{ top: 20, right: 20, bottom: 20 }} accessibilityLayer>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="axisX" padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				{data.axisY.map((item: string) => {
					return <Line type="monotone" dataKey={item} stroke={getColorFromString(item)} strokeWidth={3}></Line>
				})}
			</LineChart>
        </ResponsiveContainer>
      );
}