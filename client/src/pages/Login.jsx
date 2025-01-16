import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectUser } from '../store/reducers/userReducer';
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error,authToken} = useSelector(selectUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userCredentials = {
            email: email,
            password: password
        }
        dispatch(loginUser(userCredentials));
    }

    if(authToken){
        navigate("/")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
            <Card className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-6 text-center dark:text-white">Login</Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type='email'
                            label="Email"
                            color="blue"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                        />
                        <Input
                            type='password'
                            label="Password"
                            color="blue"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="dark:bg-gray-700 dark:border-gray-600 border-gray-400 dark:text-white"
                        />
                        <Button type="submit" color="blue" className="w-full">Login</Button>
                    </form>
                    {error && Array.isArray(error) && error.map((err, index) => {
                        return <Typography key={index} variant="small" color="red">{err}</Typography>
                    })}
                     {error && typeof error === 'string' && (
                        <Typography variant="small" color="red">{error}</Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}
