import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';
import { Edit } from 'lucide-react';
import type { Tenant, PageProps } from '@/types';

interface ShowTenantProps extends PageProps {
    tenant: Tenant;
}

export default function ShowTenant() {
    const { tenant } = usePage<ShowTenantProps>().props;

    return (
        <SuperAdminLayout title={tenant.name}>
            <Head title={tenant.name} />
            <div className="flex justify-end mb-4">
                <Link href={`/super-admin/tenants/${tenant.id}/edit`}>
                    <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>General</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <Row label="Name"     value={tenant.name} />
                        <Row label="Slug"     value={tenant.slug} />
                        <Row label="Type"     value={tenant.type} />
                        <Row label="Email"    value={tenant.email} />
                        <Row label="Phone"    value={tenant.phone} />
                        <Row label="Status"   value={tenant.status} />
                        <Row label="Created"  value={formatDate(tenant.created_at)} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <Row label="Plan"     value={String(tenant.subscription_plan_id ?? '—')} />
                        <Row label="Status"   value={tenant.subscription_status} />
                        <Row label="Start"    value={formatDate(tenant.subscription_start_date)} />
                        <Row label="End"      value={formatDate(tenant.subscription_end_date)} />
                        <Row label="Cycle"    value={tenant.billing_cycle ?? '—'} />
                        <Row label="Max Users"     value={String(tenant.max_users)} />
                        <Row label="Max Storage"   value={`${tenant.max_storage_mb} MB`} />
                    </CardContent>
                </Card>
            </div>
        </SuperAdminLayout>
    );
}

function Row({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="flex gap-2">
            <span className="w-32 shrink-0 font-medium text-gray-500">{label}</span>
            <span className="text-gray-900">{value ?? '—'}</span>
        </div>
    );
}
