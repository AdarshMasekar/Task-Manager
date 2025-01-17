import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/reducers/userReducer';
import {
    Navbar as MTNavbar,
    Typography,
    Button
} from "@material-tailwind/react";
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
        <MTNavbar className="p-4 mx-auto flex justify-between items-center text-primary glassmorphic dark:glassmorphic mt-5 sticky top-5 z-50">
              <Typography variant="h6" className="text-primary dark:text-white">
                <Link to="/" className="hover:text-blue-500">Task Manager</Link>
            </Typography>
            <div className="space-x-4 flex items-center">
                {user?.authToken ? (
                    <>
                        <Typography variant="h6" className="dark:text-gray-300">
                            {user?.data?.firstName} {user?.data?.lastName}
                        </Typography>
                        <Link to="/profile">
                            <Button
                                variant="text"
                                className="dark:text-gray-300 p-1"
                            >
                                Profile
                            </Button>
                        </Link>
                        <Button
                            variant="text"
                            onClick={handleLogout}
                            className="dark:text-gray-300 p-1"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="small" className="dark:text-gray-300">
                            <Link to="/signup" className="hover:text-blue-500">
                                <Button
                                    variant="text"
                                    className="dark:text-gray-300 p-2"
                                >
                                    Register
                                </Button>
                            </Link>
                        </Typography>
                        <Typography variant="small" className="dark:text-gray-300">
                            <Link to="/signin" className="hover:text-blue-500">
                                <Button
                                    variant="text"
                                    className="dark:text-gray-300 p-2"
                                >
                                    Login
                                </Button>
                            </Link>
                        </Typography>
                    </>
                )}
                <Button
                    variant="filled"
                    onClick={toggleTheme}
                    className="dark:text-gray-300 rounded-full p-1"
                >
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </Button>

            </div>

        </MTNavbar>
    );
}
