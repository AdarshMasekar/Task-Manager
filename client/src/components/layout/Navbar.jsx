
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSelector } from '../../reducers/userReducer';

export default function Navbar(){
    const user = useSelector(userSelector);

    return  <div>
        <div className="logo">
            <Link to="/">task manager</Link>
        </div>
        <div className="links">
            <Link to="/signup">register</Link>
            <Link to="/signin">login</Link>
        </div>
    </div>
}
