import { Link } from "react-router-dom"

const NavigationBar = () => {
    return (<nav>
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
            </nav>)
}

export default NavigationBar