import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle, Shield, Brain } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isUploading }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-[var(--primary)] hover:border-primary rounded-3xl p-12 text-center bg-card shadow-lg hover:shadow-xl transition-all duration-300 group max-w-2xl w-full"
        style={{ backgroundImage: 'linear-gradient(to right, hsl(var(--muted)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-black dark:bg-white hover:bg-primary p-6 rounded-2xl shadow-md flex items-center justify-center mb-2">
            <Upload className="w-12 h-12 text-white dark:text-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]" />
          </div>
          <h3 className="text-3xl font-extrabold text-foreground mb-2" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>Upload Your Contract</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">Drag and drop your PDF contract here, or <span className="text-[var(--primary)] font-semibold">click to browse</span>. Our AI will analyze it for risks and provide expert legal guidance.</p>
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-semibold mb-2">PDF files only</span>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[var(--primary)]" />
              <span>Secure upload</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-[var(--primary)]" />
              <span>AI-powered</span>
            </div>
          </div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isUploading}
          />
        </div>
      </div>
      <div className="mt-8 p-5 bg-[var(--badge-bg)] border border-[var(--badge-text)] rounded-xl max-w-2xl w-full flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-[var(--badge-text)] mt-0.5 flex-shrink-0" />
        <div className="text-sm text-[var(--badge-text)]">
          <span className="font-semibold mb-1 block">Legal Disclaimer</span>
          <span className="leading-relaxed block">This tool provides AI-powered analysis for informational purposes only. The analysis should not be considered as legal advice. Always consult with qualified legal professionals for official legal advice and comprehensive contract review.</span>
        </div>
      </div>
    </div>
  );
};