import {
    FcApproval,
    FcComboChart,
    FcDataSheet,
    FcPhoneAndroid,
} from 'react-icons/fc';

export default function AppDetailsIntro() {
    return (
        <>
            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcDataSheet size={35} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Data Entry</h3>
                    <div className="text-sm">
                        Easily input, update, and manage data with an intuitive
                        interface, ensuring accuracy and efficiency.
                    </div>
                </div>
            </div>

            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcApproval size={35} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Approvals</h3>
                    <div className="text-sm">
                        Maintain data integrity with a structured approval
                        process, allowing for review and validation before
                        finalization
                    </div>
                </div>
            </div>

            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcComboChart size={35} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Charts & Analytic</h3>
                    <div className="text-sm">
                        Gain valuable insights with interactive charts and
                        visual reports, helping you analyze trends and make
                        data-driven decisions
                    </div>
                </div>
            </div>

            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcComboChart size={35} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Forecast</h3>
                    <div className="text-sm">
                       Very valuable for planning and policy-making (e.g., urban development, healthcare, education).
                    </div>
                </div>
            </div>

            <div className="flex flex-row space-x-2">
                <div className="">
                    <FcPhoneAndroid size={35} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        Mobile-Friendly & Responsive
                    </h3>
                    <div className="text-sm">
                        Access and manage your data anytime, anywhere, with a
                        fully responsive design optimized for all devices.
                    </div>
                </div>
            </div>
        </>
    );
}
