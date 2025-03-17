import { IDataElement } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomMultiSelect from "../basic/CustomMultiSelect";
import { useEffect } from "react";

export default function DataElementMultiSelect(
{
    options,
    selected,
    onChange
    
}: {
    options: IDataElement[],
    selected: IDataElement[] |null;
    onChange: (value: IDataElement[] ) => void
}) {

    useEffect(() => {
        
    }, [selected]);
    
    return (
        <CustomMultiSelect 
            title="Select Data Element"
            displayProp="name"
            valueProp="_id"
            selected={selected}
            fetchData={async() => options}
            onChange={onChange}
        />

    )
}