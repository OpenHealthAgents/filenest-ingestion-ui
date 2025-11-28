import React, { useState } from 'react';
import { Share2, UserPlus, Link, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Using badge style classes if component not installed, or I'll just use tailwind classes
import { cn } from '@/lib/utils';

const Share = () => {
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText('https://medivault.app/share/x8d9s0');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        setEmail('');
        alert('Invitation sent!');
    };

    const sharedUsers = [
        { id: 1, name: 'Dr. Sarah Smith', email: 'dr.smith@clinic.com', role: 'Viewer', status: 'Active' },
        { id: 2, name: 'Dr. James Jones', email: 'dr.jones@hospital.org', role: 'Viewer', status: 'Pending' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Share Records</h1>
                <p className="text-muted-foreground mt-1">Manage access to your medical history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                <UserPlus size={24} />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Invite Doctor</CardTitle>
                                <CardDescription>Send an invitation to view your records.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleInvite} className="flex gap-2">
                                <Input
                                    placeholder="Enter doctor's email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={!email}>Send Invite</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                <Link size={24} />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Get Share Link</CardTitle>
                                <CardDescription>Create a temporary link to share specific records.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 p-1 border rounded-md bg-muted/50">
                                <input
                                    type="text"
                                    readOnly
                                    value="https://medivault.app/share/x8d9s0"
                                    className="flex-1 bg-transparent border-none px-3 text-sm text-muted-foreground focus:outline-none"
                                />
                                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
                                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 ml-1">Link expires in 7 days.</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Who has access</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            {sharedUsers.map(user => (
                                <div key={user.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                                            user.status === 'Active' ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"
                                        )}>
                                            {user.status}
                                        </span>
                                        <Select defaultValue={user.role.toLowerCase()}>
                                            <SelectTrigger className="h-7 text-xs w-[90px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="viewer">Viewer</SelectItem>
                                                <SelectItem value="remove" className="text-destructive">Remove</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Share;
