import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Activity, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // I might need to install badge, or just use tailwind
import { cn } from '@/lib/utils';

const Dashboard = () => {
    const navigate = useNavigate();

    const recentUploads = [
        { id: 1, name: 'Blood Test Results.pdf', type: 'Lab Report', date: 'Oct 24, 2023', status: 'Processed' },
        { id: 2, name: 'Chest X-Ray.jpg', type: 'Imaging', date: 'Oct 20, 2023', status: 'Processed' },
        { id: 3, name: 'Amoxicillin Rx.pdf', type: 'Prescription', date: 'Oct 15, 2023', status: 'Processed' },
    ];

    return (
        <div className="flex flex-col gap-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Good Morning, John</h1>
                    <p className="text-muted-foreground mt-1">Here's an overview of your medical records.</p>
                </div>
                <Button onClick={() => navigate('/upload')} className="gap-2">
                    <Upload size={16} />
                    Upload Record
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<FileText size={24} />}
                    value="24"
                    label="Total Records"
                    color="bg-blue-500"
                />
                <StatCard
                    icon={<Activity size={24} />}
                    value="Healthy"
                    label="Health Status"
                    color="bg-green-500"
                />
                <StatCard
                    icon={<Calendar size={24} />}
                    value="Nov 12"
                    label="Next Appointment"
                    color="bg-orange-500"
                />
            </div>

            <section className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold tracking-tight">Recent Uploads</h2>
                    <Button variant="ghost" onClick={() => navigate('/records')}>View All</Button>
                </div>

                <div className="flex flex-col gap-3">
                    {recentUploads.map((file) => (
                        <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer border-muted">
                            <CardContent className="flex items-center gap-4 p-4">
                                <div className="w-10 h-10 rounded-md bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className="font-medium text-foreground">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">{file.type} • {file.date}</span>
                                </div>
                                <div className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                                    {file.status}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <Card>
        <CardContent className="flex items-center gap-4 p-6">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm", color)}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
        </CardContent>
    </Card>
);

export default Dashboard;
