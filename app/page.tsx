'use client';

import { store } from '@/store/store';
import AppWrapper from '@/ui/AppWrapper';
import { Provider } from 'react-redux';

export default function Home() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}
