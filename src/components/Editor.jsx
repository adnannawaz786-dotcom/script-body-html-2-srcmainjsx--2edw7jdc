import React, { useCallback, useState, useRef } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo, Upload, Download, Save } from 'lucide-react';

const Editor = () => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('document.txt');
  const [isModified, setIsModified] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleContentChange = useCallback((e) => {
    setContent(e.target.innerHTML);
    setIsModified(true);
  }, []);

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        if (editorRef.current) {
          editorRef.current.innerHTML = text.replace(/\n/g, '<br>');
        }
        setContent(text);
        setFileName(file.name);
        setIsModified(false);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleSave = useCallback(() => {
    const textContent = editorRef.current?.innerText || '';
    localStorage.setItem('editorContent', textContent);
    localStorage.setItem('editorFileName', fileName);
    setIsModified(false);
  }, [fileName]);

  const handleDownload = useCallback(() => {
    const textContent = editorRef.current?.innerText || '';
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [fileName]);

  const handleUndo = useCallback(() => {
    execCommand('undo');
  }, [execCommand]);

  const handleRedo = useCallback(() => {
    execCommand('redo');
  }, [execCommand]);

  React.useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    const savedFileName = localStorage.getItem('editorFileName');
    
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent.replace(/\n/g, '<br>');
      setContent(savedContent);
    }
    
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, []);

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.md,.html"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={handleUndo}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          {toolbarButtons.map(({ icon: Icon, command, title }) => (
            <button
              key={command}
              onClick={() => execCommand(command)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title={title}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <select
            onChange={(e) => execCommand('fontSize', e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="3"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3">12pt</option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>
          
          <input
            type="color"
            onChange={(e) => execCommand('foreColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Text Color"
          />
          
          <input
            type="color"
            onChange={(e) => execCommand('hiliteColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Highlight Color"
          />
        </div>
      </div>

      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          className="min-h-96 p-6 focus:outline-none text-gray-800 leading-relaxed"
          style={{ minHeight: '400px' }}
          suppressContentEditableWarning={true}
          placeholder="Start typing your document..."
        />
        
        {isModified && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" title="Document modified" />
        )}
      </div>

      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>
            Characters: {editorRef.current?.innerText?.length || 0} | 
            Words: {editorRef.current?.innerText?.split(/\s+/).filter(word => word.length > 0).length || 0}
          </span>
          {isModified && <span className="text-orange-600">• Modified</span>}
        </div>
      </div>
    </div>
  );
};

export default Editor;