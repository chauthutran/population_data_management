import {
    initChartX,
    initChartY,
    initOrgUnitLevel,
    orgUnitRoot,
} from '@/constants/initData';
import useAsyncData from '@/hooks/useAsyncData';
import { IChartData, JSONObject } from '@/types/definations';
import { retrieveAndTransformData, transformData } from '@/utils/chartUtils';
import { generatePeriodsByType } from '@/utils/periodUtils';
import { useEffect } from 'react';
import CustomLineChart from '../charts/charts/CustomLineChart';
import CustomHeatmap from '../charts/charts/CustomHeatmap';

const dataElements = [
    {
        _id: '60c72b2f9c29f80015e5f730',
        name: 'Elderly Population',
        shortName: 'elderly_population',
        description:
            'The population of individuals aged 60 and above within the organizational unit.',
    },
    {
        _id: '60c72b2f9c29f80015e5f731',
        name: 'Urban Population',
        shortName: 'urban_population',
        description:
            'The population residing in urban areas within the organizational unit.',
    },
    {
        _id: '60c72b2f9c29f80015e5f732',
        name: 'Rural Population',
        shortName: 'rural_population',
        description:
            'The population residing in rural areas within the organizational unit.',
    },
];

export default function DashboardChart2() {
    const { data, loading, error, refetch } = useAsyncData<IChartData>();

    useEffect(() => {
        refetch(fetchChartData);
    }, []);

    const fetchChartData = async (): Promise<IChartData> => {
        const periods = generatePeriodsByType('Monthly', 2024);

        const data = await retrieveAndTransformData(
            periods.map((item) => item.code),
            dataElements.map((item) => item._id),
            orgUnitRoot._id,
            initOrgUnitLevel._id,
        );

        const orgUnits: JSONObject[] = Array.from(
            new Map(
                data.map((item) => [
                    item.orgUnit,
                    { _id: item.orgUnit, name: item.orgUnitName },
                ]),
            ).values(),
        );

        const result = transformData(
            data,
            initChartX,
            initChartY,
            orgUnits,
            dataElements,
            periods,
        );
        return result;
    };

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <></>;

    return (
        <>
            <div className="p-6 bg-white shadow rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                    {dataElements.map((item) => item.name).join(' & ')}
                </h3>
                <div className="flex-1 abc overflow-y-auto h-[400px] shadow-md rounded-md p-5">
                    <CustomLineChart data={data} />
                </div>
            </div>

            <div className="p-6 bg-white shadow rounded-lg">
                <h3 className="text-lg font-bold mb-4">Heatmap</h3>
                <div className="flex-1 abc overflow-y-auto h-[400px] shadow-md rounded-md p-5">
                    <CustomHeatmap data={data} />
                </div>
            </div>
        </>
    );
}
