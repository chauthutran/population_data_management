import AppIcon from './AppIcon';
import { HiDotsVertical } from 'react-icons/hi';
import NavMenu from './NavMenu';
import { usePathname } from 'next/navigation';
import { PAGE_LOGIN } from '@/constants';

export default function Header({ handleOpenSlideBar }: { handleOpenSlideBar: () => void }) {
  const pathname = usePathname();
  const hideNav = pathname === PAGE_LOGIN.name;

  return (
    <header className="text-xl text-gray-700 flex flex-col">
      <div className="flex flex-row items-center pl-3">
        <button className="flex lg:hidden" onClick={handleOpenSlideBar}>
          <HiDotsVertical />
        </button>

        <AppIcon size={50} />
        <div className="truncate ml-3">Population Data Management</div>

        {!hideNav && (
          <nav className="ml-auto text-sm hidden lg:block">
            <NavMenu direction="horizontal" />
          </nav>
        )}
      </div>

      <hr className="w-32 border-0 h-1 bg-gradient-to-r from-blue-500 to-white" />
    </header>
  );
}
