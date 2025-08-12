import { useDataEntry } from '@/hooks/useDataEntry';
import DataEntryTopBar from '@/ui/dataEntry/DataEntryTopBar';
import DataEntryForm from '@/ui/dataEntry/DataEntryForm';
import DataAccuracyTips from '@/ui/dataEntry/DataAccuracyTips';
import DataApprovalStatus from '@/ui/dataEntry/DataApprovalStatus';

export default function DataEntryPage() {
    const {
        selectedOrgUnit,
        selectedPeriod,
        selectedDataSet,
        selectedApprovalData,
    } = useDataEntry();

    return (
        <div className="flex flex-col w-full">
            <div>
                <DataEntryTopBar />
            </div>

            <div className="flex flex-1">
                {/* Left Side - Data Entry Form */}
                <div className="w-2/3 px-6 space-y-4">
                    <header>
                        {!selectedDataSet ||
                        !selectedPeriod ||
                        !selectedOrgUnit ? (
                            <h2 className="text-xl mb-2 italic">
                                Please select options
                            </h2>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-2">
                                    {selectedDataSet?.name} -{' '}
                                    {selectedPeriod?.name} -{' '}
                                    {selectedOrgUnit?.name}
                                </h2>
                                <p className="text-gray-600">
                                    Fill out the form below to add new records.
                                </p>
                            </>
                        )}
                    </header>

                    <DataEntryForm />
                </div>

                {/* Right Side - Sidebar & Info */}
                <div className="w-1/3 bg-gray-100 p-6 flex flex-col">
                    <aside className="mb-6">
                        <h2 className="text-lg font-semibold">Need Help?</h2>
                        <p className="text-gray-600 text-sm">
                            This form collects population data for statistical
                            purposes. Please input the correct population count
                            and verify before submission.
                        </p>
                    </aside>

                    <section className="mb-8 space-y-2">
                        <DataAccuracyTips />
                    </section>

                    {selectedPeriod && selectedDataSet && selectedOrgUnit && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2">
                                Data Overview
                            </h2>
                            <DataApprovalStatus
                                approvalData={selectedApprovalData}
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
