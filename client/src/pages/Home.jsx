import { useSelector } from "react-redux"
import { userSelector } from "../reducers/userReducer"
import Tasks from "../components/Task"
import Register from './Register'
import Login from './Login'

export default function Homepage() {
  const user = useSelector(userSelector)

  return (
    <>
      <h2>this is a home page </h2>
      <Tasks />
      <Login />
      <Register />
    </>
  )
}
