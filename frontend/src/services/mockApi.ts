// Import mock data and functions
import {
  mockLogin,
  mockRegister,
  mockGetNotes,
  mockGetNote,
  mockCreateNote,
  mockUpdateNote,
  mockDeleteNote,
  mockGetTags,
  mockCreateTag,
} from '../mock/mockData';

import { Note, Tag, User } from '../types';

// Auth endpoints
export const login = async (username: string, password: string): Promise<User> => {
  try {
    // For demo purposes, we'll accept any username/password
    return await mockLogin(username, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    return await mockRegister(username, email, password);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const updateUser = async (
  data: Partial<User> & { currentPassword?: string; newPassword?: string }
): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        username: data.username || 'testuser',
        email: data.email || 'test@example.com',
      });
    }, 500);
  });
};

// Notes endpoints
export const getNotes = async (): Promise<Note[]> => {
  try {
    return await mockGetNotes();
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNote = async (id: string): Promise<Note> => {
  try {
    return await mockGetNote(id);
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  try {
    return await mockCreateNote(note);
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (
  id: string,
  note: Partial<Note>
): Promise<Note> => {
  try {
    return await mockUpdateNote(id, note);
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    return await mockDeleteNote(id);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Tags endpoints
export const getTags = async (): Promise<Tag[]> => {
  try {
    return await mockGetTags();
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const createTag = async (tag: Omit<Tag, 'id'>): Promise<Tag> => {
  try {
    return await mockCreateTag(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};