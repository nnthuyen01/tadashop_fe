import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './ForgotPassword.scss'; // Import file CSS tùy chỉnh
import Loading from '../Loading/loading';
import { API_URL } from '~/config/constant';

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(API_URL + 'auth/resetPassword', null, { params: { email } });

            if (response.status === 200) {
                navigate('/verifyForgotPassword', { state: { email: email } });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                swal('Email chưa được đăng ký', {
                    title: 'Không chính xác',
                    icon: 'error',
                });
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
                    <h2 className="verify-email-heading">Email khôi phục mật khẩu</h2>
                    <p className="verify-email-text">Nhập email khôi phục mật khẩu của bạn:</p>
                    <form onSubmit={handleSubmit} className="verify-email-form">
                        <input
                            type="email"
                            placeholder="Nhập Email"
                            value={email}
                            onChange={handleEmailChange}
                            className="verify-email-input"
                            required
                        />
                        {/* <div className="verify-email-resend" onClick={handleResend}>
                            Gửi lại mã xác thực
                        </div> */}
                        <button type="submit" className="verify-email-button">
                            Tiếp tục
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
                        <Link to="/login">Quay lại</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
