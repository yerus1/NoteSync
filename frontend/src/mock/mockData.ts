import { Note, Tag, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock user
export const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
};

// Mock tags
export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Work',
    color: '#3B82F6', // blue
  },
  {
    id: '2',
    name: 'Personal',
    color: '#10B981', // green
  },
  {
    id: '3',
    name: 'Ideas',
    color: '#8B5CF6', // purple
  },
  {
    id: '4',
    name: 'Important',
    color: '#EF4444', // red
  },
];

// Mock notes
export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Project Meeting Notes',
    content: 'Discussed the new features for the upcoming release. Need to follow up with the design team about the UI mockups.',
    tags: ['1', '4'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Shopping List',
    content: '- Milk\n- Eggs\n- Bread\n- Fruits\n- Vegetables',
    tags: ['2'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'App Idea: Fitness Tracker',
    content: 'Create a fitness tracking app that uses AI to suggest personalized workout routines based on user preferences and history.',
    tags: ['3'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content: '1. "Atomic Habits" by James Clear\n2. "The Psychology of Money" by Morgan Housel\n3. "Deep Work" by Cal Newport',
    tags: ['2', '3'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Weekly Goals',
    content: '- Complete project documentation\n- Prepare presentation for client meeting\n- Review pull requests\n- Set up new development environment',
    tags: ['1', '4'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock API functions
let notes = [...mockNotes];
let tags = [...mockTags];
let user = { ...mockUser };

export const mockLogin = (username: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 800);
  });
};

export const mockRegister = (username: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...user,
        username,
        email,
      });
    }, 800);
  });
};

export const mockGetNotes = (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...notes]);
    }, 500);
  });
};

export const mockGetNote = (id: string): Promise<Note> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const note = notes.find(n => n.id === id);
      if (note) {
        resolve({ ...note });
      } else {
        reject(new Error('Note not found'));
      }
    }, 300);
  });
};

export const mockCreateNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNote: Note = {
        id: uuidv4(),
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      notes = [newNote, ...notes];
      resolve(newNote);
    }, 500);
  });
};

export const mockUpdateNote = (id: string, note: Partial<Note>): Promise<Note> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = notes.findIndex(n => n.id === id);
      if (index !== -1) {
        const updatedNote = {
          ...notes[index],
          ...note,
          updatedAt: new Date().toISOString(),
        };
        notes[index] = updatedNote;
        resolve({ ...updatedNote });
      } else {
        reject(new Error('Note not found'));
      }
    }, 500);
  });
};

export const mockDeleteNote = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = notes.findIndex(n => n.id === id);
      if (index !== -1) {
        notes = notes.filter(n => n.id !== id);
        resolve();
      } else {
        reject(new Error('Note not found'));
      }
    }, 500);
  });
};

export const mockGetTags = (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...tags]);
    }, 300);
  });
};

export const mockCreateTag = (tag: Omit<Tag, 'id'>): Promise<Tag> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTag: Tag = {
        id: uuidv4(),
        ...tag,
      };
      tags = [...tags, newTag];
      resolve(newTag);
    }, 300);
  });
};