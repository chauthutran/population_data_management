import { IDataElement, IDataSet } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomSelect from "./basic/CustomSelect";

export default function DataElementSelect({onChange}: {onChange: (value: IDataElement) => void}) {
    
    const { selectedDataSet } = useSelection();
    
    if( !selectedDataSet ) return (<>Loading ...</>);
    
    return (
        <CustomSelect<IDataElement>
            title="Select Data Element"
            displayProp="name"
            fetchData={async() => selectedDataSet?.dataElements}
            onChange={onChange}
        />
    )
}