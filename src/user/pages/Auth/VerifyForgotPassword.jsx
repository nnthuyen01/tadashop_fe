import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './VerifyForgotPassword.scss'; // Import file CSS tùy chỉnh
import Loading from '../Loading/loading';
import { API_URL } from '~/config/constant';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'; // Import CSS của Tippy
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function VerifyForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(location.state?.email || ''); // Lấy dữ liệu từ location.state
    const [formData, setFormData] = useState({
        email: email,
        token: '',
        newPassword: '',
        confirmPassword: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isTooltipVisible2, setIsTooltipVisible2] = useState(false);
    const [isCheckPassword, setIsCheckPassword] = useState(false);
    const [isCheckPasswordCf, setIsCheckPasswordCf] = useState(false);

    const [isWarningPass, setIsWarningPass] = useState(false);
    const [isWarningCon, setIsWarningCon] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

    const handleInputBlur = () => {
        setIsTooltipVisible(false);
        setIsTooltipVisible2(false);
        setIsPasswordValid(true);
    };
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        handleIsPasswordValid(value);
        if (formData.newPassword !== value) {
            setIsCheckPasswordCf(false);
        }
    };
    const handleConfirmPasswordChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(value);
        if (formData.newPassword !== value || formData.confirmPassword === '') {
            console.log('Passwords do not match.');
            setIsTooltipVisible2(true);
            setIsCheckPasswordCf(false);
        } else {
            setIsTooltipVisible2(false);
            setIsCheckPasswordCf(true);
            setIsWarningCon(false);
        }
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
        setIsWarningPass(false);
        return;
    };

    const newTokenInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordInputCfRef = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (isCheckPassword === false) {
            setLoading(false);
            setIsWarningPass(true);

            swal('Vui lòng nhập mật khẩu mới.', {
                title: 'Lỗi',
                icon: 'error',
            }).then(() => {
                newPasswordInputRef.current.focus();
            });
            return; // Ngừng xử lý tiếp
        } else if (isCheckPasswordCf === false) {
            setLoading(false);
            setIsWarningCon(true);

            swal('Mật khẩu không khớp. Vui lòng nhập mật khẩu khớp.', {
                title: 'Lỗi',
                icon: 'error',
            }).then(() => {
                newPasswordInputCfRef.current.focus();
            });
            return; // Ngừng xử lý tiếp
        }

        const data = {
            email: formData.email,
            token: formData.token,

            newPassword: formData.newPassword,
        };
        console.log('Data' + data);
        try {
            const response = await axios.post(API_URL + 'auth/saveChangePassword', data);

            if (response.status === 200) {
                swal('Bạn đã thay đổi mật khẩu thành công !!!', {
                    title: 'Thành công',
                    icon: 'success',
                }).then(() => {
                    // Chuyển hướng đến trang chủ sau khi người dùng nhấn "oke"
                    navigate('/login');
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === 'Invalid token') {
                swal('Token không chính xác', {
                    title: 'Không chính xác',
                    icon: 'error',
                });
                newTokenInputRef.current.focus();

                setIsWarning(true);
            } else {
                swal('Có lỗi xảy ra !!!', {
                    title: 'Lỗi',
                    icon: 'error',
                }).then(() => {
                    // Chuyển hướng đến trang đăng nhập sau khi người dùng nhấn "oke"
                    navigate('/login');
                });
            }
        } finally {
            setLoading(false); // Ẩn hiệu ứng loading sau khi xử lý xong
        }
    };

    return (
        <div className="fullScreen">
            {loading && <Loading />}
            <div className="verify-email-container">
                <div className="verify-email-card">
                    <h2 className="verify-email-heading">Khôi phục mật khẩu</h2>
                    <p className="verify-email-text">Vui lòng điền thông tin khôi phục mật khẩu của bạn:</p>
                    <form onSubmit={handleSubmit} className="verify-email-form">
                        <input
                            type="email"
                            placeholder="Nhập Email"
                            value={formData.email}
                            className="verify-email-input"
                            name="email"
                            style={{ fontWeight: 'bold' }}
                            readOnly
                        />
                        <input
                            type="text"
                            name="token"
                            placeholder="Nhập Mã xác thực"
                            value={formData.token}
                            onChange={handleInputChange}
                            className="verify-email-input"
                            ref={newTokenInputRef}
                            required
                        />
                        {isWarning && <div style={{ color: 'red', marginBottom: '5px' }}>Token không chính xác</div>}

                        <div className="wrapField">
                            <Tooltip
                                title="Password must be 6-26 characters long and include at least one lowercase letter, 
                                            one uppercase letter, one digit, and one special character."
                                open={!isPasswordValid && isTooltipVisible}
                                theme="transparent"
                                position="left"
                                arrow={true}
                                trigger="manual"
                                animation="scale"
                                style={{ flex: 1 }}
                            >
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Nhập mật khẩu mới"
                                    value={formData.newPassword}
                                    onChange={handlePasswordChange}
                                    onFocus={() => {
                                        setIsTooltipVisible(true);
                                        setIsPasswordValid(false);
                                    }}
                                    onBlur={handleInputBlur}
                                    ref={newPasswordInputRef}
                                    className="verify-password-input"
                                    required
                                />
                            </Tooltip>
                            {isCheckPassword && <FontAwesomeIcon className="check" icon={faCheckCircle} />}
                        </div>
                        {isWarningPass && (
                            <div style={{ color: 'red', marginBottom: '5px' }}>Mât khẩu phải đúng định dạng</div>
                        )}
                        <div className="wrapField">
                            <Tooltip
                                title="Passwords do not match. Please enter matching passwords."
                                theme="transparent"
                                open={isTooltipVisible2}
                                position="left"
                                trigger="manual"
                                arrow={true}
                                animation="scale"
                                style={{ flex: 1 }}
                            >
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Nhập lại mật khẩu mới"
                                    value={formData.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="verify-password-input"
                                    onBlur={handleInputBlur}
                                    onFocus={() => {
                                        setIsTooltipVisible2(true);
                                    }}
                                    ref={newPasswordInputCfRef}
                                    required
                                />
                            </Tooltip>
                            {isCheckPasswordCf && <FontAwesomeIcon className="check" icon={faCheckCircle} />}
                        </div>
                        {isWarningCon && (
                            <div style={{ color: 'red', marginBottom: '5px' }}>Mật khẩu phải đúng định dạng</div>
                        )}
                        <button type="submit" className="verify-email-button">
                            Xác nhận
                        </button>
                    </form>
                    <div
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'center', // Canh giữa theo chiều ngang
                            alignItems: 'center',
                        }}
                    >
                        <Link to="/forgotPassword">Quay lại</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyForgotPassword;
