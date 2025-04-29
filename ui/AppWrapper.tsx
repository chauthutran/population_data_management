import ApprovalPage from "./approval/ApprovalPage";
import DashboardPage from "./dashboard/DashboardPage";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SlideBar from "./layout/SlideBar";
import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_LOGIN } from "@/constants";
import { useCurrentPage } from "@/hooks/usePage";
import { useState } from "react";
import ChartPage from "./charts/ChartPage";
import DataEntryPage from "./dataEntry/DataEntryPage";
import LoginPage from "./auth/login/LoginPage";

export default function AppWrapper() {
    
    const { curPage } = useCurrentPage();
    const [openSlideBar, setOpenSlideBar] = useState(false);
    
    return (
        <div className="flex flex-col h-screen">
            
            <Header handleOpenSlideBar={() => setOpenSlideBar(true)} />

            {curPage !== PAGE_LOGIN.name && <SlideBar isOpen={openSlideBar} onClose={() => setOpenSlideBar(false)} />}
                
            <main className="flex-1 overflow-y-auto flex">
                {curPage === PAGE_LOGIN.name && <LoginPage />}
                {curPage === PAGE_DASHBOARD.name && <DashboardPage />}
                {curPage === PAGE_DATA_ENTRY.name && <DataEntryPage />}
                {curPage === PAGE_APPROVALS.name && <ApprovalPage />}
                {curPage === PAGE_CHARTS.name && <ChartPage />}
            </main>

            <Footer />
        </div>
    )
}