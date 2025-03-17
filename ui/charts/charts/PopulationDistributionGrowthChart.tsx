import useAsyncData from "@/hooks/useAsyncData";
import { IDataElement, IDataValue, IOrgUnit, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { getRandomColor } from "@/utils/colorUtils";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PopulationDistributionGrowthChart(
	{
	periods,
	dataElements,
	orgUnit,
	orgUnitLevel
}: {
	periods: ISerializePeriod[],
	dataElements: IDataElement[],
	orgUnit: IOrgUnit,
	orgUnitLevel: JSONObject
}
) {
	
	const {data, loading, error, refetch} = useAsyncData<JSONObject[]>();
	
	const fetchData = async (): Promise<JSONObject[]> => {
		 const payload = {
			periods: periods.map((item) => item.code),
			dataElements: dataElements.map((item) => item._id),
			orgUnit: orgUnit._id,
			orgUnitLevel: orgUnitLevel._id
		}
		
		return await post<JSONObject[], any>("/api/charts", payload);
	}
	
	useEffect(() => {
		refetch(fetchData);
	}, [periods,
		dataElements,
		orgUnit,
		orgUnitLevel]);
	
	const transformData = (): JSONObject[] => {
		const transformedData = data!.reduce((acc, item) => {
			const periodName = item.period.name;
			if (!acc[periodName]) {
				acc[periodName] = { period: periodName };
			}
			acc[periodName][item.dataElement.name] = item.value;
			return acc;
		}, {}) as JSONObject;
		
		console.log(JSON.stringify(Object.values(transformedData)) );
		return Object.values(transformedData);
	}
	if( loading || !data) return (<>Loading ...</>);
console.log(JSON.stringify(dataElements));	
    return (
        <ResponsiveContainer width={"100%"} height={300}>
			<LineChart data={transformData()} margin={{ top: 20 }} accessibilityLayer>
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