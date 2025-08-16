import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Undo,
  Redo,
  Type,
  Palette,
  Highlighter
} from 'lucide-react';

const Toolbar = ({ 
  onFormat, 
  canUndo = false, 
  canRedo = false, 
  onUndo, 
  onRedo,
  activeFormats = new Set(),
  currentFontSize = '16',
  onFontSizeChange,
  onColorChange,
  onHighlightChange
}) => {
  const handleCommand = (command, value = null) => {
    if (onFormat) {
      onFormat(command, value);
    }
  };

  const isActive = (format) => activeFormats.has(format);

  const ToolbarButton = ({ 
    onClick, 
    active = false, 
    disabled = false, 
    children, 
    title 
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md border transition-colors duration-200
        ${active 
          ? 'bg-blue-100 border-blue-300 text-blue-700' 
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:border-gray-400'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      `}
    >
      {children}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-8 bg-gray-300 mx-1" />
  );

  const ToolbarSelect = ({ value, onChange, options, title }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title={title}
      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 hover:border-gray-400 transition-colors duration-200"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const fontSizes = [
    { value: '12', label: '12px' },
    { value: '14', label: '14px' },
    { value: '16', label: '16px' },
    { value: '18', label: '18px' },
    { value: '20', label: '20px' },
    { value: '24', label: '24px' },
    { value: '28', label: '28px' },
    { value: '32', label: '32px' },
    { value: '36', label: '36px' },
    { value: '48', label: '48px' }
  ];

  const handleInsertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleCommand('createLink', url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      handleCommand('insertImage', url);
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    handleCommand('foreColor', color);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const handleHighlightChange = (e) => {
    const color = e.target.value;
    handleCommand('hiliteColor', color);
    if (onHighlightChange) {
      onHighlightChange(color);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo"
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo"
      >
        <Redo size={16} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Font Size */}
      <ToolbarSelect
        value={currentFontSize}
        onChange={(size) => {
          handleCommand('fontSize', size);
          if (onFontSizeChange) {
            onFontSizeChange(size);
          }
        }}
        options={fontSizes}
        title="Font Size"
      />

      <ToolbarSeparator />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => handleCommand('bold')}
        active={isActive('bold')}
        title="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('italic')}
        active={isActive('italic')}
        title="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('underline')}
        active={isActive('underline')}
        title="Underline"
      >
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('strikeThrough')}
        active={isActive('strikeThrough')}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Text Color and Highlight */}
      <div className="flex items-center gap-1">
        <div className="relative">
          <input
            type="color"
            onChange={handleColorChange}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Text Color"
          />
          <Type size={12} className="absolute top-0 left-0 pointer-events-none text-gray-600" />
        </div>
        <div className="relative">
          <input
            type="color"
            onChange={handleHighlightChange}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Highlight Color"
          />
          <Highlighter size={12} className="absolute top-0 left-0 pointer-events-none text-gray-600" />
        </div>
      </div>

      <ToolbarSeparator />

      {/* Text Alignment */}
      <ToolbarButton
        onClick={() => handleCommand('justifyLeft')}
        active={isActive('justifyLeft')}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('justifyCenter')}
        active={isActive('justifyCenter')}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('justifyRight')}
        active={isActive('justifyRight')}
        title="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('justifyFull')}
        active={isActive('justifyFull')}
        title="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Lists */}
      <ToolbarButton
        onClick={() => handleCommand('insertUnorderedList')}
        active={isActive('insertUnorderedList')}
        title="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('insertOrderedList')}
        active={isActive('insertOrderedList')}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Block Elements */}
      <ToolbarButton
        onClick={() => handleCommand('formatBlock', 'blockquote')}
        active={isActive('blockquote')}
        title="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => handleCommand('formatBlock', 'pre')}
        active={isActive('pre')}
        title="Code Block"
      >
        <Code size={16} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Insert Elements */}
      <ToolbarButton
        onClick={handleInsertLink}
        title="Insert Link"
      >
        <Link size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleInsertImage}
        title="Insert Image"
      >
        <Image size={16} />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;