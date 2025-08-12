'use client';

import DataEntryPage from '@/ui/dataEntry/DataEntryPage';
import ProtectedRoute from '../../ui/ProtectedRoute';

export default function DataEntry() {
    return (
        <ProtectedRoute>
            <DataEntryPage />
        </ProtectedRoute>
    );
}
