import { useCurrentPage } from "@/hooks/usePage";
import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_LOGIN } from "@/constants";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import AppIcon from "./AppIcon";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuth } from "@/hooks/useAuth";

export default function SlideBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { setCurrentPage } = useCurrentPage();
    const { setUser } = useAuth();
    
    const dropdownRef = useClickOutside(() => onClose()); // Close dropdown when clicked outside
        
    const handleOnLogout = () => {
        const ok = confirm("Are you sure you want to logout ?");
        if (ok) {
            setCurrentPage(PAGE_LOGIN);
            setUser(null);
        }
    }
    
    return (
        <aside
            className={`fixed left-0 top-0 h-screen z-50 w-64 bg-deep-green shadow-lg p-5 flex flex-col text-white transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            ref={dropdownRef}
        >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-6">
                <AppIcon size={32} />
                <button onClick={onClose} className="text-2xl hover:text-gray-300 transition">
                    <MdKeyboardDoubleArrowLeft />
                </button>
            </div>

            {/* Menu List */}
            <ul className="space-y-2">
                {[
                    PAGE_DASHBOARD,
                    PAGE_DATA_ENTRY,
                    PAGE_APPROVALS,
                    PAGE_CHARTS,
                ].map((item) => (
                    <li
                        key={item.name}
                        className="p-3 rounded-lg hover:bg-muted-teal transition cursor-pointer"
                        onClick={() => {setCurrentPage(item); onClose();}}
                    >
                        {item.icon} {item.title}
                    </li>
                ))}
                {/* Logout Button */}
                <li 
                    className="p-3 rounded-lg bg-red-600 hover:bg-red-700 transition cursor-pointer mt-4 text-center"
                    onClick={() => handleOnLogout()}
                >
                    🔓 Logout
                </li>
            </ul>
        </aside>
    );
}