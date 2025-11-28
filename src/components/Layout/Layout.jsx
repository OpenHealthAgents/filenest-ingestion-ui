import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-background font-sans antialiased">
            <Sidebar />
            <main className="flex-1 ml-[260px] p-8 max-w-[1600px] animate-in fade-in duration-500">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
