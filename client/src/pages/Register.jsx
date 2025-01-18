import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectUser } from '../store/reducers/userReducer';
import { Link } from 'react-router-dom';

export default function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error} = useSelector(selectUser)

    const handleSubmit = (e) => {
        e.preventDefault();

        const userCredentials = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        dispatch(registerUser(userCredentials));
        navigate("/signin")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground">
            <div className="bg-card text-card-foreground p-8 shadow-md w-96 rounded-2xl glassmorphic">
                <div className='-my-5'>
                    <h5 className="mb-6 text-center text-xl font-medium">Register</h5>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary transition-colors"
                        >
                            Register
                        </button>
                    </form>
                    <p className='text-muted-foreground mt-4 text-center'>
                        Already have an Account? <Link to="/signin" className='text-primary hover:underline'>Log In</Link>
                    </p>

                    {error && Array.isArray(error) && error.map((err, index) => (
                        <p key={index} className="text-destructive text-center">* {err}</p>
                    ))}
                    {error && typeof error === 'string' && (
                        <p className="text-destructive text-center">* {error}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
