import React, { useEffect, useState } from 'react';
import { Link, createRoutesFromElements, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'; // Import CSS của Tippy
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Loading from '../../Loading/loading';
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //Login the user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

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
        } finally {
            setLoading(false); // Ẩn hiệu ứng loading sau khi xử lý xong
        }
    };
    const [isSignIn, setIsSignIn] = useState(true);

    const handleToggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    // register the user
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [isWarning1, setIsWarning1] = useState(false);
    const [isWarning2, setIsWarning2] = useState(false);
    const [isWarning3, setIsWarning3] = useState(false);
    const [isWarning4, setIsWarning4] = useState(false);
    const [isWarning5, setIsWarning5] = useState(false);
    const [isWarning6, setIsWarning6] = useState(false);
    const [isWarning7, setIsWarning7] = useState(false);

    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isTooltipVisible2, setIsTooltipVisible2] = useState(false);
    const [isCheckPassword, setIsCheckPassword] = useState(false);
    const [isCheckPasswordCf, setIsCheckPasswordCf] = useState(false);

    const handleInputBlur = () => {
        setIsTooltipVisible(false);
        setIsTooltipVisible2(false);
        setIsPasswordValid(true);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputNumber = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
        event.target.value = value;
        // Để cập nhật state formData với giá trị mới
        const { name } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // if (handleIsPasswordValid(value)) {
        //     setIsTooltipVisible(true);
        // }
        handleIsPasswordValid(value);
        if (formData.password !== value) {
            setIsCheckPasswordCf(false);
        }

        console.log(isCheckPasswordCf, value);
    };
    const handleConfirmPasswordChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(value);
        if (formData.password !== value || formData.confirmPassword === '') {
            console.log('Passwords do not match.');
            setIsTooltipVisible2(true);
            setIsCheckPasswordCf(false);
        } else {
            setIsTooltipVisible2(false);
            setIsCheckPasswordCf(true);
        }
        console.log(isTooltipVisible2);
    };
    const handleIsPasswordValid = (password) => {
        // Kiểm tra chiều dài mật khẩu
        if (password.length < 6 || password.length > 26) {
            // return setIsPasswordValid(false);
            setIsPasswordValid(false);
            setIsCheckPassword(false);
            return;
        }

        // Kiểm tra chứa ít nhất một chữ thường, một chữ hoa, một số và một kí tự đặc biệt
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]/;

        if (
            !lowercaseRegex.test(password) ||
            !uppercaseRegex.test(password) ||
            !digitRegex.test(password) ||
            !specialCharacterRegex.test(password)
        ) {
            // return setIsPasswordValid(false);
            setIsPasswordValid(false);
            setIsCheckPassword(false);
            return;
        }

        // return setIsPasswordValid(true);
        setIsPasswordValid(true);
        setIsCheckPassword(true);
        return;
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.firstName === '') {
            setIsWarning1(true);
        }
        if (formData.lastName === '') {
            setIsWarning2(true);
        }
        if (formData.email === '') {
            setIsWarning3(true);
        }
        if (formData.phone === '') {
            setIsWarning4(true);
        }
        if (formData.username === '') {
            setIsWarning5(true);
        }
        if (formData.password === '') {
            setIsWarning6(true);
        }
        if (formData.confirmPassword === '' || formData.confirmPassword !== formData.password) {
            // swal('Confirm password không được trống và phải giống với password ở trên !', {
            //     title: 'Warning',
            //     icon: 'warning',
            // });
            setIsWarning7(true);

            // setLoading(false);
            // return;
        }

        const data = {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            username: formData.username,
            password: formData.password,
        };
        console.log('Data' + data);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/registerUser', data);
            console.log(response.data);

            if (response.status === 201) {
                navigate('/VerifyRegister', { state: { email: response.data.email } });
            }
            //  else {
            //     navigate('/');
            // }
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;

                if (errorData.firstname) {
                    console.error(errorData.firstname);
                    swal(errorData.firstname, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    setIsWarning1(true);
                    return;
                }
                if (errorData.lastname) {
                    console.error(errorData.lastname);
                    swal(errorData.lastname, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                if (errorData.email) {
                    console.error(errorData.email);
                    swal(errorData.email, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                if (errorData.phone) {
                    console.error(errorData.phone);
                    swal(errorData.phone, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                if (errorData.username) {
                    console.error(errorData.username);
                    swal(errorData.username, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                if (errorData.password) {
                    console.error(errorData.password);
                    swal(errorData.password, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                if (errorData.message) {
                    console.error(errorData.message);
                    swal(errorData.message, {
                        title: 'Warning',
                        icon: 'warning',
                    });
                    return;
                }
                // Tiếp tục kiểm tra và xử lý các trường hợp lỗi khác
            } else {
                console.error('An error occurred:', error.message);
                // Xử lý lỗi không phải từ server response
            }
        } finally {
            setLoading(false); // Ẩn hiệu ứng loading sau khi xử lý xong
        }
    };
    return (
        <div className="fullScreen">
            {loading && <Loading />}

            <div className={`container1 ${isSignIn ? '' : 'active'}`}>
                <div className="box">
                    <div className="form sign_in">
                        <div className="headingForm">
                            <h3>Sign In</h3>
                            <span>or use your account</span>
                        </div>

                        <form action="#" id="form_input1" onSubmit={handleLogin}>
                            <div className="groupField">
                                <span className="head">USERNAME</span>
                                <div className="type">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="groupField">
                                <span className="head">PASSWORD</span>
                                <div className="type">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="forgot">
                                <Link to="/forgotPassword">Forgot your password?</Link>
                            </div>

                            <div className="btnCenter">
                                <button className="btn bkg">Sign In</button>
                            </div>
                        </form>
                    </div>

                    <div className="form sign_up">
                        <h3>Sign Up</h3>
                        <span>or use your email for register</span>

                        <form action="#" id="form_input2" onSubmit={handleRegister}>
                            <div className="groupField">
                                <span className="head">FIRST NAME</span>
                                <div className="type">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            setIsWarning1(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                        }}
                                    />
                                </div>
                            </div>
                            {isWarning1 ? (
                                <div className="fieldType">First name là bắt buộc</div>
                            ) : (
                                <div className="spaceField"></div>
                            )}
                            <div className="groupField">
                                <span className="head">LAST NAME</span>
                                <div className="type">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            setIsWarning2(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                        }}
                                    />
                                </div>
                                {isWarning2 ? (
                                    <div className="fieldType">Last name là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>
                            <div className="groupField">
                                <span className="head">EMAIL</span>
                                <div className="type">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            setIsWarning3(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                        }}
                                    />
                                </div>
                                {isWarning3 ? (
                                    <div className="fieldType">Email là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>
                            <div className="groupField">
                                <span className="head">PHONE</span>
                                <div className="type">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        id="phone"
                                        // onChange={handleInputNumber}
                                        onChange={(event) => {
                                            handleInputNumber(event);
                                            setIsWarning4(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                        }}
                                    />
                                </div>
                                {isWarning4 ? (
                                    <div className="fieldType">Phone là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>
                            <div className="groupField">
                                <span className="head">USERNAME</span>
                                <div className="type">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        value={formData.username}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            setIsWarning5(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                        }}
                                    />
                                </div>
                                {isWarning5 ? (
                                    <div className="fieldType">Username là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>

                            <div className="groupField">
                                <span className="head">PASSWORD</span>
                                <div className="type">
                                    <Tooltip
                                        title="Password must be 6-26 characters long and include at least one lowercase letter, 
                                        one uppercase letter, one digit, and one special character."
                                        open={!isPasswordValid && isTooltipVisible}
                                        position="right"
                                        arrow={true}
                                        trigger="manual"
                                        animation="scale"
                                        style={{ flex: 1 }}
                                    >
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            id="password"
                                            value={formData.password}
                                            // onChange={handlePasswordChange}
                                            onChange={(event) => {
                                                handlePasswordChange(event);
                                                setIsWarning6(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                            }}
                                            onBlur={handleInputBlur}
                                            onFocus={() => {
                                                setIsTooltipVisible(true);
                                                setIsPasswordValid(false);
                                            }}
                                        />
                                    </Tooltip>
                                    {/* {isPasswordValid && <FontAwesomeIcon className="check" icon={faCheckCircle} />} */}
                                    {isCheckPassword && <FontAwesomeIcon className="check" icon={faCheckCircle} />}
                                </div>
                                {isWarning6 ? (
                                    <div className="fieldType">Password là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>

                            <div className="groupField">
                                <span className="head">CONFIRM PASSWORD</span>
                                <div className="type">
                                    <Tooltip
                                        title="Passwords do not match. Please enter matching passwords."
                                        open={isTooltipVisible2}
                                        position="right"
                                        trigger="manual"
                                        arrow={true}
                                        animation="scale"
                                        style={{ flex: 1 }}
                                    >
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            // onChange={handleConfirmPasswordChange}
                                            onChange={(event) => {
                                                handleConfirmPasswordChange(event);
                                                setIsWarning7(false); // Đặt giá trị isWarning1 thành false khi người dùng thay đổi input
                                            }}
                                            onBlur={handleInputBlur}
                                            onFocus={() => {
                                                setIsTooltipVisible2(true);
                                            }}
                                        />
                                    </Tooltip>
                                    {isCheckPasswordCf && <FontAwesomeIcon className="check" icon={faCheckCircle} />}
                                </div>
                                {isWarning7 ? (
                                    <div className="fieldType">Confirm Password là bắt buộc</div>
                                ) : (
                                    <div className="spaceField"></div>
                                )}
                            </div>
                            <div className="btnCenter">
                                <button className="btn bkg">Sign Up</button>
                            </div>
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
        </div>
    );
};

export default Login;
