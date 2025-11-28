import React, { useState } from 'react';
import { FileText, Search, Filter, MoreVertical, Download, Share2, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

const Records = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const records = [
        { id: 1, name: 'Blood Test Results.pdf', type: 'Lab Report', date: '2023-10-24', doctor: 'Dr. Smith', size: '2.4 MB' },
        { id: 2, name: 'Chest X-Ray.jpg', type: 'Imaging', date: '2023-10-20', doctor: 'Dr. Jones', size: '15.8 MB' },
        { id: 3, name: 'Amoxicillin Rx.pdf', type: 'Prescription', date: '2023-10-15', doctor: 'Dr. Smith', size: '0.5 MB' },
        { id: 4, name: 'MRI Scan.zip', type: 'Imaging', date: '2023-09-12', doctor: 'Dr. Brown', size: '124.0 MB' },
        { id: 5, name: 'Annual Physical.pdf', type: 'Lab Report', date: '2023-08-05', doctor: 'Dr. Smith', size: '3.1 MB' },
        { id: 6, name: 'Vaccination Record.pdf', type: 'Other', date: '2023-01-10', doctor: 'Clinic', size: '1.2 MB' },
    ];

    const filteredRecords = records.filter(record => {
        const matchesFilter = filter === 'all' || record.type.toLowerCase().includes(filter);
        const matchesSearch = record.name.toLowerCase().includes(search.toLowerCase()) ||
            record.doctor.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
                <p className="text-muted-foreground mt-1">Manage and view your medical history.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search records..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex bg-muted p-1 rounded-lg w-full md:w-auto overflow-x-auto">
                    {['all', 'prescription', 'lab', 'imaging'].map((tab) => (
                        <button
                            key={tab}
                            className={cn(
                                "px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize whitespace-nowrap",
                                filter === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setFilter(tab)}
                        >
                            {tab === 'all' ? 'All Records' : tab + 's'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                        <Card key={record.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                                    <FileText size={24} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base truncate">{record.name}</h3>
                                    <p className="text-sm text-muted-foreground">{record.type} • {record.size}</p>
                                </div>

                                <div className="flex flex-1 gap-8 w-full md:w-auto justify-between md:justify-start">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Date</span>
                                        <span className="text-sm font-medium">{record.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Doctor</span>
                                        <span className="text-sm font-medium">{record.doctor}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
                                    <Button variant="ghost" size="icon" title="Share">
                                        <Share2 size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Download">
                                        <Download size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete">
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                        <p>No records found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Records;
