'use client';

import ApprovalPage from '@/ui/approval/ApprovalPage';
import ProtectedRoute from '../../ui/ProtectedRoute';

export default function Approval() {
    return (
        <ProtectedRoute>
            <ApprovalPage />
        </ProtectedRoute>
    );
}
