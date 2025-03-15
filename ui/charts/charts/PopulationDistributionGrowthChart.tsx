import useAsyncData from "@/hooks/useAsyncData";
import { IDataElement, IDataValue, IOrgUnit, IPeriodType, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
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
	
	const {data, loading, error, refetch} = useAsyncData<IDataValue[]>();
	
	// const periods = [{
	// 	"code": "202501"
	// }];
	
	// const dataElement =	{
	// 		_id: "67cae581f09193badd6f8c93"
	// 	}
	
	// const orgUnit = {
	// 	_id: "65f123000000000000000004" // Province A
	// }
	
	// const orgUnitLevel = 4;
	  
	const fetchData = async (): Promise<IDataValue[]> => {
		 const payload = {
			periods: periods.map((item) => item.code),
			dataElements: dataElements.map((item) => item._id),
			orgUnit: orgUnit._id,
			orgUnitLevel: orgUnitLevel._id
		}
		
		return await post<IDataValue[], any>("/api/charts", payload);
	}
    console.log("PopulationDistributionGrowthChart");
	useEffect(() => {
		refetch(fetchData);
	}, [periods,
		dataElements,
		orgUnit,
		orgUnitLevel]);
	
	const transformData = (): JSONObject[] => {
		const chartData = [];
		
		for( var i=0; i<data!.length; i++ ) {
			const item = data![i];
			chartData.push({name: item.period.name, value: item.value})
		}
		
		return chartData;
		// const data = [
		// 	{
		// 	name: "Page A",
		// 	uv: 4000,
		// 	pv: 2400,
		// 	amt: 2400,
		// 	},
		// 	{
		// 	name: "Page G",
		// 	uv: 3490,
		// 	pv: 4300,
		// 	amt: 2100,
		// 	},
		// ];
		
	}
	if( loading || !data) return (<>Loading ...</>);
	
    return (
        <ResponsiveContainer width={"100%"} height={300}>
			<LineChart data={transformData()} margin={{ top: 20 }} accessibilityLayer>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="pv"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				></Line>
				<Line type="monotone" dataKey="uv" stroke="#82ca9d"></Line>
			</LineChart>
        </ResponsiveContainer>
      );
}