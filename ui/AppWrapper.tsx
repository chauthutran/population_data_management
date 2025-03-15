import { useSelector } from "react-redux";
import ApprovalPage from "./approval/ApprovalPage";
import DashboardPage from "./dashboard/DashboardPage";
import PendingApprovalData from "./dashboard/PendingApprovalData";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SlideBar from "./layout/SlideBar";
import LoginPage from "./login/LoginPage";
import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { useState } from "react";
import ChartPage from "./charts/ChartPage";

export default function AppWrapper() {
    
    const { curPage } = useCurrentPage();
    const [openSlideBar, setOpenSlideBar] = useState(false);
    
    return (
        <div className="bg-white text-black min-h-screen flex flex-col">
            <Header handleOpenSlideBar={() => setOpenSlideBar(true)} />

            {curPage !== PAGE_LOGIN && <SlideBar isOpen={openSlideBar} onClose={() => setOpenSlideBar(false)} />}
                
            <main className="flex-1 overflow-y-auto">
                {curPage === PAGE_LOGIN && <LoginPage />}
                {curPage === PAGE_DASHBOARD && <DashboardPage />}
                {curPage === PAGE_DATA_ENTRY && <DashboardPage />}
                {curPage === PAGE_APPROVALS && <ApprovalPage />}
                {curPage === PAGE_CHARTS && <ChartPage />}
            </main>

            <Footer />
        </div>
    )
}