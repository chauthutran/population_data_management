'use client';

import ChartPage from '@/ui/charts/ChartPage';
import ProtectedRoute from '../../ui/ProtectedRoute';

export default function Chart() {
    return (
        <ProtectedRoute>
            <ChartPage />
        </ProtectedRoute>
    );
}
