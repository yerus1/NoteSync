import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Note, Tag } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NoteCardProps {
  note: Note;
  tags: Tag[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, tags, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get formatted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Get tag colors
  const getTagColors = (tagIds: string[]) => {
    return tagIds.map((id) => {
      const tag = tags.find((t) => t.id === id);
      return tag ? tag.color : '#e5e7eb'; // Default gray color
    });
  };

  // Get tag names
  const getTagNames = (tagIds: string[]) => {
    return tagIds
      .map((id) => {
        const tag = tags.find((t) => t.id === id);
        return tag ? tag.name : '';
      })
      .filter(Boolean);
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const tagColors = getTagColors(note.tags);
  const tagNames = getTagNames(note.tags);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-move"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-1">
            {note.title || 'Untitled'}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(note.id)}
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              aria-label="Edit note"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              aria-label="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {truncateContent(note.content)}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {note.tags.length > 0 &&
              tagNames.map((name, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${tagColors[index]}20`,
                    color: tagColors[index],
                  }}
                >
                  {name}
                </span>
              ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(note.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;