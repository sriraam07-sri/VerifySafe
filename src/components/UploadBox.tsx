import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';

interface UploadBoxProps {
  label: string;
  helperText?: string;
  accept?: string;
  onFileSelect?: (file: File | null) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  label,
  helperText = 'Drag & drop offer letter, screenshot, or document (PDF, PNG, JPG)',
  accept = '.pdf,image/*',
  onFileSelect,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect?.(null);
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
        {label}
      </label>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-white/40 bg-white/[0.06] scale-[0.99]'
            : selectedFile
            ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
            : 'border-white/12 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-white truncate max-w-[220px] sm:max-w-[360px]">
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mt-0.5">
                  <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready for OCR signature check
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="p-3 rounded-full bg-white/[0.04] border border-white/8 text-neutral-400 mb-2.5">
              <Upload className="w-4 h-4 text-neutral-300" />
            </div>
            <p className="text-xs font-medium text-neutral-300">
              Click to browse or drop file here
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              {helperText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
