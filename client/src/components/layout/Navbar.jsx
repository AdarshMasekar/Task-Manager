import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, selectUser } from '../../store/reducers/userReducer';
import { CheckSquare, Moon, Sun, LogOut, User } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);


    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className={"w-full px-5 sm:px-6 lg:px-8 py-5 z-50 sticky top-2"}>
            <nav className="relative mx-auto max-w-6xl">
                <div className="backdrop-blur-md bg-white/75 dark:bg-gray-900/75 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        {/* Logo and Brand */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <CheckSquare className="h-6 w-6" />
                            <span className="text-lg font-semibold">Task Manager</span>
                        </Link>

                        {/* Navigation Items */}
                        <div className="flex items-center gap-3">
                            {user?.authToken ? (
                                <>
                                    {/* User Info */}
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50 rounded-full">
                                        <span>{user?.data?.firstName} {user?.data?.lastName}</span>
                                    </div>

                                    {/* Profile Button */}
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        <span className="hidden sm:inline">Profile</span>
                                    </Link>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-full transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Register Button */}
                                    <Link
                                        to="/signup"
                                        className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full transition-colors"
                                    >
                                        Register
                                    </Link>

                                    {/* Login Button */}
                                    <Link
                                        to="/signin"
                                        className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-1.5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-4 w-4" />
                                ) : (
                                    <Sun className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
