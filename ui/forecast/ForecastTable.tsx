import { IDataValue, IPeriod, JSONObject } from "@/types/definations"
import { getColorFromString } from "@/utils/colorUtils";
import { formatNumber } from "@/utils/numberUtils"

export default function ForecastTable ({
    params,
    data,
}: {
    params: JSONObject,
    data: JSONObject,
}) {
	
    return (
		<>
			<h2 className="text-sm text-gray-600 italic pb-3">*** Predicted values are shown in <span className="text-blue-600 font-medium">blue</span>.</h2>
			
			<table className="w-full table-auto">
				<thead className="bg-gray-200 text-gray-700 sticky top-0 border">
					<tr>
						<th className="text-left p-4 font-semibold border border-gray-300">Data Element</th>
						{params.periods.map((pe: IPeriod) => (
							<th
								key={pe.code}
								className="text-left p-4 border border-gray-300"
							>
								{pe.name}
							</th>
						))}
					</tr>
				</thead>
				
				{params.orgUnits.map((ouName: string, index: number) => (
					createTableRow({
						ouName,
						deNames: params.dataElements,
						periods: params.periods,
						values: data[ouName] || {},
						index,
					})
				))}
			</table>
		</>
    )
}

const createTableRow = ({
    ouName,
    deNames,
    periods,
    values,
    index,
  }: {
    ouName: string;
    deNames: string[];
    periods: IPeriod[];
    values: JSONObject;
    index: number;
  }) => {
    const colNo = periods.length + 1;
  
    return (
      <tbody className="shadow-lg" key={index}>
        {/* OrgUnit Header Row */}
        <tr>
          <td
            colSpan={colNo}
            className="bg-gray-100 text-gray-800 text-left px-4 py-3 font-semibold text-lg border border-gray-300"
          >
            {ouName}
          </td>
        </tr>
  
        {/* Data Element Rows */}
        {deNames.map((deName, i) => (
          <tr
            key={`${ouName}_${deName}_${i}`}
            className={`transition hover:bg-gray-50`}
          >
            <td className="bg-gray-100 font-semibold text-gray-800 px-4 py-2 border border-gray-300 rounded-l-md">
              {deName}
            </td>
  
            {periods.map((pe, j) => (
                <td
					key={pe.code}
					className={`text-sm px-4 py-2 border border-gray-300  ${
						j === periods.length - 1 ? 'rounded-r-md' : ''
					}`}
				>
                  	{values[deName]?.[pe.code]?.value 
						? <span className={`${values[deName]?.[pe.code]?.predited ? "italic text-blue-600" : "text-gray-700"}`}>{values[deName]?.[pe.code]?.value}</span>
						: <span className="text-gray-400 italic">—</span>
					}
                </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };
  