import DataSetSelect from '../layout/selection/DataSetSelect';
import PeriodSelect from '../layout/selection/PeriodSelect';
import OrgUnitTree from '../layout/selection/OrgUnitTree';
import { useDataEntry } from '@/hooks/useDataEntry';
import { useState } from 'react';

export default function DataEntryTopBar() {
    const {
        selectedDataSet,
        selectedOrgUnit,
        selectedPeriod,
        cleanAll,
        selectPeriod,
        selectDataSet,
        selectOrgUnit,
    } = useDataEntry();

    return (
        <nav className="flex gap-4 items-center mb-6 px-4 py-2 bg-gray-100 border-t-2 text-black border-gray-300">
            <div className="flex-1">
                <DataSetSelect
                    onItemSelect={selectDataSet}
                    selected={selectedDataSet}
                />
            </div>

            <div className="flex-1">
                <PeriodSelect
                    periodType={selectedDataSet?.periodType.name || ''}
                    selected={selectedPeriod}
                    disabled={false}
                    onChange={selectPeriod}
                />
            </div>

            <div className="flex-1">
                <OrgUnitTree
                    onItemClick={selectOrgUnit}
                    selected={selectedOrgUnit}
                    disabled={false}
                />
            </div>

            <button
                className="w-auto bg-color-1 text-white border border-gray-200 rounded-lg py-3 px-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={cleanAll}
            >
                Clear Data
            </button>
        </nav>
    );
}
