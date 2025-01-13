import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "../reducers/userReducer";

export default function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    dispatch(registerThunk(userCredentials));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter firstName" />
        <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter lastName" />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        <button type="submit">Register</button>
      </form>
    </>
  )
}
