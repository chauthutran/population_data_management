import { IDataElement } from '@/types/definations';
import CustomSelect from '../basic/CustomSelect';
import { get } from '@/utils/apiClient';

export default function DataElementSingleSelect({
    selected,
    onItemSelect,
}: {
    selected?: IDataElement | null;
    onItemSelect: (item: IDataElement) => void;
}) {
    const fetchDataSets = async () => {
        return await get<IDataElement[]>('/api/dataElements');
    };

    return (
        <CustomSelect<IDataElement>
            title="Select Data Element"
            displayProp="name"
            selected={selected}
            fetchData={fetchDataSets}
            onChange={onItemSelect}
        />
    );
}
