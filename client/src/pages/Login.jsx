import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginThunk } from "../reducers/userReducer";
import { userActions } from "../reducers/userReducer";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password
    }
    dispatch(loginThunk(userCredentials));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => dispatch(userActions.logout())}>Logout</button>
    </>
  )
}
