import CustomSelect from "../basic/CustomSelect";
import { JSONObject } from "@/types/definations";

const CHART_TYPE_LIST: JSONObject[] = [
    { _id: "Line", name: "Line" },
    { _id: "Bar", name: "Bar" },
    { _id: "Pie", name: "Pie" },
]

export default function ChartTypeSelect ({selected, onItemSelect}: {selected: JSONObject | null; onItemSelect: (value: JSONObject) => void}) {
    
    return (
        <CustomSelect<JSONObject>
            title="Select Chart Type"
            displayProp="name"
            selected={selected}
            fetchData={async() => CHART_TYPE_LIST}
            onChange={onItemSelect}
        />
    )
}