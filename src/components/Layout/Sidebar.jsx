import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, FileText, Share2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const Sidebar = () => {
    return (
        <aside className="w-[260px] h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r fixed left-0 top-0 z-50 flex flex-col p-6">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-semibold tracking-tight">MediVault</span>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem to="/upload" icon={<Upload size={20} />} label="Upload" />
                <NavItem to="/records" icon={<FileText size={20} />} label="Records" />
                <NavItem to="/share" icon={<Share2 size={20} />} label="Share" />
            </nav>

            <div className="flex flex-col gap-4 pt-4 border-t">
                <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">John Doe</span>
                        <span className="text-xs text-muted-foreground mt-1">Patient</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            isActive ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground"
        )}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default Sidebar;
