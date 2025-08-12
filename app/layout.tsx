import type { Metadata } from 'next';
import './globals.css';
// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
import AppWrapper from '@/ui/AppWrapper';
import RouterLoader from '@/ui/RouteLoader';

export const metadata: Metadata = {
    title: 'Population Data Management',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppWrapper>
                    <RouterLoader />
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}
