import { ORG_UNIT_LEVELS } from '@/constants';
import CustomSelect from '../basic/CustomSelect';
import { JSONObject } from '@/types/definations';

export default function OrgUnitLevelSelect({
    selected,
    onChange,
}: {
    selected: JSONObject | null;
    onChange: (value: JSONObject) => void;
}) {
    return (
        <CustomSelect<JSONObject>
            title="Select OrgUnit level"
            displayProp="name"
            selected={selected}
            fetchData={async () => ORG_UNIT_LEVELS}
            onChange={onChange}
        />
    );
}
