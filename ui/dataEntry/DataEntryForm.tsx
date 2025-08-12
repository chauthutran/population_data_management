import { DATA_UNAPPROVED } from '@/constants';
import useAsyncData from '@/hooks/useAsyncData';
import { useDataEntry } from '@/hooks/useDataEntry';
import { IApprovalData, IDataValue, JSONObject } from '@/types/definations';
import { post } from '@/utils/apiClient';
import {
    convertDataValuesToMap,
    createDataValues,
    getApprovalStatus,
} from '@/utils/dataValueUtils';
import Joi from 'joi';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Alert from '../layout/Alert';

export default function DataEntryForm() {
    const {
        selectedOrgUnit,
        selectedPeriod,
        selectedDataSet,
        selectedApprovalData,
        selectApprovalData,
    } = useDataEntry();
    const { data, error, refetch, loading } = useAsyncData<JSONObject>();

    const [dataValueMap, setDataValueMap] = useState<Record<string, string>>(
        {},
    );

    const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submit loading

    useEffect(() => {
        if (selectedOrgUnit && selectedPeriod && selectedDataSet) {
            refetch(fetchData);
        }
    }, [selectedOrgUnit, selectedPeriod, selectedDataSet]);

    useEffect(() => {
        if (data) {
            setDataValueMap(convertDataValuesToMap(data.dataValues));
            selectApprovalData(data.approvalData);
        }
    }, [data]);

    const schema = Joi.object(
        selectedDataSet?.dataElements.reduce(
            (acc, el) => {
                acc[el._id] = Joi.number()
                    .min(0)
                    .required()
                    .messages({
                        'number.base': `${el.name} must be a number`,
                        'any.required': `${el.name} is required`,
                        'number.min': `${el.name} cannot be negative`,
                    });
                return acc;
            },
            {} as Record<string, Joi.NumberSchema>,
        ),
    );

    const fetchData = async (): Promise<JSONObject> => {
        const dataValues = await fetchDataValues();
        const approvalData = await fetchApprovalData();

        return { dataValues, approvalData };
    };
    
    const fetchDataValues = useCallback(async (): Promise<IDataValue[]> => {
        const payload = {
            period: selectedPeriod?.code,
            dataElements: selectedDataSet?.dataElements.map((de) => de._id),
            orgUnit: selectedOrgUnit?._id,
        };

        return await post<IDataValue[], any>(
            '/api/dataValues/retrieve',
            payload,
        );
    }, [selectedPeriod, selectedDataSet, selectedOrgUnit]);
    
    const fetchApprovalData = useCallback( async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
        };

        return await post<IApprovalData, any>('/api/approvalData', payload);
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);

    const handleOnChange = (dataElementId: string, value: string) => {
        setDataValueMap((prevMap) => ({
            ...prevMap, // Spread the previous values
            [dataElementId]: value, // Update the value for the specific key
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true); // Set submitting state to true

        // Joi validation
        const { error } = schema.validate(dataValueMap, { abortEarly: false });
        if (error) {
            const message = error.details.map((d) => d.message).join(', ');
            setAlertMessage({ message, type: 'error' });
            setIsSubmitting(false);
            return;
        }

        const payload = createDataValues(
            dataValueMap,
            selectedPeriod!.code,
            selectedOrgUnit!._id,
        );
        await post<IDataValue[], any>('/api/dataValues/save', payload);
        const message = 'Data saved successfully!';
        setAlertMessage({ message, type: 'success' });
        setIsSubmitting(false); // Set submitting state to false after submission
    };

    if (!selectedDataSet || !selectedPeriod || !selectedOrgUnit) return <></>;

    if (loading) return <div className="p-6">Loading ...</div>;

    const approvalStatus = getApprovalStatus(selectedApprovalData);

    return (
        <>
            {alertMessage.message && (
                <Alert message={alertMessage.message} type={alertMessage.type} id={new Date().getMilliseconds()} />
            )}

            <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {selectedDataSet.dataElements.map((el) => (
                        <div
                            key={el._id}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <span className="text-lg">{el.name}</span>
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-24 rounded disabled:bg-gray-100"
                                value={dataValueMap[el._id] || ''}
                                disabled={approvalStatus !== DATA_UNAPPROVED}
                                onChange={(e) =>
                                    handleOnChange(el._id, e.target.value)
                                }
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-teal-700 text-white hover:bg-teal-600  hover:shadow-lg border disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 px-4 py-3 rounded-lg w-full flex space-x-3 justify-center"
                        disabled={
                            approvalStatus !== DATA_UNAPPROVED ||
                            (approvalStatus === DATA_UNAPPROVED &&
                                (isSubmitting || loading))
                        } // Disable the button while submitting or loading
                    >
                        <span>Submit Data</span>
                        <span
                            style={{
                                visibility: isSubmitting ? 'visible' : 'hidden',
                            }}
                        >
                            {' '}
                            <FaSpinner className="animate-spin mr-2" />
                        </span>
                    </button>
                </form>
            </div>
        </>
    );
}
