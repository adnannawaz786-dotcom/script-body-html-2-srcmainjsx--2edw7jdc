/**
 * File handling utility functions for the rich text editor
 */

/**
 * Supported file types for upload
 */
export const SUPPORTED_FILE_TYPES = {
  TEXT: ['txt', 'md', 'rtf'],
  DOCUMENT: ['doc', 'docx'],
  WEB: ['html', 'htm'],
  JSON: ['json'],
  XML: ['xml']
};

/**
 * Maximum file size in bytes (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Get file extension from filename
 * @param {string} filename - The filename
 * @returns {string} File extension in lowercase
 */
export const getFileExtension = (filename) => {
  if (!filename || typeof filename !== 'string') return '';
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.slice(lastDotIndex + 1).toLowerCase() : '';
};

/**
 * Check if file type is supported
 * @param {string} filename - The filename
 * @returns {boolean} True if file type is supported
 */
export const isSupportedFileType = (filename) => {
  const extension = getFileExtension(filename);
  return Object.values(SUPPORTED_FILE_TYPES).some(types => types.includes(extension));
};

/**
 * Validate file before upload
 * @param {File} file - The file to validate
 * @returns {Object} Validation result with isValid and error message
 */
export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `File size exceeds ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB limit` 
    };
  }

  if (!isSupportedFileType(file.name)) {
    const supportedExtensions = Object.values(SUPPORTED_FILE_TYPES).flat().join(', ');
    return { 
      isValid: false, 
      error: `Unsupported file type. Supported formats: ${supportedExtensions}` 
    };
  }

  return { isValid: true, error: null };
};

/**
 * Read file content as text
 * @param {File} file - The file to read
 * @returns {Promise<string>} File content as string
 */
export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(new Error('Failed to read file: ' + error.message));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Download content as file
 * @param {string} content - Content to download
 * @param {string} filename - Filename for download
 * @param {string} mimeType - MIME type of the file
 */
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('Failed to download file: ' + error.message);
  }
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generate filename with timestamp
 * @param {string} baseName - Base filename without extension
 * @param {string} extension - File extension
 * @returns {string} Filename with timestamp
 */
export const generateTimestampedFilename = (baseName = 'document', extension = 'txt') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${baseName}_${timestamp}.${extension}`;
};

/**
 * Extract plain text from HTML content
 * @param {string} html - HTML content
 * @returns {string} Plain text content
 */
export const extractTextFromHTML = (html) => {
  if (!html) return '';
  
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content and clean up extra whitespace
  return tempDiv.textContent || tempDiv.innerText || '';
};

/**
 * Convert plain text to basic HTML
 * @param {string} text - Plain text content
 * @returns {string} HTML content with basic formatting
 */
export const textToHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
};

/**
 * Get MIME type based on file extension
 * @param {string} filename - The filename
 * @returns {string} MIME type
 */
export const getMimeType = (filename) => {
  const extension = getFileExtension(filename);
  
  const mimeTypes = {
    txt: 'text/plain',
    md: 'text/markdown',
    html: 'text/html',
    htm: 'text/html',
    json: 'application/json',
    xml: 'application/xml',
    rtf: 'application/rtf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  
  return mimeTypes[extension] || 'text/plain';
};

/**
 * Create a file input element for file selection
 * @param {Function} onFileSelect - Callback function when file is selected
 * @param {boolean} multiple - Allow multiple file selection
 * @returns {HTMLInputElement} File input element
 */
export const createFileInput = (onFileSelect, multiple = false) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = multiple;
  input.style.display = 'none';
  
  // Set accepted file types
  const acceptedTypes = Object.values(SUPPORTED_FILE_TYPES)
    .flat()
    .map(ext => `.${ext}`)
    .join(',');
  input.accept = acceptedTypes;
  
  input.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
    }
    // Reset input value to allow selecting the same file again
    input.value = '';
  });
  
  return input;
};

/**
 * Save content to localStorage
 * @param {string} key - Storage key
 * @param {string} content - Content to save
 * @returns {boolean} Success status
 */
export const saveToLocalStorage = (key, content) => {
  try {
    localStorage.setItem(key, content);
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

/**
 * Load content from localStorage
 * @param {string} key - Storage key
 * @returns {string|null} Saved content or null
 */
export const loadFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

/**
 * Clear content from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const clearFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to clear from localStorage:', error);
    return false;
  }
};