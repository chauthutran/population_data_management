'use client';

import DashboardChart1 from '@/ui/dashboard/DashboardChart1';
import DashboardChart2 from '@/ui/dashboard/DashboardChart2';
import RecentEntries from '@/ui/dashboard/RecentEntries';
import Alert from '@/ui/layout/Alert';
import ProtectedRoute from '../../ui/ProtectedRoute';
import DashboardPage from '@/ui/dashboard/DashboardPage';

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    );
}
