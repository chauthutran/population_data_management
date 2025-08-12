'use client';

import { post } from '@/utils/apiClient';
import { useState } from 'react';
import { IPeriod, JSONObject } from '@/types/definations';
import ForecastTopBar from '@/ui/forecast/ForecastTopBar';
import ForecastTable from '@/ui/forecast/ForecastTable';
import ProtectedRoute from '../../ui/ProtectedRoute';
import ForecastPage from '@/ui/forecast/ForecastPage';

export default function Forecast() {
    
    return (
        <ProtectedRoute>
            <ForecastPage />
        </ProtectedRoute>
    );
}
