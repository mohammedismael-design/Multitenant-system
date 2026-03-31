import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import type { PageProps } from '@/types';

export function useSubscriptionLimits() {
    const { tenant } = usePage<PageProps>().props;

    return useMemo(() => {
        if (!tenant) {
            return {
                maxUsers: 0,
                maxStorageMb: 0,
                isTrialing: false,
                isActive: false,
            };
        }

        const full = tenant as unknown as {
            max_users?: number;
            max_storage_mb?: number;
            subscription_status?: string;
            status?: string;
        };

        return {
            maxUsers: full.max_users ?? 0,
            maxStorageMb: full.max_storage_mb ?? 0,
            isTrialing: full.subscription_status === 'trial',
            isActive: full.status === 'active',
        };
    }, [tenant]);
}
