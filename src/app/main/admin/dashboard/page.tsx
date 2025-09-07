"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/page';
import WelcomeScreen from '../welcome/page';
import UserAccessChart from '../charts/userAccess';
// import AdminManagement from '../management/admins';
// import UserManagement from '../management/users';
import { fetchUsers } from '@/api/adminAPI';
import { User } from '@/types/index';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<string>('welcome');
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const fetchAllUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const usersData: User[] = await fetchUsers();
            setUsers(usersData);
        } catch (err: unknown) {
            console.error("Failed to fetch user data:", err);
            setError('Failed to fetch user data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <div className="p-8 text-center text-xl font-semibold">Loading dashboard...</div>;
        }

        if (error) {
            return <div className="p-8 text-center text-xl font-semibold text-red-500">{error}</div>;
        }

        switch (activeTab) {
            case 'welcome':
                return <WelcomeScreen />;
            case 'user-access':
                return <UserAccessChart />;
            case 'admin-management':
            // return <AdminManagement users={users} fetchUsers={fetchAllUsers} />;
            case 'user-management':
            // return <UserManagement users={users} fetchUsers={fetchAllUsers} />;
            default:
                return <WelcomeScreen />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
