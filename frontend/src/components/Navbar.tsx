import React from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick }) => {
  const { theme, toggleTheme, isAuthenticated, currentUser, logout } = useApp();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          NoteSync
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {isAuthenticated && currentUser ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentUser.username}
              </span>
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Log out"
            >
              <LogOut size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
              Login
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};