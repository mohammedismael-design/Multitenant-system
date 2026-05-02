import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenant } from '@/hooks/useTenant';
import { useModuleAccess } from '@/hooks/useModuleAccess';
import { usePermissions } from '@/hooks/usePermissions';

export default function Dashboard() {
    const tenant = useTenant();
    const { enabledModules } = useModuleAccess();
    const { permissions } = usePermissions();

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome to {tenant?.name ?? 'Schoolzee'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {enabledModules.length} module{enabledModules.length !== 1 ? 's' : ''} enabled
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {enabledModules.map((key) => (
                        <Card key={key}>
                            <CardHeader>
                                <CardTitle className="capitalize text-sm font-medium">{key}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Module is active</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
