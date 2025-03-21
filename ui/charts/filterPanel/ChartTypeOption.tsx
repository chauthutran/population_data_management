import { CHART_TYPE_LIST } from "@/constants";
import { useChart } from "@/hooks/useChart";
import { JSONObject } from "@/types/definations";
import { cloneObject } from "@/utils/commonUtils";
import React, { useEffect } from "react";
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlinePieChart } from "react-icons/ai";

// Map of icon names to components
export const ICON_MAP = {
    AiOutlineLineChart,
    AiOutlineBarChart,
    AiOutlinePieChart,
} as const; // Ensures these are treated as a fixed object;

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
            {CHART_TYPE_LIST.map((item) => {
                const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP]; // Get the actual component
                return ( <button
                        key={item.name}
                        onClick={() => handleOnClick(item)}
                        className={`flex items-center gap-2 p-2 border rounded-md hover:bg-gray-100 transition ${selectedChartType?.name === item.name && "bg-color-1"}`}
                    >
                        {IconComponent && <IconComponent />} {/* Render icon if exists */}
                        <span>{item.name}</span>
                    </button>
                )

            })}
        </div>
    );
  };