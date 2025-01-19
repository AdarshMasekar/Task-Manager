import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserAsync, selectUser, changePasswordAsync } from '../store/reducers/userReducer';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Profile
                    </h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                            Update Profile
                        </button>
                        {updateError && (
                            <div className="text-red-500 text-sm">
                                {updateError}
                            </div>
                        )}
                    </form>
                    <div className="mt-8">
                        <h6 className="mb-4 text-lg font-medium text-center">Change Password</h6>
                        <form className="space-y-6" onSubmit={handleChangePassword}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                                Change Password
                            </button>
                            {passwordError && (
                                <div className="text-red-500 text-sm">
                                    {passwordError}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
