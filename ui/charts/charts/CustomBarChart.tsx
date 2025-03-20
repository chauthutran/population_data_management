import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { sortPeriods } from "@/utils/periodUtils";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CustomBarChart({data}: {data: JSONObject}) {
    
    useEffect(() => {
        
    }, [data])
    
    
    if(!data) return (<></>);
    
    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={data.chartData} margin={{ top: 20 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="orgunit" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.axisY.map((item: string) => {
                    return <Bar type="monotone" dataKey={item} fill={getColorFromString(item)} strokeWidth={3}></Bar>
                })}
            </BarChart>
        </ResponsiveContainer>
      );
}