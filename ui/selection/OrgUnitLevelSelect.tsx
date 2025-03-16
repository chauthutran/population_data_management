import CustomSelect from "./basic/CustomSelect";
import { IOrgUnit, JSONObject } from "@/types/definations";

const ORG_UNIT_LEVELS: JSONObject[] = [
    { _id: 1, name: "Country" },
    { _id: 2, name: "Region" },
    { _id: 3, name: "Province" },
    { _id: 4, name: "District" }
]

export default function OrgUnitLevelSelect ({selected, onChange}: {selected: JSONObject | null; onChange: (value: JSONObject) => void}) {

    return (
        <CustomSelect<JSONObject>
            title="Select OrgUnit level"
            displayProp="name"
            selected={selected}
            fetchData={async() => ORG_UNIT_LEVELS}
            onChange={onChange}
        />
    )
}