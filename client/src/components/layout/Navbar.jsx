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
        <MTNavbar className="bg-gray-800 dark:bg-gray-900 p-4 container mx-auto flex justify-between items-center glassmorphic">
              <Typography variant="h6" color="white" className="dark:text-white">
                <Link to="/" className="hover:text-blue-500">task manager</Link>
            </Typography>
            <div className="space-x-4 flex items-center">
                {user.authToken ? (
                    <>
                        <Typography variant="small" color="white" className="dark:text-gray-300">
                            {user?.user?.firstName} {user?.user?.lastName}
                        </Typography>
                        <Link to="/profile">
                            <Button
                                variant="text"
                                color="white"
                                className="dark:text-gray-300"
                            >
                                Profile
                            </Button>
                        </Link>
                        <Button
                            variant="text"
                            color="white"
                            onClick={handleLogout}
                            className="dark:text-gray-300"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="small" color="white" className="dark:text-gray-300">
                            <Link to="/signup" className="hover:text-blue-500">register</Link>
                        </Typography>
                        <Typography variant="small" color="white" className="dark:text-gray-300">
                            <Link to="/signin" className="hover:text-blue-500">login</Link>
                        </Typography>
                    </>
                )}
                <Button
                    variant="text"
                    color="white"
                    onClick={toggleTheme}
                    className="dark:text-gray-300"
                >
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </Button>
            </div>
        </MTNavbar>
    );
}
