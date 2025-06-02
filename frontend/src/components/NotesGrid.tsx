import React from 'react';
import { Note, Tag } from '../types';
import NoteCard from './NoteCard';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

interface NotesGridProps {
  notes: Note[];
  tags: Tag[];
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onReorderNotes: (notes: Note[]) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  tags,
  onEditNote,
  onDeleteNote,
  onReorderNotes,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = notes.findIndex((note) => note.id === active.id);
      const newIndex = notes.findIndex((note) => note.id === over.id);
      const reorderedNotes = arrayMove(notes, oldIndex, newIndex);
      onReorderNotes(reorderedNotes);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          No notes found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Create your first note by clicking the "New Note" button in the sidebar.
        </p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={notes} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              tags={tags}
              onEdit={onEditNote}
              onDelete={onDeleteNote}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};