import { IDataElement, IPeriod, ISerializePeriod } from '@/types/definations';
import { useSelection } from '@/hooks/useSelection';
import CustomMultiSelect from '../basic/CustomMultiSelect';
import { generatePeriodsByType, getCurrentYear } from '@/utils/periodUtils';
import { useEffect, useState } from 'react';
import DisableField from '../basic/DisableField';

const curYear = getCurrentYear();
const TITLE = 'Select Period';

export default function PeriodMultiSelect({
    periodType,
    selected,
    disabled,
    onChange,
}: {
    periodType: string;
    selected: ISerializePeriod[] | null;
    disabled: boolean;
    onChange: (periods: ISerializePeriod[]) => void;
}) {
    const [selectedyear, setSelectedYear] = useState<number>(curYear);

    useEffect(() => {}, [selected, periodType]);

    const handleOnPrev = () => {
        if (periodType === 'Yearly') setSelectedYear((prev) => prev - 10);
        else if (periodType === 'Monthly') setSelectedYear((prev) => prev - 1);
    };

    const handleOnNext = () => {
        if (periodType === 'Yearly') setSelectedYear((prev) => prev + 10);
        else if (periodType === 'Monthly') setSelectedYear((prev) => prev + 1);
    };

    const createNavigationButtons = () => {
        return (
            <div className="flex justify-between items-center bg-gray-300">
                <button
                    onClick={handleOnPrev}
                    disabled={selectedyear <= 1000}
                    className="text-xl text-gray-600 disabled:text-gray-200 py-0.5 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                    &#128896;
                </button>

                <button
                    onClick={() => setSelectedYear(curYear)}
                    className="text-2xl text-gray-600 py-0.5 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                    &#9679;
                </button>

                <button
                    onClick={handleOnNext}
                    disabled={selectedyear === curYear}
                    className="text-xl text-gray-600 disabled:text-gray-200 py-0.5 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                    &#128898;
                </button>
            </div>
        );
    };

    return (
        <>
            {disabled ? (
                <DisableField title={TITLE} />
            ) : (
                <CustomMultiSelect<ISerializePeriod>
                    key={`${periodType}-${selectedyear}`}
                    title={TITLE}
                    displayProp="name"
                    valueProp="code"
                    options={generatePeriodsByType(periodType, selectedyear)}
                    selected={selected}
                    onChange={onChange}
                >
                    {createNavigationButtons()}
                </CustomMultiSelect>
            )}
        </>
    );
}
