import { useSelection } from '@/hooks/useSelection';
import ApprovalButtonBar from './ApprovalButtonBar';
import DataValueList from './DataValueList';
import TopBar from './ApprovalTopBar';
import ApprovalRightSideBar from './ApprovalRightSideBar';

export default function ApprovalPage() {
    const { selectedOrgUnit, selectedPeriod, selectedDataSet } = useSelection();

    return (
        <div className="flex flex-col w-full">
            <div>
                <TopBar />
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
                                    Please review the submitted data carefully.
                                    Ensure all the required fields are correct
                                    before approving. If there are any
                                    discrepancies, please flag them for review.
                                </p>
                            </>
                        )}
                    </header>

                    <DataValueList />
                    <ApprovalButtonBar />
                </div>

                {/* Right Side - Sidebar & Info */}
                <div className="w-1/3 h-full">
                    <ApprovalRightSideBar />
                </div>
            </div>
        </div>
    );
}
