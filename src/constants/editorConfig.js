// Editor configuration constants for the rich text editor

// Default editor configuration
export const DEFAULT_EDITOR_CONFIG = {
  placeholder: "Start typing your document...",
  spellCheck: true,
  autoFocus: false,
  contentEditable: true,
  className: "prose prose-gray max-w-none min-h-[500px] p-6 focus:outline-none",
  style: {
    lineHeight: '1.6',
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }
};

// Toolbar button configurations
export const TOOLBAR_BUTTONS = {
  BOLD: {
    id: 'bold',
    command: 'bold',
    icon: 'Bold',
    title: 'Bold (Ctrl+B)',
    shortcut: 'Ctrl+B'
  },
  ITALIC: {
    id: 'italic',
    command: 'italic',
    icon: 'Italic',
    title: 'Italic (Ctrl+I)',
    shortcut: 'Ctrl+I'
  },
  UNDERLINE: {
    id: 'underline',
    command: 'underline',
    icon: 'Underline',
    title: 'Underline (Ctrl+U)',
    shortcut: 'Ctrl+U'
  },
  STRIKETHROUGH: {
    id: 'strikethrough',
    command: 'strikeThrough',
    icon: 'Strikethrough',
    title: 'Strikethrough',
    shortcut: null
  },
  ALIGN_LEFT: {
    id: 'alignLeft',
    command: 'justifyLeft',
    icon: 'AlignLeft',
    title: 'Align Left',
    shortcut: null
  },
  ALIGN_CENTER: {
    id: 'alignCenter',
    command: 'justifyCenter',
    icon: 'AlignCenter',
    title: 'Align Center',
    shortcut: null
  },
  ALIGN_RIGHT: {
    id: 'alignRight',
    command: 'justifyRight',
    icon: 'AlignRight',
    title: 'Align Right',
    shortcut: null
  },
  ALIGN_JUSTIFY: {
    id: 'alignJustify',
    command: 'justifyFull',
    icon: 'AlignJustify',
    title: 'Justify',
    shortcut: null
  },
  ORDERED_LIST: {
    id: 'orderedList',
    command: 'insertOrderedList',
    icon: 'ListOrdered',
    title: 'Numbered List',
    shortcut: null
  },
  UNORDERED_LIST: {
    id: 'unorderedList',
    command: 'insertUnorderedList',
    icon: 'List',
    title: 'Bullet List',
    shortcut: null
  },
  INDENT: {
    id: 'indent',
    command: 'indent',
    icon: 'Indent',
    title: 'Increase Indent',
    shortcut: null
  },
  OUTDENT: {
    id: 'outdent',
    command: 'outdent',
    icon: 'Outdent',
    title: 'Decrease Indent',
    shortcut: null
  },
  LINK: {
    id: 'link',
    command: 'createLink',
    icon: 'Link',
    title: 'Insert Link',
    shortcut: 'Ctrl+K'
  },
  UNLINK: {
    id: 'unlink',
    command: 'unlink',
    icon: 'Unlink',
    title: 'Remove Link',
    shortcut: null
  },
  UNDO: {
    id: 'undo',
    command: 'undo',
    icon: 'Undo',
    title: 'Undo (Ctrl+Z)',
    shortcut: 'Ctrl+Z'
  },
  REDO: {
    id: 'redo',
    command: 'redo',
    icon: 'Redo',
    title: 'Redo (Ctrl+Y)',
    shortcut: 'Ctrl+Y'
  }
};

// Font family options
export const FONT_FAMILIES = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'system-ui, -apple-system, sans-serif', label: 'System UI' }
];

// Font size options
export const FONT_SIZES = [
  { value: '10px', label: '10px' },
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' }
];

// Heading options
export const HEADING_OPTIONS = [
  { value: 'p', label: 'Normal Text' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' }
];

// Text color options
export const TEXT_COLORS = [
  { value: '#000000', label: 'Black' },
  { value: '#333333', label: 'Dark Gray' },
  { value: '#666666', label: 'Gray' },
  { value: '#999999', label: 'Light Gray' },
  { value: '#ffffff', label: 'White' },
  { value: '#ff0000', label: 'Red' },
  { value: '#00ff00', label: 'Green' },
  { value: '#0000ff', label: 'Blue' },
  { value: '#ffff00', label: 'Yellow' },
  { value: '#ff00ff', label: 'Magenta' },
  { value: '#00ffff', label: 'Cyan' },
  { value: '#ffa500', label: 'Orange' },
  { value: '#800080', label: 'Purple' },
  { value: '#008000', label: 'Dark Green' },
  { value: '#000080', label: 'Navy Blue' }
];

// Background color options
export const BACKGROUND_COLORS = [
  { value: 'transparent', label: 'None' },
  { value: '#ffffff', label: 'White' },
  { value: '#f5f5f5', label: 'Light Gray' },
  { value: '#e5e5e5', label: 'Gray' },
  { value: '#ffff99', label: 'Yellow Highlight' },
  { value: '#99ff99', label: 'Green Highlight' },
  { value: '#99ccff', label: 'Blue Highlight' },
  { value: '#ffcc99', label: 'Orange Highlight' },
  { value: '#ff9999', label: 'Red Highlight' },
  { value: '#cc99ff', label: 'Purple Highlight' }
];

// Keyboard shortcuts mapping
export const KEYBOARD_SHORTCUTS = {
  'Ctrl+B': 'bold',
  'Ctrl+I': 'italic',
  'Ctrl+U': 'underline',
  'Ctrl+Z': 'undo',
  'Ctrl+Y': 'redo',
  'Ctrl+K': 'createLink',
  'Ctrl+S': 'save',
  'Ctrl+O': 'open',
  'Ctrl+N': 'new'
};

// Editor themes
export const EDITOR_THEMES = {
  DEFAULT: {
    name: 'Default',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#e5e5e5'
  },
  DARK: {
    name: 'Dark',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    borderColor: '#333333'
  },
  SEPIA: {
    name: 'Sepia',
    backgroundColor: '#f4f1ea',
    textColor: '#5c4b37',
    borderColor: '#d4c5a9'
  }
};

// Auto-save configuration
export const AUTOSAVE_CONFIG = {
  enabled: true,
  interval: 30000, // 30 seconds
  storageKey: 'editor_autosave_content',
  maxVersions: 10
};

// File export formats
export const EXPORT_FORMATS = {
  TXT: {
    extension: 'txt',
    mimeType: 'text/plain',
    label: 'Plain Text (.txt)'
  },
  HTML: {
    extension: 'html',
    mimeType: 'text/html',
    label: 'HTML Document (.html)'
  },
  RTF: {
    extension: 'rtf',
    mimeType: 'application/rtf',
    label: 'Rich Text Format (.rtf)'
  }
};

// Editor validation rules
export const VALIDATION_RULES = {
  maxContentLength: 1000000, // 1MB of text content
  allowedTags: [
    'p', 'div', 'span', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'blockquote', 'pre', 'code'
  ],
  allowedAttributes: [
    'style', 'class', 'href', 'target', 'src', 'alt', 'width', 'height',
    'colspan', 'rowspan', 'align'
  ]
};

// Default document templates
export const DOCUMENT_TEMPLATES = {
  BLANK: {
    name: 'Blank Document',
    content: ''
  },
  LETTER: {
    name: 'Letter Template',
    content: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>[Date]</p>
      <br>
      <p>[Recipient Name]</p>
      <p>[Recipient Address]</p>
      <p>[City, State, ZIP Code]</p>
      <br>
      <p>Dear [Recipient Name],</p>
      <br>
      <p>[Letter content goes here...]</p>
      <br>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `
  },
  MEMO: {
    name: 'Memo Template',
    content: `
      <h2>MEMORANDUM</h2>
      <br>
      <p><strong>TO:</strong> [Recipient]</p>
      <p><strong>FROM:</strong> [Your Name]</p>
      <p><strong>DATE:</strong> [Date]</p>
      <p><strong>SUBJECT:</strong> [Subject]</p>
      <br>
      <p>[Memo content goes here...]</p>
    `
  },
  REPORT: {
    name: 'Report Template',
    content: `
      <h1>[Report Title]</h1>
      <br>
      <h2>Executive Summary</h2>
      <p>[Summary content...]</p>
      <br>
      <h2>Introduction</h2>
      <p>[Introduction content...]</p>
      <br>
      <h2>Findings</h2>
      <p>[Findings content...]</p>
      <br>
      <h2>Conclusions</h2>
      <p>[Conclusions content...]</p>
    `
  }
};