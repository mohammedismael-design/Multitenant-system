import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, Package, CreditCard, Settings } from 'lucide-react';
import { FlashMessage } from '@/components/shared/FlashMessage';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/super-admin',                label: 'Dashboard',   icon: LayoutDashboard },
    { href: '/super-admin/tenants',         label: 'Tenants',     icon: Users },
    { href: '/super-admin/modules',         label: 'Modules',     icon: Package },
    { href: '/super-admin/plans',           label: 'Plans',       icon: CreditCard },
    { href: '/super-admin/settings',        label: 'Settings',    icon: Settings },
];

interface SuperAdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function SuperAdminLayout({ children, title }: SuperAdminLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top nav */}
            <header className="sticky top-0 z-30 border-b bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    <Link href="/super-admin" className="text-lg font-bold text-primary">
                        Schoolzee Super Admin
                    </Link>
                    <nav className="hidden items-center gap-1 md:flex">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    url.startsWith(href)
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100',
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8">
                {title && (
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
                )}
                <FlashMessage />
                {children}
            </main>

            <Footer />
        </div>
    );
}
