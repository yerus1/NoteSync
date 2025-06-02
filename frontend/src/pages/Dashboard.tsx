import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NotesGrid from '../components/NotesGrid';
import NoteEditor from '../components/NoteEditor';
import Profile from './Profile';
import { useApp } from '../context/AppContext';
import { Note } from '../types';

const Dashboard: React.FC = () => {
  const { notes, tags, fetchNotes, fetchTags, addNote, updateNote, deleteNote, reorderNotes } =
    useApp();
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<Partial<Note> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Fetch notes and tags on mount
  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, []);

  // Filter notes based on selected tag and search query
  useEffect(() => {
    let filtered = [...notes];

    if (selectedTagId) {
      filtered = filtered.filter((note) => note.tags.includes(selectedTagId));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // Sort by last updated
    filtered.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    setFilteredNotes(filtered);
  }, [notes, selectedTagId, searchQuery]);

  const handleNewNote = () => {
    setActiveNote({
      title: '',
      content: '',
      tags: [],
    });
    setIsEditing(true);
    setShowProfile(false);
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setActiveNote(noteToEdit);
      setIsEditing(true);
      setShowProfile(false);
    }
  };

  const handleSaveNote = async (note: Partial<Note>) => {
    try {
      if (note.id) {
        // Update existing note
        await updateNote(note.id, note);
      } else {
        // Create new note
        const newNote = await addNote({
          title: note.title || '',
          content: note.content || '',
          tags: note.tags || [],
        });
        setActiveNote(newNote);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        if (activeNote?.id === id) {
          setActiveNote(null);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleTagSelect = (tagId: string | null) => {
    setSelectedTagId(tagId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setIsEditing(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar onProfileClick={handleProfileClick} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          onNewNote={handleNewNote}
          selectedTag={selectedTagId}
          onSelectTag={handleTagSelect}
          onSearch={handleSearch}
        />

        <main className="flex-1 flex overflow-hidden">
          {showProfile ? (
            <Profile />
          ) : isEditing ? (
            <NoteEditor
              note={activeNote}
              tags={tags}
              onSave={handleSaveNote}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <NotesGrid
              notes={filteredNotes}
              tags={tags}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
              onReorderNotes={reorderNotes}
            />
          )}
        </main>
      </div>
    </div>
  );
};