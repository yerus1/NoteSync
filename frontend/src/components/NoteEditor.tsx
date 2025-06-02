import React, { useState, useEffect } from 'react';
import { X, Save, Hash } from 'lucide-react';
import { Note, Tag } from '../types';

interface NoteEditorProps {
  note: Partial<Note> | null;
  tags: Tag[];
  onSave: (note: Partial<Note>) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, tags, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);

  // Update form when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setSelectedTags(note.tags || []);
    }
  }, [note]);

  const handleSave = () => {
    onSave({
      id: note?.id,
      title,
      content,
      tags: selectedTags,
    });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Auto-save timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        handleSave();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, selectedTags]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {note?.id ? 'Edit Note' : 'New Note'}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200"
          />
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
            {selectedTags.length > 0 ? (
              selectedTags.map(tagId => {
                const tag = tags.find(t => t.id === tagId);
                return tag ? (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  >
                    {tag.name}
                    <button
                      onClick={() => toggleTag(tag.id)}
                      className="ml-1 focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ) : null;
              })
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400 italic">No tags selected</span>
            )}
            <button
              onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <Hash size={16} />
            </button>
          </div>

          {isTagMenuOpen && (
            <div className="absolute z-10 mt-1 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Select Tags
                </h3>
                <div className="space-y-1">
                  {tags.length > 0 ? (
                    tags.map(tag => (
                      <div
                        key={tag.id}
                        className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                        onClick={() => toggleTag(tag.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => {}}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        ></span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {tag.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic px-2 py-1">
                      No tags available
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;