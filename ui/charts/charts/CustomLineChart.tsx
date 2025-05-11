import { IChartAxist, IChartData, JSONObject } from '@/types/definations';
import { getColorFromString } from '@/utils/colorUtils';
import { formatNumber } from '@/utils/numberUtils';
import { useEffect } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function CustomLineChart({
    data,
    loading,
}: {
    data: IChartData;
    loading?: boolean;
}) {
    // UseEffect if necessary, but currently it's not being used.
    useEffect(() => {
        // You can perform any side effects here
    }, [data]);

    if (!loading && loading) return <div>Loading ...</div>;

    if (
        !data ||
        !data.chartData ||
        data.chartData.length === 0 ||
        !data.axisY ||
        data.axisY.length === 0
    )
        return <></>; // Ensure chartData and axisY exist and not empty

    return (
        <ResponsiveContainer width="100%" height={'100%'}>
            <LineChart data={data.chartData} margin={{ top: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="axisX"
                    padding={{ left: 30, right: 30 }}
                    angle={-25} // Rotate labels
                    textAnchor="end"
                    interval={0} // Show all labels
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatNumber(value)}
                />
                <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>  formatNumber(value)}
                />
                <Tooltip 
                    formatter={(value: number | string) =>
                        formatNumber(value)
                    }
                />
                <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    // wrapperStyle={{ bottom: 10, position: "relative" }}
                />
                {data.axisY.map((item: string) => (
                    <Line
                        key={item}
                        type="monotone"
                        dataKey={item} // Make sure dataKey matches the year values from chartData
                        stroke={getColorFromString(item)} // Assuming you have a function to generate colors
                        strokeWidth={2}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
