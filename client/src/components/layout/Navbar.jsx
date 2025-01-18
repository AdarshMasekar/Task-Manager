import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/reducers/userReducer';
import { logoutUser } from '../../store/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="p-4 mx-auto flex justify-between items-center text-primary glassmorphic dark:glassmorphic mt-5 sticky top-5 z-50 rounded-lg border border-gray-300 dark:border-gray-600">
            <h6 className="text-primary dark:text-white">
                <Link to="/" className="hover:text-blue-500">Task Manager</Link>
            </h6>
            <div className="space-x-4 flex items-center">
                {user?.authToken ? (
                    <>
                        <h6 className="dark:text-gray-300">
                            {user?.data?.firstName} {user?.data?.lastName}
                        </h6>
                        <Link to="/profile">
                            <button className="dark:text-gray-300 p-2 rounded-md hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600">
                                Profile
                            </button>
                        </Link>
                        <button onClick={handleLogout} className="dark:text-gray-300 p-2 rounded-md hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <small className="dark:text-gray-300">
                            <Link to="/signup" className="hover:text-blue-500">
                                <button className="dark:text-gray-300 p-2 rounded-md hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600">
                                    Register
                                </button>
                            </Link>
                        </small>
                        <small className="dark:text-gray-300">
                            <Link to="/signin" className="hover:text-blue-500">
                                <button className="dark:text-gray-300 p-2 rounded-md hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600">
                                    Login
                                </button>
                            </Link>
                        </small>
                    </>
                )}
                <button onClick={toggleTheme} className="dark:text-gray-300 rounded-full p-2 hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600">
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </button>
            </div>
        </nav>
    );
}
