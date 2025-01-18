import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync, selectUser, changePasswordAsync } from '../store/reducers/userReducer';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [firstName, setFirstName] = useState(user?.data?.firstName || '');
    const [lastName, setLastName] = useState(user?.data?.lastName || '');
    const [email, setEmail] = useState(user?.data?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        if (user && user.data) {
            setFirstName(user.data.firstName || '');
            setLastName(user.data.lastName || '');
            setEmail(user.data.email || '');
        }
    }, [user]);

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
        <div className="flex items-center justify-center bg-background text-foreground mt-4">
            <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-md w-[90%] max-w-2xl glassmorphic">
                <div>
                    <h5 className="mb-6 text-xl font-medium text-center">Profile</h5>
                    <form className="space-y-4" onSubmit={handleUpdateProfile}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                            Update Profile
                        </button>
                        {updateError && (
                            <p className="text-sm text-red-500">
                                {updateError}
                            </p>
                        )}
                    </form>
                    <div className="mt-8">
                        <h6 className="mb-4 text-lg font-medium text-center">Change Password</h6>
                        <form className="space-y-4" onSubmit={handleChangePassword}>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">New Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                                Change Password
                            </button>
                            {passwordError && (
                                <p className="text-sm text-red-500">
                                    {passwordError}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
