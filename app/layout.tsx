import type { Metadata } from 'next';
import './globals.css';
// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
import AppWrapper from '@/ui/AppWrapper';

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
                    {/* <div className={`antialiased`}>{children}</div> */}
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}
