import React from 'react';
import AppLayout from '@/layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to Feeyangu</p>
            </div>
        </AppLayout>
    );
}
