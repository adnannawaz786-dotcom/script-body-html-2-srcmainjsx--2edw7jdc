import React, { useRef, useState } from 'react';
import { Upload, Download, File, X, AlertCircle, CheckCircle } from 'lucide-react';

const FileHandler = ({ onFileLoad, currentContent, fileName, onFileNameChange }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        
        onFileLoad(content);
        onFileNameChange(fileNameWithoutExt);
        
        setUploadStatus({ type: 'success', message: `File "${file.name}" loaded successfully` });
        setTimeout(() => setUploadStatus(null), 3000);
      } catch (error) {
        setUploadStatus({ type: 'error', message: 'Failed to read file' });
        setTimeout(() => setUploadStatus(null), 3000);
      }
    };

    reader.onerror = () => {
      setUploadStatus({ type: 'error', message: 'Error reading file' });
      setTimeout(() => setUploadStatus(null), 3000);
    };

    reader.readAsText(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([currentContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      a.href = url;
      a.download = `${fileName || 'document'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setUploadStatus({ type: 'success', message: 'File downloaded successfully' });
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Failed to download file' });
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('richTextEditor_content', currentContent);
      localStorage.setItem('richTextEditor_fileName', fileName || 'document');
      
      setUploadStatus({ type: 'success', message: 'Content saved locally' });
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Failed to save content' });
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const loadSavedContent = () => {
    try {
      const savedContent = localStorage.getItem('richTextEditor_content');
      const savedFileName = localStorage.getItem('richTextEditor_fileName');
      
      if (savedContent) {
        onFileLoad(savedContent);
        onFileNameChange(savedFileName || 'document');
        
        setUploadStatus({ type: 'success', message: 'Saved content loaded' });
        setTimeout(() => setUploadStatus(null), 3000);
      } else {
        setUploadStatus({ type: 'error', message: 'No saved content found' });
        setTimeout(() => setUploadStatus(null), 3000);
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Failed to load saved content' });
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Message */}
      {uploadStatus && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          uploadStatus.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{uploadStatus.message}</span>
          <button
            onClick={() => setUploadStatus(null)}
            className="ml-auto p-1 hover:bg-black/5 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* File Name Input */}
      <div className="flex items-center gap-2">
        <File className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={fileName || ''}
          onChange={(e) => onFileNameChange(e.target.value)}
          placeholder="Enter file name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop a file here, or{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            browse
          </button>
        </p>
        <p className="text-xs text-gray-500">Supports text files (.txt, .md, etc.)</p>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".txt,.md,.html,.css,.js,.json,.xml,.csv"
          className="hidden"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          disabled={!currentContent}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        
        <button
          onClick={handleSave}
          disabled={!currentContent}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <File className="w-4 h-4" />
          Save
        </button>
        
        <button
          onClick={loadSavedContent}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Load Saved
        </button>
      </div>

      {/* File Info */}
      {currentContent && (
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
          Content length: {currentContent.length} characters
        </div>
      )}
    </div>
  );
};

export default FileHandler;