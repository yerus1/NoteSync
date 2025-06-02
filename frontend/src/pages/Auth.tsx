import React from 'react';
import AuthForm from '../components/AuthForm';
import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Auth: React.FC = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">NoteSync</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your personal note-taking app integrated with Spring Boot
        </p>
      </div>

      <AuthForm />

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        NoteSync &copy; {new Date().getFullYear()} | All rights reserved
      </p>
    </div>
  );
};

export default Auth;