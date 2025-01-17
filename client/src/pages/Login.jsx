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
import { Link } from 'react-router-dom';

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
               <Card className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-96 glassmorphic">   <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-6 text-center dark:text-white">Login</Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type='email'
                            label="Email"
                            color="blue"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             className="dark:bg-gray-700  dark:bg-primary"
                        />
                        <Input
                            type='password'
                            label="Password"
                            color="blue"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             className="dark:bg-gray-700  dark:bg-primary"
                        />
                        <Button type="submit" color="blue" className="w-full">Login</Button>
                    </form>
                    <p className='text-primary mt-4 text-center'>
                            Dont have an Account? <Link to="/signup" className='underline'>Register</Link>
                    </p>
                </CardBody>
                    {error && Array.isArray(error) && error.map((err, index) => {
                        return <Typography key={index} variant="h6" color="red" className='text-center'>{err}</Typography>
                    })}
                     {error && typeof error === 'string' && (
                        <Typography variant="h6" color="red" className='text-center'>{error}</Typography>
                    )}
            </Card>
        </div>
    )
}
