import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Code,
  Undo,
  Redo,
  Table,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write content here...',
  minHeight = '180px',
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  const applyFormat = (tag: string, endTag: string = `</${tag.replace('<', '').replace('>', '')}>`) => {
    const textarea = document.getElementById('rt-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updated = `${before}${tag}${selectedText}${endTag}${after}`;
    onChange(updated);
  };

  const insertHeading = (level: number) => {
    applyFormat(`<h${level}>`, `</h${level}>`);
  };

  const insertList = (ordered: boolean) => {
    const listTag = ordered ? 'ol' : 'ul';
    const snippet = `\n<${listTag}>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</${listTag}>\n`;
    onChange(value + snippet);
  };

  const insertTable = () => {
    const tableSnippet = `\n<table class="w-full border-collapse border border-neutral-300 my-4">\n  <thead>\n    <tr class="bg-neutral-100">\n      <th class="border p-2">Specification</th>\n      <th class="border p-2">Details</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="border p-2">Structure</td>\n      <td class="border p-2">RCC Earthquake Resistant</td>\n    </tr>\n  </tbody>\n</table>\n`;
    onChange(value + tableSnippet);
  };

  return (
    <div className="border border-neutral-300 dark:border-neutral-700 rounded-md overflow-hidden bg-white dark:bg-neutral-900 focus-within:ring-1 focus-within:ring-amber-500">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300">
        <button
          type="button"
          onClick={() => applyFormat('<strong>', '</strong>')}
          title="Bold"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<em>', '</em>')}
          title="Italic"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<u>', '</u>')}
          title="Underline"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700 mx-1" />

        <button
          type="button"
          onClick={() => insertHeading(2)}
          title="Heading 2"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => insertHeading(3)}
          title="Heading 3"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700 mx-1" />

        <button
          type="button"
          onClick={() => insertList(false)}
          title="Bullet List"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => insertList(true)}
          title="Numbered List"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<blockquote>', '</blockquote>')}
          title="Blockquote"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={insertTable}
          title="Insert Table"
          className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <Table className="w-3.5 h-3.5" />
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsHtmlMode(!isHtmlMode)}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              isHtmlMode ? 'bg-amber-600 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            HTML View
          </button>
        </div>
      </div>

      {/* Text Area Input */}
      <textarea
        id="rt-editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ minHeight }}
        className={`w-full p-3 text-xs sm:text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none resize-y ${
          isHtmlMode ? 'font-mono text-xs text-amber-600 dark:text-amber-400' : ''
        }`}
      />
    </div>
  );
};
