import { IChartData, JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function CustomPieChart ({data}: {data: IChartData}) {
    useEffect(() => {

    }, [data]);
    
    
    if(!data) return (<></>);
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    // fill="#8884d8"
                    dataKey="value"
                >
                    {data.axisY.map((entry: string) => (
                        <Cell key={`cell-${entry}`} fill={getColorFromString(entry)} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
      );
}