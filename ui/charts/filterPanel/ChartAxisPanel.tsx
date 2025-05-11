import {
    CHART_AXIST_DATA_ELEMENTS,
    CHART_AXIST_ORGUNITS,
    CHART_AXIST_PERIODS,
} from '@/constants';
import { useChart } from '@/hooks/useChart';
import { IChartAxist } from '@/types/definations';
import AccordionPanel from '@/ui/layout/AccordionPanel';

const categories = [
    CHART_AXIST_ORGUNITS,
    CHART_AXIST_DATA_ELEMENTS,
    CHART_AXIST_PERIODS,
];

export default function ChartAxisPanel({
    activePanel,
    handlePanelOnClick,
}: {
    activePanel: string;
    handlePanelOnClick: (name: string) => void;
}) {
    const { selectedChartX, selectedChartY, selectChartX, selectChartY } =
        useChart();

    // Handle selection for X
    const handleSelectX = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: IChartAxist,
    ) => {
        const checked = e.target.checked;
        if (checked) {
            const updatedList = [...selectedChartX!, item];
            selectChartX(updatedList);
        } else {
            const updatedList = selectedChartX!.filter(
                (c) => c._id != item._id,
            );
            selectChartX(updatedList);
        }
    };

    // Handle selection for Y
    const handleSelectY = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: IChartAxist,
    ) => {
        const checked = e.target.checked;
        if (checked) {
            const updatedList = [...selectedChartY!, item];
            selectChartY(updatedList);
        } else {
            const updatedList = selectedChartY!.filter(
                (c) => c._id != item._id,
            );
            selectChartY(updatedList);
        }
    };

    return (
        <AccordionPanel
            title="Chart Axis"
            isOpen={activePanel === 'chartAxis'}
            onClick={() => handlePanelOnClick('chartAxis')}
            className={`${activePanel == 'chartAxis' && 'text-blue-600'}`}
        >
            <div className="grid grid-cols-2 gap-2">
                {/* X-Axis Selector */}
                <div className="p-2 border rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                        X-Axis
                    </h3>
                    <MutipleSelector
                        selected={selectedChartX!}
                        disableList={selectedChartY!}
                        onChange={handleSelectX}
                    />
                </div>

                {/* Y-Axis Selector */}
                <div className="p-2 border rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Y-Axis
                    </h3>
                    <MutipleSelector
                        selected={selectedChartY!}
                        disableList={selectedChartX!}
                        onChange={handleSelectY}
                    />
                </div>
            </div>
        </AccordionPanel>
    );
}

const MutipleSelector = ({
    selected,
    disableList,
    onChange,
}: {
    selected: IChartAxist[];
    disableList: IChartAxist[];
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        item: IChartAxist,
    ) => void;
}) => {
    return (
        <div className="flex flex-col space-y-2">
            {categories.map((item) => {
                const isDisabled = disableList.some((y) => y._id === item._id);
                return (
                    <label
                        key={`X_${item._id}`}
                        className={`flex items-center space-x-2 px-2 py-1 rounded-md ${isDisabled ? 'text-gray-400' : 'hover:bg-gray-200 cursor-pointer'}`}
                    >
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-600"
                            disabled={isDisabled}
                            checked={selected.some((c) => c._id === item._id)}
                            onChange={(e) => onChange(e, item)}
                        />
                        <span>{item.name}</span>
                    </label>
                );
            })}

            {selected.length == 0 && (
                <span className="text-red-600 italic text-sm">
                    This field is required
                </span>
            )}
        </div>
    );
};
