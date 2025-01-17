import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectUser } from '../store/reducers/userReducer';
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
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
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
               <Card className="bg-white dark:bg-secondary p-8 shadow-md w-96 rounded-2xl glassmorphic">
                <CardBody className='-my-5'>
                    <Typography variant="h5" color="blue-gray" className="mb-6 text-center dark:text-white">Register</Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type='text'
                            label="First Name"
                            color="blue"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="dark:bg-gray-700  dark:bg-primary"
                        />
                        <Input
                            type='text'
                            label="Last Name"
                            color="blue"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="dark:bg-gray-700  dark:bg-primary"
                        />
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
                        <Button type="submit" color="blue" className="mt-4 w-full">Register</Button>
                    </form>
                    <p className='text-primary mt-4 text-center'>
                        Aleady have an Account? <Link to="/signin" className='underline'>Log In</Link>
                    </p>

                    {error && Array.isArray(error) && error.map((err, index) => {
                        return <Typography key={index} variant="h6" color="red" className='text-center w-full'> * {err}
                            <br />
                        </Typography>
                    })}
                     {error && typeof error === 'string' && (
                        <Typography variant="h6" color="red" className='text-center'>* {error}</Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}
