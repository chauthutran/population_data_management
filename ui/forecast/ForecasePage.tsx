import useAsyncData from '@/hooks/useAsyncData';
import { get, post } from '@/utils/apiClient';
import { useRef, useState } from 'react';
import DataElementSingleSelect from '../layout/selection/DataElementSingleSelect';
import { IDataElement, IDataValue, IOrgUnit } from '@/types/definations';
import OrgUnitTree from '../layout/selection/OrgUnitTree';
import { setOrgUnit } from '@/store/selectionSlice';
import { formatNumber } from '@/utils/numberUtils';

export default function ForecasePage() {
    const [selectedDataElement, setSeletedDataElement] =
        useState<IDataElement | null>(null);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<IOrgUnit | null>(
        null,
    );
    const [dataValues, setDataValues] = useState<IDataValue[] | null>(null);
    const [predictValue, setPredictValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const predictData = async (deId: string, orgUnitId: string) => {
        setLoading(true);
        
        const _dataValues = await getDataValues(deId, orgUnitId);
        setDataValues(_dataValues);
        
        const payload = {
            data: _dataValues.map(
                (dv: IDataValue) => dv.value,
            ),
        };
        const predict = await post<any, any>('/api/forecast', payload);
        setPredictValue(predict.predictedValue);
        
        setLoading(false);
    };

    const getDataValues = async (deId: string, orgUnitId: string) => {
        return await get<IDataValue[]>(
            `/api/dataValues/${deId}/${orgUnitId}`,
        );
    };

    const handleDEOnSelect = async (item: IDataElement) => {
        setSeletedDataElement(item);
        if (selectedOrgUnit) {
            await predictData(item._id, selectedOrgUnit!._id);
        }
    };

    const handleOrgUnitOnSelect = async (item: IOrgUnit) => {
        setOrgUnit(item);
        if (selectedDataElement) {
            await predictData(selectedDataElement!._id, item._id);
        }
    };

    return (
        <div className="w-full p-3">
            <div className="grid grid-cols-2 gap-4 mb-7">
                <DataElementSingleSelect
                    selected={selectedDataElement}
                    onItemSelect={handleDEOnSelect}
                />

                <OrgUnitTree
                    onItemClick={handleOrgUnitOnSelect}
                    selected={selectedOrgUnit}
                    disabled={false}
                />
            </div>
            
            {loading && <div className="italic">Loading ...</div>}
            
            {predictValue && (
                <>
                    <h2 className="text-2xl font-semibold">{selectedDataElement!.name}</h2>
                    
                    <p className="text-green-700 p-3 font-bold text-xl">Predict value for next year: {formatNumber(Math.round(predictValue))}</p>
                    
                    <table className="w-full border-collapse m-3">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3">Period</th>
                                <th className="p-3">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataValues!.map((item: IDataValue) => (
                                <tr key={item._id} className="border-b">
                                    <td className="p-3">{item.period.name}</td>
                                    <td className="p-3">{formatNumber(item.value)}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
