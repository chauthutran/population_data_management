import { get, post } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { IDataValue, IPeriod, JSONObject } from '@/types/definations';
import { formatNumber } from '@/utils/numberUtils';
import ForecastTopBar from './ForecastTopBar';
import { getNextPeriod } from '@/utils/periodUtils';
import { data } from '@tensorflow/tfjs';
import ForecastTable from './ForecastTable';

export default function ForecasePage() {
    const [params, setParams] = useState<JSONObject>({});
    // const [dataValues, setDataValues] = useState<IDataValue[] | null>(null);
    const [predictValues, setPredictValues] = useState<JSONObject | null>(null);
    const [loading, setLoading] = useState(false);

    const predictData = async (params: JSONObject) => {
        setLoading(true);
        
         const payload = {
            deNames: params.dataElements,
            peCodes: params.periods.map((item: IPeriod) => item.code),
            orgUnitNames: params.orgUnits
        };
        
        const predict = await post<JSONObject, any>('/api/predict', payload);
        setPredictValues(predict);
        
        setLoading(false);
        
        // setLoading(true);
        
        // const _dataValues: IDataValue[] = await getDataValues();
        // setDataValues(_dataValues);
        
        // const payload = {
        //     data: _dataValues.map(
        //         (dv: JSONObject) => dv.value,
        //     ),
        // };
        
        // const predict = await post<any, any>('/api/predict', payload);
        // setPredictValues(predict.predicted);
        
        // setLoading(false);
    };

    // const getDataValues = async () => {
    //     const payload = {
    //         deNames: params.dataElements,
    //         peCodes: params.periods.map((item: IPeriod) => item.code),
    //         orgUnitNames: params.orgUnits
    //     };
        
    //     return await post<IDataValue[], any>(
    //         `/api/dataValues/filter`, payload
    //     );
    // };

    // useEffect(() => {
    //     if (params.dataElements?.length && params.periods?.length && params.orgUnits?.length) {
    //         const periodCode = params.periods.map((item: IPeriod) => item.code);
    //         predictData();
    //     }
    // }, [params])
    
    // const getFuturePeriods = () => {
    //     const list = [];
    //     if( dataValues && dataValues.length > 0 ) {
    //         const latestPeriodCode = dataValues[0].period.code;
    //         const next = getNextPeriod(latestPeriodCode);
    //         list.push(next);
    //     }
        
    //     return list;
    // }
    
    const handleForecastResult = (data: JSONObject) => {
        console.log(data);
        setParams(data);
        predictData(data);
    }
    
    return (
        <div className="w-full">
            <ForecastTopBar onResult={handleForecastResult} />
            <div className='flex flex-col'>
                <div>Data Elements: <span className='font-semibold'>{params.dataElements.join(", ")}</span></div>
                <div>Periods: <span className='font-semibold'>{params.periods.map((item: IPeriod) => item.code).join(", ")}</span></div>
                <div>Organisation Units: <span className='font-semibold'>{params.orgUnits.join(", ")}</span></div>
            </div>
            
            { (!params.dataElements?.length || !params.periods?.length || !params.orgUnits?.length) 
                ? <div>Missing some data</div> 
                : <div> 
                   
                    {loading 
                        ? <div className="italic">Loading ...</div>
                        :predictValues && <ForecastTable params={params!} data={predictValues!} />}
                </div>}
        </div>
    );
}
