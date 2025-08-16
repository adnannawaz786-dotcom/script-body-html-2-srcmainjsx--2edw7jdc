import React, { useState, useRef, useCallback } from 'react'
import { Download, Upload, Save, FileText, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo } from 'lucide-react'

function App() {
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('document.txt')
  const [isDirty, setIsDirty] = useState(false)
  const [history, setHistory] = useState([''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const updateHistory = useCallback((newContent) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newContent)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const handleContentChange = (e) => {
    const newContent = e.target.innerHTML
    setContent(newContent)
    setIsDirty(true)
    updateHistory(newContent)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const fileContent = event.target.result
        setContent(fileContent)
        setFileName(file.name)
        setIsDirty(false)
        if (editorRef.current) {
          editorRef.current.innerHTML = fileContent
        }
        setHistory([fileContent])
        setHistoryIndex(0)
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    localStorage.setItem('richTextEditor_content', content)
    localStorage.setItem('richTextEditor_fileName', fileName)
    setIsDirty(false)
  }

  const loadFromStorage = () => {
    const savedContent = localStorage.getItem('richTextEditor_content')
    const savedFileName = localStorage.getItem('richTextEditor_fileName')
    if (savedContent) {
      setContent(savedContent)
      if (editorRef.current) {
        editorRef.current.innerHTML = savedContent
      }
    }
    if (savedFileName) {
      setFileName(savedFileName)
    }
  }

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setContent(newContent)
      setIsDirty(true)
      updateHistory(newContent)
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const previousContent = history[newIndex]
      setContent(previousContent)
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = previousContent
      }
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const nextContent = history[newIndex]
      setContent(nextContent)
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent
      }
    }
  }

  React.useEffect(() => {
    loadFromStorage()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Rich Text Editor</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="File name"
              />
              {isDirty && <span className="text-sm text-amber-600">●</span>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.html,.md"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 border-r pr-2">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <button
                  onClick={() => executeCommand('bold')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => executeCommand('italic')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => executeCommand('underline')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <button
                  onClick={() => executeCommand('justifyLeft')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => executeCommand('justifyCenter')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => executeCommand('justifyRight')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => executeCommand('insertUnorderedList')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => executeCommand('insertOrderedList')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
              </div>

              <select
                onChange={(e) => executeCommand('formatBlock', e.target.value)}
                className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="">Format</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="p">Paragraph</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <div
              ref={editorRef}
              contentEditable
              onInput={handleContentChange}
              className="min-h-96 w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                lineHeight: '1.6',
                fontSize: '16px'
              }}
              suppressContentEditableWarning={true}
              placeholder="Start typing your document here..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App