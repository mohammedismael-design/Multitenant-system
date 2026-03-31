import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, CreditCard, Building2 } from 'lucide-react';
import type { PageProps } from '@/types';

interface SuperAdminDashboardProps extends PageProps {
    stats: {
        total_tenants: number;
        active_tenants: number;
        total_modules: number;
        active_plans: number;
    };
}

export default function SuperAdminDashboard() {
    const { stats } = usePage<SuperAdminDashboardProps>().props;

    const cards = [
        { label: 'Total Tenants',  value: stats?.total_tenants  ?? 0, icon: Building2,  color: 'text-blue-600' },
        { label: 'Active Tenants', value: stats?.active_tenants ?? 0, icon: Users,       color: 'text-green-600' },
        { label: 'Modules',        value: stats?.total_modules  ?? 0, icon: Package,     color: 'text-purple-600' },
        { label: 'Plans',          value: stats?.active_plans   ?? 0, icon: CreditCard,  color: 'text-yellow-600' },
    ];

    return (
        <SuperAdminLayout title="Dashboard">
            <Head title="Super Admin Dashboard" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map(({ label, value, icon: Icon, color }) => (
                    <Card key={label}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                            <Icon className={`h-5 w-5 ${color}`} />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </SuperAdminLayout>
    );
}
