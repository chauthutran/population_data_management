import { IDataSet } from '@/types/definations';
import { get } from '@/utils/apiClient';
import CustomSelect from '../basic/CustomSelect';

export default function DataSetSelect({
    selected,
    onItemSelect,
}: {
    selected?: IDataSet | null;
    onItemSelect: (item: IDataSet) => void;
}) {
    const fetchDataSets = async () => {
        return await get<IDataSet[]>('/api/dataSets');
    };

    return (
        <CustomSelect<IDataSet>
            title="Select Data Set"
            displayProp="name"
            selected={selected}
            fetchData={fetchDataSets}
            onChange={onItemSelect}
        />
    );
}
