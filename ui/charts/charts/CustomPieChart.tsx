import { IChartData, JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { useEffect } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function CustomPieChart ({data}: {data: IChartData}) {
    
	if (!data || !data.chartData || !data.axisY) return <></>; // Ensure chartData and axisY exist
	
    useEffect(() => {

    }, [data]);
    
    const axisXList: string[] =  [...new Set(data.chartData.map((item: JSONObject) => item.axisX))];
    
    const getDataListByAxisX = (axisXName: string): JSONObject[] => {
        const list = data.chartData.filter((item: JSONObject) => item.axisX === axisXName);
        
        return Object.entries(list[0])
            .filter(([key]) => key !== "axisX") // Exclude axisX
            .map(([name, value]) => ({ name, value }));
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 justify-center space-x-8 flex-grow-0">
                {axisXList.map((axisXName) => {
                    const list = getDataListByAxisX(axisXName);
                    console.log(`Data for ${axisXName}:`, list);

                    if (list.length === 0) return null; // Skip empty lists

                    return (
                        <div key={axisXName} className="flex flex-col items-center">
                            {/* Title */}
                            <h3 className="text-lg font-semibold mb-2">{axisXName}</h3>

                            {/* Pie Chart */}
                            <ResponsiveContainer width={200} height={200}>
                                <PieChart>
                                    <Pie
                                        data={list}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label
                                        outerRadius={80}
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {list.map((entry: JSONObject) => (
                                            <Cell key={`cell-${entry.name}`} fill={getColorFromString(entry.name)} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    );
                })}
            </div>
            
            {/* <div>
                {axisXList.map((axisXName, index) => 
                    <div className="flex flex-row">
                        <span style={{backgroundColor: getColorFromString(axisXName)}}></span>
                    </div>
                }
            </div> */}
        </div>
    );
}