
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Trash2, Eye, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  url?: string;
}

export const ResumeUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedResumes, setUploadedResumes] = useState<ResumeFile[]>([
    {
      id: '1',
      name: 'John_Doe_Resume_2024.pdf',
      size: 245760, // 240KB
      type: 'application/pdf',
      uploadDate: '2024-01-15',
      url: '/placeholder-resume.pdf'
    }
  ]);
  
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file)
      };

      setUploadedResumes(prev => [...prev, newResume]);

      toast({
        title: "Upload Successful",
        description: "Your resume has been uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your resume.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteResume = (id: string) => {
    setUploadedResumes(prev => prev.filter(resume => resume.id !== id));
    toast({
      title: "Resume Deleted",
      description: "The resume has been removed successfully.",
    });
  };

  const handleViewResume = (resume: ResumeFile) => {
    if (resume.url) {
      window.open(resume.url, '_blank');
    }
  };

  const handleDownloadResume = (resume: ResumeFile) => {
    if (resume.url) {
      const link = document.createElement('a');
      link.href = resume.url;
      link.download = resume.name;
      link.click();
    }
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  const getFileTypeBadge = (type: string) => {
    if (type.includes('pdf')) {
      return <Badge className="bg-red-100 text-red-800">PDF</Badge>;
    }
    if (type.includes('word')) {
      return <Badge className="bg-blue-100 text-blue-800">DOC</Badge>;
    }
    return <Badge variant="secondary">DOC</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Resume Upload</h2>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>
            Upload your resume in PDF or Word format (max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Upload Resume</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop your resume here, or click to browse
                </p>
              </div>
              <Button 
                onClick={handleFileSelect}
                disabled={isUploading}
                className="mx-auto"
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </Button>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX (Max size: 5MB)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Uploaded Resumes */}
      {uploadedResumes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Uploaded Resumes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getFileTypeIcon(resume.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{resume.name}</h4>
                        {getFileTypeBadge(resume.type)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatFileSize(resume.size)}</span>
                        <span>•</span>
                        <span>Uploaded {formatDate(resume.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewResume(resume)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadResume(resume)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteResume(resume.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resume Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Keep your resume to 1-2 pages maximum</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Use a clean, professional format with consistent fonts</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Include relevant keywords from the job description</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Quantify your achievements with numbers and metrics</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Proofread carefully for spelling and grammar errors</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save Resume Section</Button>
    </div>
  );
};
