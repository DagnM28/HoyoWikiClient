"use client";

import React from 'react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
            <div className="flex items-center justify-center">
                <span className="text-2xl font-bold">Admin Dashboard</span>
            </div>
            <nav className="space-y-4">
                <h3 className="text-sm uppercase tracking-wide text-gray-400">Sections</h3>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onTabChange('welcome')}
                            className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200
                                ${activeTab === 'welcome' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                        >
                            Welcome
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onTabChange('user-access')}
                            className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200
                                ${activeTab === 'user-access' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                        >
                            User Access Chart
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onTabChange('admin-management')}
                            className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200
                                ${activeTab === 'admin-management' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                        >
                            Admin Management
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onTabChange('user-management')}
                            className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200
                                ${activeTab === 'user-management' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                        >
                            User Management
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
