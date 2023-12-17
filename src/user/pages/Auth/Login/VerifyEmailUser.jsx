import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './VerifyEmailUser.scss'; // Import file CSS tùy chỉnh
import Loading from '../../Loading/loading';

const VerifyEmailUser = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin location
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState(location.state?.email || ''); // Lấy dữ liệu từ location.state
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const params = {
            email: email,
            token: token,
        };

        // console.log(params);
        // Gửi mã token lên máy chủ để xác thực email
        // Xử lý kết quả xác thực
        try {
            const response = await axios.get('http://localhost:8080/api/auth/verifyRegistration', { params });

            console.log(response.data);

            if (response.status === 200 && response.data === 'valid') {
                swal('Bạn đã đăng ký tài khoản thành công !!!', {
                    title: 'Thành công',
                    icon: 'success',
                }).then(() => {
                    // Chuyển hướng đến trang chủ sau khi người dùng nhấn "oke"
                    navigate('/login');
                });
            } else if (response.status === 200 && response.data === 'incorrect token') {
                swal('Token sai !!!', {
                    title: 'Không chính xác',
                    icon: 'error',
                });
            } else if (response.status === 200 && response.data === 'token expires') {
                swal('Token hết hạn !!!', {
                    title: 'Không chính xác',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error(error.message);
            swal('Có lỗi xảy ra !!!', {
                title: 'Lỗi',
                icon: 'error',
            }).then(() => {
                // Chuyển hướng đến trang đăng nhập sau khi người dùng nhấn "oke"
                navigate('/');
            });
        } finally {
            setLoading(false); // Ẩn hiệu ứng loading sau khi xử lý xong
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await axios.get('http://localhost:8080/api/auth/resendVerifyToken', {
                params: { email: email },
            });
            console.log(response);
            if (response.status === 200) {
                swal('Mã xác thực đã được gửi đến mail bạn', {
                    title: 'Thành công',
                    icon: 'success',
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="fullScreen">
            {loading && <Loading />}
            <div className="verify-email-container">
                <div className="verify-email-card">
                    <h2 className="verify-email-heading">Xác Thực Email</h2>
                    <p className="verify-email-text">
                        Email đã được gửi tới <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{email}</span>. Vui
                        lòng kiểm tra email của bạn để lấy mã xác minh. Nhập mã xác minh bạn nhận được bên dưới:
                    </p>
                    <form onSubmit={handleSubmit} className="verify-email-form">
                        <input
                            type="text"
                            placeholder="Nhập Token"
                            value={token}
                            onChange={handleTokenChange}
                            className="verify-email-input"
                            required
                        />
                        <div className="verify-email-resend" onClick={handleResend}>
                            Gửi lại mã xác thực
                        </div>
                        <button type="submit" className="verify-email-button">
                            Xác thực
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
};

export default VerifyEmailUser;
