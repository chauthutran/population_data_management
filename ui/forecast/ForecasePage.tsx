import { get, post } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { IDataValue, IPeriod, JSONObject } from '@/types/definations';
import { formatNumber } from '@/utils/numberUtils';
import ForecastTopBar from './ForecastTopBar';
import { useForecast } from '@/hooks/useForecast';
import { getNextPeriod } from '@/utils/periodUtils';
import { data } from '@tensorflow/tfjs';

export default function ForecasePage() {
    // const { selectedDataElement, selectedPeriod, selectedOrgUnit } = useForecast();
    
    const [params, setParams] = useState<JSONObject>({});
    const [dataValues, setDataValues] = useState<JSONObject[] | null>(null);
    const [predictValues, setPredictValues] = useState<number[] | null>(null);
    const [loading, setLoading] = useState(false);

    const predictData = async (deId: string, orgUnitId: string, periodCode: string) => {
        setLoading(true);
        
        const _dataValues: JSONObject[] = await getDataValues();
        setDataValues(_dataValues);
        
        const payload = {
            data: _dataValues.map(
                (dv: JSONObject) => dv.value,
            ),
        };
        
        const predict = await post<any, any>('/api/predict', payload);
        setPredictValues(predict.predicted);
        
        setLoading(false);
    };

    const getDataValues = async () => {
        return await post<JSONObject[], any>(
            `/api/dataValues/filter`, params
        );
    };

    useEffect(() => {
        if (params.dataElements.length > 0 && params.periods.length > 0 && params.orgUnits.length > 0) {
            // predictData(selectedDataElement._id, selectedOrgUnit._id, selectedPeriod.code);
        }
    }, [params])
    
    // const nextPeriods = () => {
    //     const list = [];
    //     if( dataValues && dataValues.length > 0 ) {
    //         const latestPeriodCode = dataValues[0].period.code;
    //         const next = getNextPeriod(latestPeriodCode);
    //         list.push(next);
    //     }
        
    //     return list;
    // }
    
    const handleForecastResult = (data: JSONObject) => {
        setParams(data);
    }

    return (
        <div className="w-full">
            <ForecastTopBar onResult={handleForecastResult} />
            
            { (params.dataElements.length === 0 || params.periods.length === 0 || params.orgUnits.length === 0) 
                && <div>Missing some data</div> }
            <div className='flex flex-row'>
                <div>Data Elements: <span className='font-semibold'>{params.dataElements.join(", ")}</span></div>
                <div>Periods: <span className='font-semibold'>{params.periods.join(", ")}</span></div>
                <div>Organisation Units: <span className='font-semibold'>{params.orgUnits.join(", ")}</span></div>
            </div>
            
            {loading && <div className="italic">Loading ...</div>}
            
            {predictValues && (
                <>
                    {/* <h2 className="text-2xl font-semibold">{selectedDataElement!.name}</h2> */}
                    
                    <table className="w-full border-collapse m-3">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3">Period</th>
                                <th className="p-3">dataElement</th>
                                <th className="p-3">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/* {nextPeriods()!.map((pe: IPeriod, idx: number) => (
                                <tr key={pe.code} className="border-b text-orange-500 font-bold">
                                    <td className="p-3">{pe.name}</td>
                                    <td className="p-3">{formatNumber(predictValues[idx])}</td>
                                </tr>
                            ))} */}
                            
                            <td className="p-3">{item.orgUnit.name}</td>
                            
                            {dataValues!.map((item: JSONObject) => (
                                <tr key={item._id} className="border-b">
                                    <td className="p-3">{item.period.name}</td>
                                    <td className="p-3">{item.dataElement.name}</td>
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
