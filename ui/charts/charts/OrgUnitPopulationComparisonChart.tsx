import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { getColorFromString } from "@/utils/colorUtils";
import { sortPeriods } from "@/utils/periodUtils";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Chart - Comparison of Population Data
    * Chart Type: Bar Chart (Grouped Bars)
    * X-Axis: Organizational Units
    * Y-Axis: Population Count
    * Data: Compare population count across different years for the same org unit
    * Use Case: Identify regions with high or low growth over time
 */
export default function OrgUnitPopulationComparisonChart(
{
    data,
    periods,
}: {
    data: JSONObject[] | null;
    periods: ISerializePeriod[],
}
) {
    
    useEffect(() => {
        
    }, [data])
    
    
    /**
	 * convert data to [
	 * 		{
		* 		orgUnit: '<OrgUnit Name>',
		* 		<period 1>: sum(DE-Value1, DE-Value2, ... ),
		* 		<period 2>: sum(DE-Value1, DE-Value2, ... ),
		* 		...
	 * 		}
	 * ]
     */
	const transformData = (): JSONObject[] => {
        // Step 1: Initialize an empty object to hold the grouped data
        const groupedData: JSONObject = {};

        // Step 2: Process each entry in the data
        data!.forEach(entry => {
            const { orgUnitName, period, value } = entry;
            const year = period.code; // The year (e.g., 2021, 2022)

            // If the orgUnitName doesn't exist in groupedData, create it
            if (!groupedData[orgUnitName]) {
                groupedData[orgUnitName] = { orgunit: orgUnitName };
            }

            // If the year doesn't exist for the orgUnit, initialize it with 0
            if (!groupedData[orgUnitName][year]) {
                groupedData[orgUnitName][year] = 0;
            }

            // Add the current value to the year-specific value for this orgUnit
            groupedData[orgUnitName][year] += value;
        });

        // Step 3: Convert the grouped data object into an array
        return Object.values(groupedData);
	}
    
    if(!data) return (<></>);
    
    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={transformData()} margin={{ top: 20 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="orgunit" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {sortPeriods(periods).map((item) => {
                    return <Bar type="monotone" dataKey={item.name} fill={getColorFromString(item.code + item.name + item.startDate + item.endDate)} strokeWidth={3}></Bar>
                })}
            </BarChart>
        </ResponsiveContainer>
      );
}