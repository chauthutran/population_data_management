import { useChart } from "@/hooks/useChart";
import { IDataSet } from "@/types/definations";
import AccordionPanel from "@/ui/layout/AccordionPanel";
import DataElementMultiSelect from "@/ui/layout/selection/DataElementMultiSelect";
import DataSetSelect from "@/ui/layout/selection/DataSetSelect";
import OrgUnitLevelSelect from "@/ui/layout/selection/OrgUnitLevelSelect";
import OrgUnitTree from "@/ui/layout/selection/OrgUnitTree";
import PeriodMultiSelect from "@/ui/layout/selection/PeriodMultiSelect";
import { useState } from "react";

export default function DataSetPanel (
{
    activePanel,
    handlePanelOnClick
}: {
    activePanel: string;
    handlePanelOnClick: (name: string) => void
}) {
    
    const { selectedDataElements, selectedPeriods, selectPeriods, selectDataElements } = useChart();
    const [selectedDataSet, setSelectedDataSet] = useState<IDataSet | null>(null);
    
    const handleDataSetOnChange = (item: IDataSet) => {
        selectPeriods(null);
        selectDataElements(null);
        setSelectedDataSet(item);
    }
    
    return (
        <AccordionPanel
            title="Data Element and Periods"
            isOpen={activePanel === "dataSet"}
            onClick={() => handlePanelOnClick("dataSet")}
            className={`${activePanel == "dataSet" && "bg-lemon-lime"}`}
        >
            <div className="flex-grow-0 space-y-4">
                <DataSetSelect onItemSelect={handleDataSetOnChange} selected={selectedDataSet} />
                <DataElementMultiSelect
                    disabled={!selectedDataSet}
                    selected={selectedDataElements}
                    options={selectedDataSet?.dataElements || []}
                    onChange={selectDataElements} />
                <PeriodMultiSelect
                    disabled={!selectedDataSet}
                    selected={selectedPeriods}
                    periodType={selectedDataSet?.periodType.name || ""}
                    onChange={selectPeriods}
                />
            </div>
        </AccordionPanel>
    )
}