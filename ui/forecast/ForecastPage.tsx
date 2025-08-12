import { post } from '@/utils/apiClient';
import { useState } from 'react';
import { IPeriod, JSONObject } from '@/types/definations';
import ForecastTopBar from '@/ui/forecast/ForecastTopBar';
import ForecastTable from '@/ui/forecast/ForecastTable';

export default function ForecastPage() {
    const [params, setParams] = useState<JSONObject>({});
    const [predictValues, setPredictValues] = useState<JSONObject | null>(null);
    const [loading, setLoading] = useState(false);

    const predictData = async (params: JSONObject) => {
        setLoading(true);

        const payload = {
            deNames: params.dataElements,
            peCodes: params.periods.map((item: IPeriod) => item.code),
            orgUnitNames: params.orgUnits,
        };

        const predict = await post<JSONObject, any>('/api/predict', payload);
        setPredictValues(predict);

        setLoading(false);
    };

    const handleForecastResult = (data: JSONObject) => {
        console.log(data);
        setParams(data);
        predictData(data);
    };

    return (
        <div className="w-full">
            <ForecastTopBar onResult={handleForecastResult} />
            <div className="flex flex-col px-5">
                <div>
                    Data Elements:{' '}
                    <span className="font-semibold">
                        {params.dataElements?.join(', ') || '[None]'}
                    </span>
                </div>
                <div>
                    Periods:{' '}
                    <span className="font-semibold">
                        {params.periods
                            ?.map((item: IPeriod) => item.code)
                            .join(', ') || '[None]'}
                    </span>
                </div>
                <div>
                    Organisation Units:{' '}
                    <span className="font-semibold">
                        {params.orgUnits?.join(', ') || '[None]'}
                    </span>
                </div>
            </div>

            {!params.dataElements?.length ||
            !params.periods?.length ||
            !params.orgUnits?.length ? (
                <div className="px-5 italic text-red-500 py-3 font-semibold">
                    Missing params to retrieve data
                </div>
            ) : (
                <div className="p-5">
                    {loading ? (
                        <div className="italic">Loading ...</div>
                    ) : (
                        predictValues && (
                            <ForecastTable
                                params={params!}
                                data={predictValues!}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}
