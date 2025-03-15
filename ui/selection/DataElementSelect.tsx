import { IDataElement, IDataSet } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomSelect from "./basic/CustomSelect";
import { useState } from "react";
import CustomMultiSelect from "./basic/CustomMultiSelect";

const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];
export default function DataElementSelect({ onChange }: { onChange: (value: IDataElement[] ) => void}) {
    
    const { selectedDataSet } = useSelection();

    if( !selectedDataSet ) return (<>Loading ...</>);
    
    return (
        // <CustomSelect<IDataElement>
        //     title="Select Data Element"
        //     displayProp="name"
        //     fetchData={async() => selectedDataSet?.dataElements}
        //     onChange={onChange}
        // />
        
        <CustomMultiSelect 
            title="Select Data Element"
            displayProp="name"
            fetchData={async() => selectedDataSet?.dataElements}
            onChange={onChange}
        />

    )
}