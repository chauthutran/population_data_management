import { useSelector } from "react-redux";
import ApprovalPage from "./approval/ApprovalPage";
import DashboardPage from "./dashboard/DashboardPage";
import PendingApprovalData from "./dashboard/PendingApprovalData";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SlideBar from "./layout/SlideBar";
import LoginPage from "./login/LoginPage";
import { PAGE_APPROVALS, PAGE_CHARTS_AND_REPORTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { useState } from "react";
import ChartPage from "./charts/ChartPage";
import DataEntryPage from "./dataEntry/DataEntryPage";

export default function AppWrapper() {
    
    const { curPage } = useCurrentPage();
    const [openSlideBar, setOpenSlideBar] = useState(false);
    
    return (
        // <div className="bg-white text-black h-screen flex flex-col">
        <div className="flex flex-col h-screen">
            <Header handleOpenSlideBar={() => setOpenSlideBar(true)} />

            {curPage !== PAGE_LOGIN.name && <SlideBar isOpen={openSlideBar} onClose={() => setOpenSlideBar(false)} />}
                
            <main className="flex-1 overflow-y-auto">
                {curPage === PAGE_LOGIN.name && <LoginPage />}
                {curPage === PAGE_DASHBOARD.name && <DashboardPage />}
                {curPage === PAGE_DATA_ENTRY.name && <DataEntryPage />}
                {curPage === PAGE_APPROVALS.name && <ApprovalPage />}
                {curPage === PAGE_CHARTS_AND_REPORTS.name && <ChartPage />}
            </main>

            <Footer />
        </div>
    )
}