import { useSelector } from "react-redux";
import ApprovalPage from "./approval/ApprovalPage";
import DashboardPage from "./dashboard/DashboardPage";
import PendingApprovalData from "./dashboard/PendingApprovalData";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SlideBar from "./layout/SlideBar";
import LoginPage from "./login/LoginPage";
import { RootState } from "@/store/store";
import { PAGE_APPROVAL, PAGE_DASHBOARD, PAGE_LOGIN } from "@/constants";

export default function () {
    
    const curPage  = useSelector((state: RootState) => state.currentPage.curPage);
    
    return (
        <>
            <ApprovalPage />
            {/* {curPage == PAGE_LOGIN && <LoginPage />}
            {curPage == PAGE_DASHBOARD && <DashboardPage />}
            {curPage == PAGE_APPROVAL && <ApprovalPage />} */}
        </>
    )
}