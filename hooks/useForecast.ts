import {
    clearSelection,
    setDataElement,
    setOrgUnit,
    setPeriod,
} from '@/store/forecastSlice';
import { AppDispatch, RootState } from '@/store/store';
import {
    IDataElement,
    IOrgUnit,
    ISerializePeriod,
} from '@/types/definations';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useForecast = () => {
    const dispatch = useDispatch<AppDispatch>();

    const selectedDataElement = useSelector(
        (state: RootState) => state.forecast.dataElement,
        shallowEqual,
    );
    const selectedPeriod = useSelector(
        (state: RootState) => state.forecast.period,
        shallowEqual,
    );
    const selectedOrgUnit = useSelector(
        (state: RootState) => state.forecast.orgUnit,
        shallowEqual,
    );

    // Menoize the callback for performance
    const selectDataElement = useCallback(
        (data: IDataElement) => {
            dispatch(setDataElement(data));
        },
        [dispatch],
    );

    const selectPeriod = useCallback(
        (data: ISerializePeriod) => {
            dispatch(setPeriod(data));
        },
        [dispatch],
    );

    const selectOrgUnit = useCallback(
        (data: IOrgUnit) => {
            dispatch(setOrgUnit(data));
        },
        [dispatch],
    );

    const cleanAll = useCallback(() => {
        dispatch(clearSelection());
    }, [dispatch]);

    return {
        selectedDataElement,
        selectedPeriod,
        selectedOrgUnit,
        selectDataElement,
        selectPeriod,
        selectOrgUnit,
        cleanAll,
    };
};
