import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/article-list');
        } catch(e) {
            setError(e.message);
        }
        
    }

    return (
        <>
            <h1>Login</h1>
            {error !== '' ? <p className='error'>Invalid email or password</p> : <> </>}
            <p>email:</p>
            <input 
                value={email}
                onChange={e => {setEmail(e.target.value)}} 
                />
            <p> Password:</p>
            <input 
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                type="password"/>
            <button onClick={login}>Login</button>
            <Link to="/signup"> Don't have an account? Create one here!</Link>
        </>
    )
}

export default LoginPage;