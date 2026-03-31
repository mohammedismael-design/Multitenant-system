import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/forms/TextInput';
import { SelectInput } from '@/components/forms/SelectInput';
import type { Tenant, PageProps, SelectOption } from '@/types';

interface EditTenantProps extends PageProps {
    tenant: Tenant;
}

const tenantTypes: SelectOption[] = [
    { value: 'school', label: 'School' },
    { value: 'business', label: 'Business' },
    { value: 'ngo', label: 'NGO' },
    { value: 'church', label: 'Church' },
];

const statuses: SelectOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
];

export default function EditTenant() {
    const { tenant } = usePage<EditTenantProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: tenant.name,
        type: tenant.type,
        email: tenant.email ?? '',
        phone: tenant.phone ?? '',
        status: tenant.status,
        primary_color: tenant.primary_color,
        secondary_color: tenant.secondary_color,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/super-admin/tenants/${tenant.id}`);
    }

    return (
        <SuperAdminLayout title={`Edit ${tenant.name}`}>
            <Head title={`Edit ${tenant.name}`} />
            <Card className="max-w-xl">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput label="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required />
                        <SelectInput label="Type" options={tenantTypes} value={data.type} onChange={(v) => setData('type', v)} error={errors.type} />
                        <SelectInput label="Status" options={statuses} value={data.status} onChange={(v) => setData('status', v as import('@/types').TenantStatus)} error={errors.status} />
                        <TextInput label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                        <TextInput label="Phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={errors.phone} />
                        <div className="flex gap-3">
                            <Button type="submit" disabled={processing}>{processing ? 'Saving…' : 'Save Changes'}</Button>
                            <Button type="button" variant="outline" onClick={() => history.back()}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </SuperAdminLayout>
    );
}
