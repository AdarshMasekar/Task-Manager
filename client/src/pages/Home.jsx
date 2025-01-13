import { useSelector } from "react-redux"
import { userSelector } from "../reducers/userReducer"

export default function Homepage() {
    const user = useSelector(userSelector)
    console.log(user)

  return (
    <>
     <h2>this is a home page </h2>
    </>
  )
}
