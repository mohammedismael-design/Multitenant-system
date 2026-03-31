import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/forms/TextInput';
import { SelectInput } from '@/components/forms/SelectInput';
import type { PageProps, SubscriptionPlan, SelectOption } from '@/types';

interface CreateTenantProps extends PageProps {
    plans: SubscriptionPlan[];
}

const tenantTypes: SelectOption[] = [
    { value: 'school',   label: 'School' },
    { value: 'business', label: 'Business' },
    { value: 'ngo',      label: 'NGO' },
    { value: 'church',   label: 'Church' },
];

export default function CreateTenant() {
    const { plans } = usePage<CreateTenantProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'school',
        email: '',
        phone: '',
        subscription_plan_id: '',
    });

    const planOptions: SelectOption[] = (plans ?? []).map((p) => ({
        value: String(p.id),
        label: p.name,
    }));

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/super-admin/tenants');
    }

    return (
        <SuperAdminLayout title="New Tenant">
            <Head title="New Tenant" />
            <Card className="max-w-xl">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput label="Tenant Name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required />
                        <SelectInput label="Type" options={tenantTypes} value={data.type} onChange={(v) => setData('type', v)} error={errors.type} required />
                        <TextInput label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                        <TextInput label="Phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={errors.phone} />
                        <SelectInput label="Subscription Plan" options={planOptions} value={data.subscription_plan_id} onChange={(v) => setData('subscription_plan_id', v)} error={errors.subscription_plan_id} placeholder="Select a plan" />
                        <div className="flex gap-3">
                            <Button type="submit" disabled={processing}>{processing ? 'Creating…' : 'Create Tenant'}</Button>
                            <Button type="button" variant="outline" onClick={() => history.back()}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </SuperAdminLayout>
    );
}
