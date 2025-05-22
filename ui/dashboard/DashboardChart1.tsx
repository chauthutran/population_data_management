import {
    initChartX,
    initChartY,
    initDataElements,
    initOrgUnitLevel,
    orgUnitRoot,
} from '@/constants/initData';
import useAsyncData from '@/hooks/useAsyncData';
import { IChartData, JSONObject } from '@/types/definations';
import { retrieveAndTransformData, transformData } from '@/utils/chartUtils';
import { generatePeriodsByCode } from '@/utils/periodUtils';
import { useEffect } from 'react';
import CustomHeatmap from '../charts/charts/CustomHeatmap';
import CustomBarChart from '../charts/charts/CustomBarChart';

export default function DashboardChart1() {
    const { data, loading, error, refetch } = useAsyncData<IChartData>();

    useEffect(() => {
        refetch(fetchChartData);
    }, []);

    const fetchChartData = async (): Promise<IChartData> => {
        const periodCodes = [
            '2018',
            '2019',
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
        ];
        const periods = generatePeriodsByCode(periodCodes);

        const data = await retrieveAndTransformData(
            periodCodes,
            initDataElements.map((item) => item._id),
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

        return transformData(
            data,
            initChartX,
            initChartY,
            orgUnits,
            initDataElements,
            periods,
        );
    };

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <></>;

    return (
        <>
            <div className="p-6 bg-white shadow rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                    {initDataElements.map((item) => item.name).join(' & ')}
                </h3>
                <div className="flex-1 abc overflow-y-auto h-[400px] shadow-md rounded-md p-5">
                    <CustomBarChart data={data} />
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
