import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import AppIcon from "./AppIcon";

export default function Header ({ handleOpenSlideBar } : { handleOpenSlideBar: () => void}) {
    
    const { setCurrentPage, curPage, title } = useCurrentPage();
    
    return (
        <>
            {curPage === PAGE_LOGIN && (
                <header className="bg-lemon-green text-4xl text-black font-bold p-7 flex items-center justify-center space-x-8">
                    <AppIcon size={65} />
                    <div className="truncate">Population Data Management</div>
                </header>
            )}
                        
            {curPage !== PAGE_LOGIN && <header className="bg-lemon-green text-black shadow-lg flex pl-3 py-3 items-center">
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
                        <li
                            onClick={() => setCurrentPage(PAGE_DASHBOARD, "Dashboard")}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                            style={{ textTransform: "uppercase"}}
                        >Dashboard</li>
                        <li
                            onClick={() => setCurrentPage(PAGE_APPROVALS, "Approvals")}
                            style={{ textTransform: "uppercase"}}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                        >Approvals</li>
                        <li
                            onClick={() => setCurrentPage(PAGE_CHARTS, "Charts")}
                            style={{ textTransform: "uppercase"}}
                            className="text-lemon-lime hover:text-white cursor-pointer"
                        >Charts</li>
                    </ul>
                </nav>
            </header>}
        </>
        
    )
}