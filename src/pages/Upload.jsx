import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

const Upload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        setFile(null);
        setSuccess(false);
        setProgress(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        // Simulate upload
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                setSuccess(true);
            }
        }, 200);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Upload Record</h1>
                <p className="text-muted-foreground mt-1">Add new medical records to your vault.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
                <Card className="min-h-[400px] flex flex-col justify-center">
                    <CardContent className="p-6 h-full flex flex-col">
                        {!file ? (
                            <div
                                className={cn(
                                    "flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors bg-muted/30",
                                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                                    <UploadIcon size={32} />
                                </div>
                                <h3 className="text-lg font-semibold mb-1">Drag and drop your file here</h3>
                                <p className="text-muted-foreground mb-4">or</p>
                                <Button onClick={onButtonClick} variant="secondary">Browse Files</Button>
                                <p className="text-xs text-muted-foreground mt-4">Supports PDF, JPG, PNG up to 10MB</p>
                            </div>
                        ) : (
                            <div className="w-full space-y-6">
                                <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                                    <div className="w-14 h-14 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
                                        <FileText size={28} />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-semibold truncate">{file.name}</h4>
                                        <span className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                    {!uploading && !success && (
                                        <Button variant="ghost" size="icon" onClick={removeFile} className="text-muted-foreground hover:text-destructive">
                                            <X size={20} />
                                        </Button>
                                    )}
                                </div>

                                {uploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Uploading...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}

                                {success && (
                                    <div className="flex flex-col items-center justify-center py-4 text-green-600 animate-in fade-in slide-in-from-bottom-2">
                                        <CheckCircle size={32} className="mb-2" />
                                        <span className="font-medium">Upload Complete!</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Record Details</CardTitle>
                        <CardDescription>Enter metadata for this record.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label>Record Type</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['Prescription', 'Lab Report', 'Imaging'].map((type) => (
                                        <label key={type} className="cursor-pointer">
                                            <input type="radio" name="type" value={type.toLowerCase()} className="peer sr-only" defaultChecked={type === 'Prescription'} />
                                            <span className="px-4 py-2 rounded-full border bg-background text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-muted">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date of Record</Label>
                                <Input id="date" type="date" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="doctor">Doctor / Provider</Label>
                                <Input id="doctor" placeholder="e.g. Dr. Smith" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <textarea
                                    id="notes"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Add any additional notes..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setFile(null)} disabled={uploading}>Cancel</Button>
                                <Button type="submit" disabled={!file || uploading || success}>
                                    {uploading ? 'Uploading...' : success ? 'Saved' : 'Save Record'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Upload;
