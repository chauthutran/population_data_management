import {
    PAGE_APPROVALS,
    PAGE_CHARTS,
    PAGE_DASHBOARD,
    PAGE_DATA_ENTRY,
    PAGE_FORECAST,
    PAGE_LOGIN,
} from '@/constants';
import { useCurrentPage } from '@/hooks/usePage';
import AppIcon from './AppIcon';

export default function Header({
    handleOpenSlideBar,
}: {
    handleOpenSlideBar?: () => void;
}) {
    const { setCurrentPage, curPage, title } = useCurrentPage();

    return (
        <header className="text-xl text-gray-700 flex flex-col">
            <div className="flex flex-row items-center pl-3">
                <button
                    className="text-white cursor-pointer rounded-full bg-white w-12 h-12 flex items-center justify-center"
                    onClick={handleOpenSlideBar}
                >
                    <AppIcon size={50} />
                </button>
                <div className="truncate ml-3">Population Data Management</div>

                {curPage !== PAGE_LOGIN.name && (
                    <nav className="ml-auto text-sm">
                        <ul className="flex space-x-6 py-5 mx-20">
                            <li
                                onClick={() => setCurrentPage(PAGE_DASHBOARD)}
                                className={` ${curPage === PAGE_DASHBOARD.name && 'border-b font-semibold'} text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3`}
                            >
                                {PAGE_DASHBOARD.title}
                            </li>

                            <li
                                onClick={() => setCurrentPage(PAGE_DATA_ENTRY)}
                                className={` ${curPage === PAGE_DATA_ENTRY.name && 'border-b font-semibold'} text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3`}
                            >
                                {PAGE_DATA_ENTRY.title}
                            </li>

                            <li
                                onClick={() => setCurrentPage(PAGE_APPROVALS)}
                                className={` ${curPage === PAGE_APPROVALS.name && 'border-b font-semibold'} text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3`}
                            >
                                {PAGE_APPROVALS.title}
                            </li>

                            <li
                                onClick={() => setCurrentPage(PAGE_CHARTS)}
                                className={` ${curPage === PAGE_CHARTS.name && 'border-b font-semibold'} text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3`}
                            >
                                {PAGE_CHARTS.title}
                            </li>

                            <li
                                onClick={() => setCurrentPage(PAGE_FORECAST)}
                                className={` ${curPage === PAGE_FORECAST.name && 'border-b font-semibold'} text-gray-600 hover:text-black cursor-pointer transition-transform transform hover:scale-105 hover:border-b border-gray-400 pr-3`}
                            >
                                {PAGE_FORECAST.title}
                            </li>
                        </ul>
                    </nav>
                )}
            </div>

            <hr className="w-32 border-0 h-1 bg-gradient-to-r from-blue-500 to-white" />
        </header>
    );
}
