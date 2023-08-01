import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', { username, password });
            console.log(response.data.access_token);
            localStorage.setItem('auth_token', response.data.access_token);
            localStorage.setItem('auth_name', response.data.username);
            if (response.data.role === 'ADMIN') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const [isSignIn, setIsSignIn] = useState(true);

    const handleToggleForm = () => {
        setIsSignIn(!isSignIn);
    };
    const handleInputNumber = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
        event.target.value = value;
    };

    return (
        <div className={`container1 ${isSignIn ? '' : 'active'}`}>
            <div className="box">
                <div className="form sign_in">
                    <h3>Sign In</h3>
                    <span>or use your account</span>

                    <form action="#" id="form_input" onSubmit={handleLogin}>
                        <div className="type">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="type">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="forgot">
                            <span>Forgot your password?</span>
                        </div>

                        <button className="btn bkg">Sign In</button>
                    </form>
                </div>

                <div className="form sign_up">
                    <h3>Sign Up</h3>
                    <span>or use your email for register</span>

                    <form action="#" id="form_input">
                        <div className="type">
                            <input type="text" name="firstName" placeholder="First name" id="firstName" />
                        </div>
                        <div className="type">
                            <input type="text" name="lastName" placeholder="Last Name" id="lastName" />
                        </div>
                        <div className="type">
                            <input type="email" name="email" placeholder="Email" id="email" />
                        </div>
                        <div className="type">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                id="phone"
                                onChange={handleInputNumber}
                            />
                        </div>
                        <div className="type">
                            <input type="text" name="username" placeholder="username" id="username" />
                        </div>
                        <div className="type">
                            <input type="password" name="password" placeholder="Password" id="password" />
                        </div>

                        <button className="btn bkg">Sign Up</button>
                    </form>
                </div>
            </div>

            <div className="overlay">
                <div className="page page_signIn">
                    <h3>Welcome Back!</h3>
                    <p>To keep with us please login with your personal info</p>

                    <button className="btn btnSign-in" onClick={handleToggleForm}>
                        Sign Up <i className="bi bi-arrow-right"></i>
                    </button>
                </div>

                <div className="page page_signUp">
                    <h3>Hello Friend!</h3>
                    <p>Enter your personal details and start journey with us</p>

                    <button className="btn btnSign-up" onClick={handleToggleForm}>
                        <i className="bi bi-arrow-left"></i> Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
