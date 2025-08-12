'use client';

import { store } from '@/store/store';
import AppWrapper from '@/ui/AppWrapper';
import LoginPage from '@/ui/auth/login/LoginPage';
import { Provider } from 'react-redux';

export default function Home() {
    return (
        <LoginPage />
    );
}
