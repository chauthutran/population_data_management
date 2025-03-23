import { PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import Image from "next/image";
import { FcApproval, FcComboChart, FcDataSheet } from "react-icons/fc";

export default function HomePage() {
    
    const { setCurrentPage } = useCurrentPage();
    
    return (
        <>
            <div className="flex flex-row items-start w-full h-full space-x-10 my-10">
                <div className="flex-1 flex-col space-y-5 m-3">
                    <div className="text-left">
                        The Population Data Management Application is a powerful and user-friendly platform designed to help organizations collect, manage, and visualize population-related data efficiently.
                        <br />
                        Whether you're tracking demographics, conducting surveys, or analyzing trends, this application provides a seamless workflow from data entry to advanced analytics.
                    </div>
                    <div>
                        <button 
                            className="shadow-lg hover:shadow-gray-400 px-3 py-2 bg-blue-400 font-semibold rounded-lg transition-transform transform hover:scale-105"
                            onClick={() => setCurrentPage(PAGE_LOGIN)}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Image src="target-svgrepo-com.svg" alt="target" width={300} height={300} />
                </div>
                <div className="flex-1 flex flex-col space-y-10">
                    <div className="flex flex-row space-x-2">
                        <div className="">
                            <FcDataSheet size={35} /> 
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Data Entry</h3>
                            <div className="text-sm">
                                Allows users to input, update, and manage data efficiently.
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
                                Ensures that submitted data undergoes a review process before finalization.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div className="">
                            <FcComboChart size={35} /> 
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Charts</h3>
                            <div className="text-sm">
                                Provides visual insights into the collected data
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
