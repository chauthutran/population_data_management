import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_INTRO, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import AppIcon from "./AppIcon";
import { useAuth } from "@/hooks/useAuth";

export default function Header ({ handleOpenSlideBar } : { handleOpenSlideBar?: () => void}) {
    
    const { setCurrentPage, curPage, title } = useCurrentPage();
    
    return (
        <>
            {curPage === PAGE_INTRO.name && (
                <header className="text-xl text-gray-700 font-bold flex flex-col">
                    <div className="flex items-center space-x-3 pl-3">
                        <AppIcon size={50} />
                        <div className="truncate">Population Data Management</div>
                    </div>
                    <hr className="w-32 border-0 h-1 bg-gradient-to-r from-blue-500 to-white" />
                </header>
            )}
                        
            {curPage !== PAGE_INTRO.name && <header className="bg-blue-100 text-black shadow-lg flex pl-3 py-3 items-center">
                <button 
                    className="text-white cursor-pointer rounded-full bg-white w-12 h-12 flex items-center justify-center"
                    onClick={handleOpenSlideBar}>
                     <AppIcon size={35} />
                </button>
                
                <h1 className="flex text-2xl font-bold text-black px-4 py-4 space-x-3">
                    <div>Population Data Management</div>
                    <div>-</div>
                    <div>{title}</div>
                </h1>
                
                <nav className="bg-black black-bg ml-auto">
                    <ul className="flex space-x-6 py-5 mx-20">
                        {curPage !== PAGE_DASHBOARD.name && <li
                            onClick={() => setCurrentPage(PAGE_DASHBOARD)}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                            style={{ textTransform: "uppercase"}}
                        >{PAGE_DASHBOARD.title}</li>}
                        
                        {curPage !== PAGE_DATA_ENTRY.name && <li
                            onClick={() => setCurrentPage(PAGE_DATA_ENTRY)}
                            style={{ textTransform: "uppercase"}}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                        >{PAGE_DATA_ENTRY.title}</li>}
                        
                        {curPage !== PAGE_APPROVALS.name && <li
                            onClick={() => setCurrentPage(PAGE_APPROVALS)}
                            style={{ textTransform: "uppercase"}}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                        >{PAGE_APPROVALS.title}</li>}
                        
                        {curPage !== PAGE_CHARTS.name && <li
                            onClick={() => setCurrentPage(PAGE_CHARTS)}
                            style={{ textTransform: "uppercase"}}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                        >{PAGE_CHARTS.title}</li>}
                    </ul>
                </nav>
            </header>}
        </>
        
    )
}