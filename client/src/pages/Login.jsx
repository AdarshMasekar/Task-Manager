import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectUser } from '../store/reducers/userReducer';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, authToken } = useSelector(selectUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userCredentials = {
            email: email,
            password: password
        }
        dispatch(loginUser(userCredentials));
    }

    if (authToken) {
        navigate("/")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-md w-96 glassmorphic">
                <div className="p-4">
                    <h5 className="mb-6 text-center">Login</h5>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type='email'
                            placeholder="Email"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder="Password"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="bg-primary text-primary-foreground w-full px-4 py-2 rounded-md">Login</button>
                    </form>
                    <p className='text-primary mt-4 text-center'>
                        Don't have an Account? <Link to="/signup" className='underline'>Register</Link>
                    </p>
                </div>
                {error && Array.isArray(error) && error.map((err, index) => {
                    return <p key={index} className='text-destructive text-center'>{err}</p>
                })}
                {error && typeof error === 'string' && (
                    <p className='text-destructive text-center'>{error}</p>
                )}
            </div>
        </div>
    )
}
