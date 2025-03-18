import { useChart } from "@/hooks/useChart";
import { JSONObject } from "@/types/definations";
import { cloneObject } from "@/utils/commonUtils";
import React, { useEffect } from "react";
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlinePieChart } from "react-icons/ai";

const CHART_TYPE_LIST = [
  { name: "Line", icon: <AiOutlineLineChart /> },
  { name: "Bar", icon: <AiOutlineBarChart /> },
  { name: "Pie", icon: <AiOutlinePieChart /> },
  { name: "Heatmap", icon: <AiOutlinePieChart /> },
];


export default function ChartTypeSelector () {
    const { selectedChartType, selectChartType } = useChart();
    
    useEffect(() => {
        const lineChart = {_id: CHART_TYPE_LIST[0].name, name: CHART_TYPE_LIST[0].name};
        selectChartType(lineChart);
    }, []);
    
    const handleOnClick = (item: JSONObject) => {
        selectChartType({_id: item.name, name: item.name});
    }
    
    return (
        <div className="flex gap-4 p-4">
            {CHART_TYPE_LIST.map((item) => (
            <button
                key={item.name}
                onClick={() => handleOnClick(item)}
                className={`flex items-center gap-2 p-2 border rounded-md hover:bg-gray-100 transition ${selectedChartType?.name === item.name && "bg-color-1"}`}
            >
                {item.icon}
                <span>{item.name}</span>
            </button>
            ))}
        </div>
    );
  };