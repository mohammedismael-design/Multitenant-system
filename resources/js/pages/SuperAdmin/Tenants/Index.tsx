import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import type { Tenant, PageProps, PaginatedData } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

interface TenantsIndexProps extends PageProps {
    tenants: PaginatedData<Tenant>;
}

export default function TenantsIndex() {
    const { tenants } = usePage<TenantsIndexProps>().props;
    const [deleteTarget, setDeleteTarget] = useState<Tenant | null>(null);

    const columns: ColumnDef<Tenant>[] = [
        { accessorKey: 'name',   header: 'Name' },
        { accessorKey: 'slug',   header: 'Subdomain' },
        { accessorKey: 'type',   header: 'Type' },
        { accessorKey: 'status', header: 'Status',
            cell: ({ row }) => (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    row.original.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                }`}>
                    {row.original.status}
                </span>
            ),
        },
        { accessorKey: 'subscription_status', header: 'Subscription' },
        { accessorKey: 'created_at', header: 'Created', cell: ({ getValue }) => formatDate(getValue() as string) },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Link href={`/super-admin/tenants/${row.original.id}`}>
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Link href={`/super-admin/tenants/${row.original.id}/edit`}>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row.original)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <SuperAdminLayout title="Tenants">
            <Head title="Tenants" />
            <div className="flex justify-end mb-4">
                <Link href="/super-admin/tenants/create">
                    <Button><Plus className="mr-2 h-4 w-4" /> New Tenant</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={tenants?.data ?? []} searchable searchPlaceholder="Search tenants…" />

            <ConfirmationDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                title={`Delete ${deleteTarget?.name}?`}
                description="This will soft-delete the tenant. All data is preserved."
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    if (deleteTarget) {
                        router.delete(`/super-admin/tenants/${deleteTarget.id}`, {
                            onFinish: () => setDeleteTarget(null),
                        });
                    }
                }}
            />
        </SuperAdminLayout>
    );
}
