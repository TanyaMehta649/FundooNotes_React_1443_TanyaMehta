import React, { useState } from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { loginApiCall } from '../../utils/Api';
import toast from 'react-hot-toast';

export default function Login() {
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");
    const [emailError , setEmailError]=useState(false);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        let valid = true;
        setEmailError("");
        setPasswordError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;  

        if (!email.length) {
            setEmailError("Email is required");
            valid = false;
        }
        else if (!emailRegex.test(email) && !phoneRegex.test(email)) {
            setEmailError("Enter a valid Email or 10-digit Phone Number");
            valid = false;
        }

        if (!password.length) {
            setPasswordError("Password is required");
            valid = false;
        }
        

        if (valid) {
            loginApiCall({ email, password })
                .then((res) => {
                    
                    console.log('Login successful:', res);
                    localStorage.setItem('token', res.id);
                    toast.success("Login successfull");
                    navigate('/dashboard/notes'); 
                })
                .catch((error) => {
                    console.log('Login error:', error);
                    setEmailError("Invalid email or password");
                });
        }
    }
    const handleCreateAccount = () => {
        navigate('/signup');
    }
  return (
    <div className='fundoo-Login-Form'>
        <div className='fundoo-Login'>
            <div className='fundoo-Login-header'>
                <span>Fundoo</span>
            </div>
            <div className='fundoo-Login-signin'>
                <span>Sign In</span>
            </div>
            <div className='fundoo-Login-account'>
                <span>Use Your Fundoo Account</span>
            </div>
            <div className='fundoo-Login-email'>
            <TextField className='email' id="outlined-basic" type='email' label="Email or phone*" variant="outlined" 
            onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
            </div>
            <div className='fundoo-Login-Password'>
            <TextField className='password' id="outlined-basic" type='password' label="password*" variant="outlined" 
            onChange={(e) => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} />
            </div>
            <div className='fundoo-Login-forget'>
                <Button className='button'>Forget Password</Button>
            </div>
            <div className='fundoo-Login-create'>
                <Button className='button' onClick={() => handleCreateAccount()}>Create Account</Button>
            </div>
            <div className='fundoo-Login-button'>
                <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
            </div>
        </div>
        <div className='fundoo-Login-footer'>
            <div className='fundoo-Login-help'>
                <span>English(United States)</span>
            </div>
            <div className='fundoo-Login-help'>
                <span className='help'>Help</span>
            </div>
            <div className='fundoo-Login-privacy'>
                <span className='privacy'>Privacy</span>
            </div>
            <div className='fundoo-Login-terms'>
                <span className='terms'>Terms</span>
            </div>
        </div>
    </div>
  )
}
