import React from 'react';

interface AppLayoutProps { children: React.ReactNode; }

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className="w-64 bg-gray-900 text-white min-h-screen">
                    <div className="p-4"><h1 className="text-xl font-bold">Feeyangu</h1></div>
                </aside>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
