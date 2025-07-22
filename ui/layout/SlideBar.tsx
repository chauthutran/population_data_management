import { useCurrentPage } from '@/hooks/usePage';
import {
    PAGE_ABOUT_US,
    PAGE_APPROVALS,
    PAGE_CHARTS,
    PAGE_DASHBOARD,
    PAGE_DATA_ENTRY,
    PAGE_FORECAST,
    PAGE_LOGIN,
} from '@/constants';
import { MdDashboard, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import AppIcon from './AppIcon';
import useClickOutside from '@/hooks/useClickOutside';
import { useAuth } from '@/hooks/useAuth';
import { FcApproval, FcComboChart, FcDataSheet } from 'react-icons/fc';

// Map of icon names to components
export const ICON_MAP = {
    FcDataSheet,
    FcApproval,
    FcComboChart,
    MdDashboard,
} as const; // Ensures these are treated as a fixed object;

export default function SlideBar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { setCurrentPage } = useCurrentPage();
    const { setUser } = useAuth();

    const dropdownRef = useClickOutside(() => onClose()); // Close dropdown when clicked outside

    const handleOnLogout = () => {
        const ok = confirm('Are you sure you want to logout ?');
        if (ok) {
            setCurrentPage(PAGE_LOGIN);
            setUser(null);
            onClose();
        }
    };

    return (
        <aside
            className={`flex lg:hidden drop-shadow-2xl fixed left-0 top-0 h-screen z-50 w-64 bg-gray-50 shadow-lg p-5 flex-col text-black transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            ref={dropdownRef}
        >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-6">
                <AppIcon size={45} />
                <button
                    onClick={onClose}
                    className="text-2xl hover:text-gray-300 transition"
                >
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
                    PAGE_FORECAST,
                    PAGE_ABOUT_US,
                ].map((item) => {
                    const IconComponent =
                        ICON_MAP[item.icon as keyof typeof ICON_MAP]; // Get the actual component

                    return (
                        <li
                            key={item.name}
                            className="p-3 flex items-center space-x-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            onClick={() => {
                                setCurrentPage(item);
                                onClose();
                            }}
                        >
                            <div>{IconComponent && <IconComponent />}</div>
                            <div>{item.title}</div>
                        </li>
                    );
                })}
                {/* Logout Button */}
                <li
                    className="p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer mt-4 text-center"
                    onClick={() => handleOnLogout()}
                >
                    🔓 Logout
                </li>
            </ul>
        </aside>
    );
}
