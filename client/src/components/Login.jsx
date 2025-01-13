import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/reduceres/userReducer";


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      username: username,
      password: password
    }
    dispatch(loginThunk(userCredentials));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => dispatch(userActions.logout())}>Logout</button>
    </>
  )
}