import { PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import Image from "next/image";
import { FcApproval, FcComboChart, FcDataSheet } from "react-icons/fc";
import AppDetailsIntro from "./layout/AppDetailsIntro";

export default function HomePage() {
    
    const { setCurrentPage } = useCurrentPage();
    
    return (
        <>
            <div className="flex flex-row items-start w-full h-full space-x-10 my-10">
                <div className="flex-1 flex-col space-y-5 mx-5">
                    <div className="text-left">
                        The Population Data Management Application is a powerful and user-friendly platform designed to help organizations collect, manage, and visualize population-related data efficiently.
                        <br />
                        Whether you're tracking demographics, conducting surveys, or analyzing trends, this application provides a seamless workflow from data entry to advanced analytics.
                    </div>
                    <div>
                        <button 
                            className="shadow-lg mt-3 hover:shadow-gray-400 px-3 py-2 bg-blue-400 font-semibold rounded-lg transition-transform transform hover:scale-105"
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
                    <AppDetailsIntro />
                </div>
            </div>

        </>
    )
}
