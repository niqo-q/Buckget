import { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2, X } from 'lucide-react';

interface FileUploadProps {
  onComplete: () => void;
  onBack: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function FileUpload({ onComplete, onBack }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 pb-32">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl mb-2">Upload Documents</h1>
          <p className="text-gray-600">
            Please upload your monthly settlement or payslip to verify your income
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          <div className="flex-1 h-1 bg-indigo-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-indigo-600 rounded-full"></div>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="mb-2">
            Drop your files here
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            or click to browse
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition-colors"
          >
            Select Files
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: PDF, JPG, PNG (Max 10MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm text-gray-600">Uploaded Files</h3>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-green-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onComplete}
          disabled={files.length === 0}
          className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-indigo-600 text-white py-4 rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}
