import {
    PAGE_ABOUT_US,
    PAGE_APPROVALS,
    PAGE_CHARTS,
    PAGE_DASHBOARD,
    PAGE_DATA_ENTRY,
    PAGE_FORECAST,
    PAGE_LOGIN,
} from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { JSONObject } from '@/types/definations';
import { usePathname, useRouter } from 'next/navigation';
import { FcApproval, FcComboChart, FcDataSheet } from 'react-icons/fc';
import { MdDashboard, MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const PAGES = [
    PAGE_DASHBOARD,
    PAGE_DATA_ENTRY,
    PAGE_APPROVALS,
    PAGE_CHARTS,
    PAGE_FORECAST,
    PAGE_ABOUT_US,
];

const PAGE_PATH = {
    [PAGE_DASHBOARD.name]: '/dashboard',
    [PAGE_DATA_ENTRY.name]: '/data-entry',
    [PAGE_APPROVALS.name]: '/approvals',
    [PAGE_CHARTS.name]: '/charts',
    [PAGE_FORECAST.name]: '/forecast',
    [PAGE_ABOUT_US.name]: '/about-us',
    [PAGE_LOGIN.name]: '/',
};

const ICON_MAP = {
    FcDataSheet,
    FcApproval,
    FcComboChart,
    MdDashboard,
} as const; // Ensures these are treated as a fixed object;

export default function NavMenu({
    direction = 'horizontal', // 'horizontal' for header, 'vertical' for sidebar
    onNavigate,
    onClose,
}: {
    direction?: 'horizontal' | 'vertical';
    onNavigate?: () => void; // optional extra callback (like closing sidebar)
    onClose?: () => void; // alias for backwards compatibility
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { setUser } = useAuth();

    const isActive = (pageName: string) => pathname === PAGE_PATH[pageName];

    const handleNavigate = (pageName: string) => {
        router.push(PAGE_PATH[pageName]);
        if (onNavigate) onNavigate();
        if (onClose) onClose();
    };

    const handleOnLogout = () => {
        const ok = confirm('Are you sure you want to logout ?');
        if (ok) {
            router.push('/');
            setUser(null);
        }
    };

    return (
        <ul
            className={
                direction === 'horizontal' ? 'flex space-x-6 py-5' : 'space-y-2'
            }
        >
            {PAGES.map((page: JSONObject) => {
                const IconComponent =
                    ICON_MAP[page.icon as keyof typeof ICON_MAP];
                return (
                    <li
                        key={page.name}
                        onClick={() => handleNavigate(page.name)}
                        className={`cursor-pointer transition ${
                            direction === 'horizontal'
                                ? `${isActive(page.name) ? 'border-b font-semibold' : ''} text-gray-600 hover:text-black hover:border-b border-gray-400 pr-3 transform hover:scale-105`
                                : 'p-3 flex items-center space-x-2 rounded-lg hover:bg-gray-300'
                        }`}
                    >
                        {direction === 'vertical' && IconComponent && (
                            <IconComponent />
                        )}
                        <span>{page.title}</span>
                    </li>
                );
            })}

            {/* Logout */}
            <li
                onClick={handleOnLogout}
                className={
                    direction === 'horizontal'
                        ? 'text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3'
                        : 'p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 text-center cursor-pointer mt-4'
                }
            >
                {direction === 'vertical' ? '🔓 Logout' : 'Logout'}
            </li>
        </ul>
    );
}
