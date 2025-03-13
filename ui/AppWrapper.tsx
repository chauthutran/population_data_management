import { useSelector } from "react-redux";
import ApprovalPage from "./approval/ApprovalPage";
import DashboardPage from "./dashboard/DashboardPage";
import PendingApprovalData from "./dashboard/PendingApprovalData";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SlideBar from "./layout/SlideBar";
import LoginPage from "./login/LoginPage";
import { RootState } from "@/store/store";
import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function AppWrapper() {
    
    const { curPage } = useCurrentPage();
    const [openSlideBar, setOpenSlideBar] = useState(false);
    
    return (
        <div className="bg-white text-rich-navy">
            <Header handleOpenSlideBar={() => setOpenSlideBar(true)} />

            <div className="flex flex-grow">
                {curPage !== PAGE_LOGIN && <SlideBar isOpen={openSlideBar} onClose={() => setOpenSlideBar(false)} />}
                
                <main className="w-full">
                    {curPage === PAGE_LOGIN && <LoginPage />}
                    {curPage === PAGE_DASHBOARD && <DashboardPage />}
                    {curPage === PAGE_DATA_ENTRY && <DashboardPage />}
                    {curPage === PAGE_APPROVALS && <ApprovalPage />}
                    {curPage === PAGE_CHARTS && <ApprovalPage />}
                </main>
            </div>

            <Footer />
        </div>
    )
}