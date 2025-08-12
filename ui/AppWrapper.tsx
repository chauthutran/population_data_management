'use client';

import Footer from './layout/Footer';
import Header from './layout/Header';
import SlideBar from './layout/SlideBar';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function AppWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [openSlideBar, setOpenSlideBar] = useState(false);

    // Hide sliderBar in LoginPage route
    const hideSidebar = pathname === '/';
    return (
        <Provider store={store}>
            <div className="flex flex-col h-screen">
                <Header handleOpenSlideBar={() => setOpenSlideBar(true)} />
                
                {!hideSidebar && (
                    <SlideBar
                        isOpen={openSlideBar}
                        onClose={() => setOpenSlideBar(false)}
                    />
                )}
                <main className="flex-1 overflow-y-auto flex flex-col">{children}</main>
                {/* <main>{children}</main> */}
                
                <Footer />
            </div>
        </Provider>
    );
}