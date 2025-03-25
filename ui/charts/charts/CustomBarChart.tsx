import { IChartData, IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { sortPeriods } from "@/utils/periodUtils";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CustomBarChart ({data, loading}: {data: IChartData, loading?: boolean}) {
	
    useEffect(() => {
        
    }, [data])
    
    
	if (!loading && loading) return (<div>Loading ...</div>);
	
	if (!data || !data.chartData || data.chartData.length === 0 || !data.axisY || data.axisY.length === 0) return <></>; // Ensure chartData and axisY exist and not empty

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={data.chartData} margin={{ top: 20 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="axisX" 
                    padding={{ left: 30, right: 30 }} 
                    angle={-10} // Rotate labels
                    textAnchor="end" 
                    interval={0} // Show all labels
                    tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend 
					layout="horizontal" 
					align="center" 
					verticalAlign="bottom" 
					// wrapperStyle={{ bottom: -5, position: "relative" }} 
				/>
                {data.axisY.map((item: string) => {
                    return <Bar type="monotone" dataKey={item} fill={getColorFromString(item)} strokeWidth={3}></Bar>
                })}
            </BarChart>
        </ResponsiveContainer>
      );
}