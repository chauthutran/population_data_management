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
        <div className="bg-[#E5F0F7] text-[#2C3E50]">
            <Header />
            
            <div className="flex">
                <SlideBar />
                
                <main className="w-3/4 p-6">
                    <ApprovalPage />
{/*                     
                    <form class="mt-6 p-4 bg-white shadow rounded flex items-center gap-4">
                <label class="block">Selection:</label>
                <select class="p-2 border rounded bg-[#CE8774] text-white">
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="p-2 border rounded bg-[#CE8774] text-white">
                    <option>Dropdown 1</option>
                    <option>Dropdown 2</option>
                </select>
                <button class="p-2 bg-[#417D7A] text-white rounded hover:bg-[#2A4D69]">Search</button>
            </form> */}
                </main>
            </div>
            
            <footer className="bg-[#2A4D69] text-white text-center p-4 mt-6">
                Website Footer
            </footer>
        </div>


        // <>
        //     <DashboardPage />
        //     {/* {curPage == PAGE_LOGIN && <LoginPage />}
        //     {curPage == PAGE_DASHBOARD && <DashboardPage />}
        //     {curPage == PAGE_APPROVAL && <ApprovalPage />} */}
        // </>
    )
}