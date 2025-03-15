import { IDataElement } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomMultiSelect from "./basic/CustomMultiSelect";

export default function DataElementMultiSelect({ onChange }: { onChange: (value: IDataElement[] ) => void}) {
    
    const { selectedDataSet } = useSelection();

    if( !selectedDataSet ) return (<>Loading ...</>);
    
    return (
        <CustomMultiSelect 
            title="Select Data Element"
            displayProp="name"
            valueProp="_id"
            fetchData={async() => selectedDataSet?.dataElements}
            onChange={onChange}
        />

    )
}