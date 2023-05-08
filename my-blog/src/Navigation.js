import { Link } from "react-router-dom"
import useUser from "./hooks/useUser"
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

const NavigationBar = () => {
    const [user] = useUser();
    const navigate = useNavigate();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/article-list">Articles</Link>
                </li>
            </ul>
            <div className="nav-right">
                {user ? 
                    <button onClick={() => signOut(getAuth())}>Log Out</button>
                    : <button onClick={() => navigate('/login')}>Log In</button>}
            </div>
        </nav>)
}

export default NavigationBar