import { IDataElement } from "@/types/definations";
import { useSelection } from "@/hooks/useSelection";
import CustomMultiSelect from "../basic/CustomMultiSelect";
import { useEffect } from "react";
import DisableField from "../basic/DisableField";

const TITLE = "Select Data Element";

export default function DataElementMultiSelect(
{
    options,
    selected,
    disabled,
    onChange,
}: {
    options: IDataElement[],
    selected: IDataElement[] |null;
    disabled: boolean;
    onChange: (value: IDataElement[] ) => void
}) {

    useEffect(() => {
        
    }, [selected]);
    
    return (
        <>
            {disabled
                ? <DisableField title={TITLE} />
                : <CustomMultiSelect
                    title={TITLE}
                    displayProp="name"
                    valueProp="_id"
                    selected={selected}
                    options={options}
                    onChange={onChange}
                />}
        </>
    )
}