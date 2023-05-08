import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const signUp = async () => {
        try {
            if (password !== confirmPassword) {
                setError("Password and Confirm Password does not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/article-list');
        } catch(e) {
            setError(e.message);
        }
    }

    return (
        <>
            <h1>Create an account</h1>
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
            <p> Confirm Password:</p>
            <input 
                value={confirmPassword}
                onChange={e => {setConfirmPassword(e.target.value)}}
                type="password"/>
            {error !== '' ? <p className='error'>{error}</p> : <> </>}

            <button onClick={signUp}>Create Account</button>
            <Link to="/login"> Already have an account? Login here!</Link>
        </>
    )
}

export default SignUpPage;