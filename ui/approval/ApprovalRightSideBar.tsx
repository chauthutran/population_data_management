import { useSelection } from '@/hooks/useSelection';
import CurrentApprovalStatus from './CurrentApprovalStatus';
import ApprovalHistory from './ApprovalHistory';

export default function ApprovalRightSideBar() {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, selectOrgUnit } =
        useSelection();

    if (
        selectedDataSet == null ||
        selectedPeriod == null ||
        selectedOrgUnit == null
    )
        return <></>;

    return (
        <div className="flex flex-col h-[70vh] overflow-y-auto flex-1 bg-gray-100 shadow-md rounded-lg p-5 border border-gray-200">
            {/* Approval Status */}
            <section className="mb-6 border-b pb-4">
                <CurrentApprovalStatus />
            </section>

            {/* Approval History */}
            <section className="mb-6 border-b pb-4">
                <ApprovalHistory />
            </section>

            {/* Approval Checklist */}
            <section className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    ✅ Approval Checklist
                </h3>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-2">
                    <li>Verify population numbers</li>
                    <li>Confirm dataset, period, and orgUnit</li>
                    <li>Ensure all required fields are filled</li>
                </ul>
            </section>

            {/* Next Steps */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    📌 Next Steps
                </h3>
                <p className="text-gray-700 text-sm">
                    Once you approve this data, it will be processed and
                    finalized for reporting. Please ensure all details are
                    accurate.
                </p>
            </section>
        </div>
    );
}
