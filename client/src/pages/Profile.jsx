import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserAsync, selectUser, changePasswordAsync } from '../store/reducers/userReducer';
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, authToken } = useSelector(selectUser);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        if (user && user.user) {
            setFirstName(user.user.firstName || '');
            setLastName(user.user.lastName || '');
            setEmail(user.user.email || '');
        }
    }, [user]);

    if (!authToken) {
        navigate("/signin");
        return null;
    }
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setUpdateError(null);
        if (!firstName || !lastName || !email) {
            setUpdateError("Please fill in all fields.");
            return;
        }
        const userData = {
            firstName,
            lastName,
            email,
        };
        dispatch(updateUserAsync(userData))
            .unwrap()
            .catch((err) => {
                setUpdateError(err || "Failed to update profile.");
            });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPasswordError(null);
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirm password do not match.");
            return;
        }
        dispatch(changePasswordAsync({ currentPassword, newPassword }))
            .unwrap()
            .then(() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch((err) => {
                setPasswordError(err || "Failed to change password.");
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
            <Card className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-6 text-center dark:text-white">
                        Profile
                    </Typography>
                    <form className="space-y-4" onSubmit={handleUpdateProfile}>
                        <Input
                            type="text"
                            label="First Name"
                            color="blue"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                        />
                        <Input
                            type="text"
                            label="Last Name"
                            color="blue"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                        />
                        <Input
                            type="email"
                            label="Email"
                            color="blue"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                        />
                        <Button type="submit" color="blue" className="w-full">
                            Update Profile
                        </Button>
                        {updateError && (
                            <Typography variant="small" color="red">
                                {updateError}
                            </Typography>
                        )}
                        {error && Array.isArray(error) && error.map((err, index) => {
                            return <Typography key={index} variant="small" color="red">{err}</Typography>
                        })}
                        {error && typeof error === 'string' && (
                            <Typography variant="small" color="red">{error}</Typography>
                        )}
                    </form>
                    <div className="mt-8">
                        <Typography variant="h6" color="blue-gray" className="mb-4 text-center dark:text-white">
                            Change Password
                        </Typography>
                        <form className="space-y-4" onSubmit={handleChangePassword}>
                            <Input
                                type="password"
                                label="Current Password"
                                color="blue"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                            />
                            <Input
                                type="password"
                                label="New Password"
                                color="blue"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                            />
                            <Input
                                type="password"
                                label="Confirm New Password"
                                color="blue"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                            />
                            <Button type="submit" color="blue" className="w-full">
                                Change Password
                            </Button>
                            {passwordError && (
                                <Typography variant="small" color="red">
                                    {passwordError}
                                </Typography>
                            )}
                        </form>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Profile;
