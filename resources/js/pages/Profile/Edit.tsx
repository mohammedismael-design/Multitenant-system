import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/forms/TextInput';
import type { PageProps } from '@/types';

interface ProfileUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface ProfileEditProps extends PageProps {
    user: ProfileUser;
}

export default function ProfileEdit() {
    const { user } = usePage<ProfileEditProps>().props;

    const profileForm = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone ?? '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handleProfileSubmit(e: React.FormEvent) {
        e.preventDefault();
        profileForm.patch('/profile');
    }

    function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        passwordForm.patch('/profile/password', {
            onSuccess: () => passwordForm.reset(),
        });
    }

    return (
        <AppLayout>
            <Head title="Profile" />
            <div className="space-y-6 max-w-xl">
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

                {/* Profile information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <TextInput
                                label="Full Name"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                error={profileForm.errors.name}
                                required
                            />
                            <TextInput
                                label="Email Address"
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                error={profileForm.errors.email}
                                required
                            />
                            <TextInput
                                label="Phone"
                                value={profileForm.data.phone}
                                onChange={(e) => profileForm.setData('phone', e.target.value)}
                                error={profileForm.errors.phone}
                            />
                            <Button type="submit" disabled={profileForm.processing}>
                                {profileForm.processing ? 'Saving…' : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Change password */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <TextInput
                                label="Current Password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                error={passwordForm.errors.current_password}
                                required
                            />
                            <TextInput
                                label="New Password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                error={passwordForm.errors.password}
                                required
                            />
                            <TextInput
                                label="Confirm New Password"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                error={passwordForm.errors.password_confirmation}
                                required
                            />
                            <Button type="submit" disabled={passwordForm.processing}>
                                {passwordForm.processing ? 'Updating…' : 'Update Password'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
