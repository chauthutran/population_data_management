import { useSelection } from "@/hooks/useSelection";
import { IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import DataElementMultiSelect from "@/ui/selection/DataElementMultiSelect";
import DataSetSelect from "@/ui/selection/DataSetSelect";
import OrgUnitLevelSelect from "@/ui/selection/OrgUnitLevelSelect";
import OrgUnitTree from "@/ui/selection/OrgUnitTree";
import PeriodMultiSelect from "@/ui/selection/PeriodMultiSelect";

export default function DataElementAndPeriodPanel ({
    panelIdx,
    isOpen,
    togglePanel,
    handlePeriodOnChange,
    handleDataElementOnChange,
}: {
    panelIdx: number;
    isOpen: boolean;
    togglePanel: (panelIdx: number) => void;
    handlePeriodOnChange: (periods: ISerializePeriod[]) => void;
    handleDataElementOnChange: (dataElements: IDataElement[]) => void;
}) {
    
    const { selectedDataSet } = useSelection();
    
    return (
        <div className="border border-gray-300">
            {/* Header */}
            <button
                onClick={() => togglePanel(panelIdx)}
                className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-left"
            >
                <span className="font-medium">Data Elements and Periods</span>
                <span>{isOpen ? "▼" :"▲" }</span>
            </button>

            {/* Content (Only visible if open) */}
            {isOpen && (
                <div className="p-4 bg-white border-t border-gray-300">
                    <DataSetSelect />
                    <DataElementMultiSelect onChange={handleDataElementOnChange} />
                    {selectedDataSet  && <PeriodMultiSelect
                                            periodType={selectedDataSet!.periodType.name}
                                            onChange={handlePeriodOnChange}
                                        />}
                        
                </div>
            )}
        </div>
    )
}