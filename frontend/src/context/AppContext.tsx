import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, Tag, User, ThemeMode } from '../types';
import * as api from '../services/mockApi';

interface AppContextType {
  notes: Note[];
  tags: Tag[];
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: ThemeMode;
  fetchNotes: () => Promise<void>;
  fetchTags: () => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Note>;
  updateNote: (id: string, note: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  addTag: (tag: Omit<Tag, 'id'>) => Promise<Tag>;
  updateUser: (data: Partial<User> & { currentPassword?: string; newPassword?: string }) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
  reorderNotes: (reorderedNotes: Note[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Check for stored theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Check for stored auth token and fetch initial data
  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
          await Promise.all([fetchNotes(), fetchTags()]);
        } catch (error) {
          console.error('Error initializing app:', error);
          logout(); // Clear invalid data
        }
      }
      
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const fetchNotes = async () => {
    if (!isAuthenticated) return;
    
    try {
      const fetchedNotes = await api.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  };

  const fetchTags = async () => {
    if (!isAuthenticated) return;
    
    try {
      const fetchedTags = await api.getTags();
      setTags(fetchedTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newNote = await api.createNote(note);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      return newNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };

  const updateNote = async (id: string, note: Partial<Note>) => {
    try {
      const updatedNote = await api.updateNote(id, note);
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? updatedNote : n))
      );
      return updatedNote;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  const addTag = async (tag: Omit<Tag, 'id'>) => {
    try {
      const newTag = await api.createTag(tag);
      setTags((prevTags) => [...prevTags, newTag]);
      return newTag;
    } catch (error) {
      console.error('Error adding tag:', error);
      throw error;
    }
  };

  const updateUser = async (data: Partial<User> & { currentPassword?: string; newPassword?: string }) => {
    try {
      const updatedUser = await api.updateUser(data);
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await api.login(username, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      localStorage.setItem('token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(user));
      
      // Fetch initial data
      await Promise.all([fetchNotes(), fetchTags()]);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await api.register(username, email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      localStorage.setItem('token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(user));
      
      // Initialize empty data for new user
      setNotes([]);
      setTags([]);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setNotes([]);
    setTags([]);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const reorderNotes = (reorderedNotes: Note[]) => {
    setNotes(reorderedNotes);
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        tags,
        currentUser,
        isAuthenticated,
        isLoading,
        theme,
        fetchNotes,
        fetchTags,
        addNote,
        updateNote,
        deleteNote,
        addTag,
        updateUser,
        login,
        register,
        logout,
        toggleTheme,
        reorderNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};