import { useCurrentPage } from "@/hooks/usePage";
import { PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY } from "@/constants";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import AppIcon from "./AppIcon";
import useClickOutside from "@/hooks/useClickOutside";

export default function SlideBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { setCurrentPage } = useCurrentPage();
    const dropdownRef = useClickOutside(() => onClose()); // Close dropdown when clicked outside
        
        
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
                    { label: "Dashboard", page: PAGE_DASHBOARD },
                    { label: "Data Entry", page: PAGE_DATA_ENTRY },
                    { label: "Approvals", page: PAGE_APPROVALS },
                    { label: "Charts", page: PAGE_CHARTS },
                ].map((item) => (
                    <li
                        key={item.page}
                        className="p-3 rounded-lg hover:bg-muted-teal transition cursor-pointer"
                        onClick={() => {setCurrentPage(item.page, item.label); onClose();}}
                    >
                        {item.label}
                    </li>
                ))}
                {/* Logout Button */}
                <li className="p-3 rounded-lg bg-red-600 hover:bg-red-700 transition cursor-pointer mt-4 text-center">
                    Logout
                </li>
            </ul>
        </aside>
    );
}