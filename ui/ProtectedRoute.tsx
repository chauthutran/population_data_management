import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { curUser } = useAuth();

    useEffect(() => {
        if (!curUser) {
            router.replace('/'); // redirect if NOT logged in
        }
    }, [curUser, router]);

    if (!curUser) {
        return null;
    }

    return <>{children}</>;
}
