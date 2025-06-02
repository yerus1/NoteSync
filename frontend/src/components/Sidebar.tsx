import React, { useState } from 'react';
import { Plus, Hash, Folder, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Tag } from '../types';

interface SidebarProps {
  onNewNote: () => void;
  selectedTag: string | null;
  onSelectTag: (tagId: string | null) => void;
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewNote, selectedTag, onSelectTag, onSearch }) => {
  const { tags } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTags, setShowTags] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <aside className="w-64 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
      <div className="p-4">
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          <Plus size={18} />
          <span>New Note</span>
        </button>

        <form onSubmit={handleSearch} className="mt-4 relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-9 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
          />
        </form>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <button 
          className="flex items-center justify-between w-full px-2 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-100"
          onClick={() => onSelectTag(null)}
        >
          <div className="flex items-center gap-2">
            <Folder size={18} className="text-blue-600 dark:text-blue-400" />
            <span>All Notes</span>
          </div>
        </button>

        <div className="mt-4">
          <button 
            className="flex items-center justify-between w-full px-2 py-1 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-100"
            onClick={() => setShowTags(!showTags)}
          >
            <span>Tags</span>
            {showTags ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {showTags && (
            <div className="mt-1 ml-2 space-y-1">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`flex items-center gap-2 w-full px-2 py-1 text-left rounded-md transition-colors duration-100 ${
                    selectedTag === tag.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => onSelectTag(tag.id)}
                >
                  <Hash size={16} style={{ color: tag.color }} />
                  <span>{tag.name}</span>
                </button>
              ))}

              {tags.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic px-2 py-1">
                  No tags yet
                </p>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;