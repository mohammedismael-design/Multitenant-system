import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import type { Module, PageProps, PaginatedData } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Switch } from '@radix-ui/react-switch';

interface ModulesIndexProps extends PageProps {
    modules: Module[];
}

export default function ModulesIndex() {
    const { modules } = usePage<ModulesIndexProps>().props;

    const columns: ColumnDef<Module>[] = [
        { accessorKey: 'name',        header: 'Name' },
        { accessorKey: 'key',         header: 'Key' },
        { accessorKey: 'description', header: 'Description' },
        {
            accessorKey: 'allowed_tenant_types',
            header: 'Allowed Types',
            cell: ({ getValue }) => (
                <div className="flex flex-wrap gap-1">
                    {(getValue() as string[]).map((t) => (
                        <span key={t} className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">{t}</span>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'is_core',
            header: 'Core',
            cell: ({ getValue }) => getValue() ? <span className="text-xs font-medium text-purple-700">Core</span> : null,
        },
        {
            accessorKey: 'is_active',
            header: 'Active',
            cell: ({ row }) => (
                <button
                    onClick={() => router.patch(`/super-admin/modules/${row.original.id}/toggle`)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${row.original.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${row.original.is_active ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
            ),
        },
    ];

    return (
        <SuperAdminLayout title="Modules">
            <Head title="Modules" />
            <DataTable columns={columns} data={modules ?? []} searchable searchPlaceholder="Search modules…" />
        </SuperAdminLayout>
    );
}
