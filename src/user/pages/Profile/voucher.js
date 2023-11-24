import React, { useState, useEffect } from 'react';
import HeaderPages from '~/user/components/HeaderPages';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-tippy/dist/tippy.css'; // Import CSS của Tippy

import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '~/config/constant';

import './profile.scss';
function Voucher() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        navigate('/');
    };

    const [vouchers, setVouchers] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + 'vouchers/user')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setVouchers(response.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />
            <section
                className="bg-img1 txt-center p-lr-15 p-tb-92"
                style={{ backgroundImage: "url('../assets/images/bg-03.jpg')" }}
            >
                <h2 className="ltext-105 cl0 txt-center">Thông tin tài khoản</h2>
            </section>
            <section className="bg0 p-t-62 p-b-60">
                <div className="container">
                    <div className="grid__row">
                        <div className="grid__column-3">
                            <div className="box_navigatetionuser">
                                <ul className="myvne_user_link">
                                    <li>
                                        <NavLink
                                            to={`/profile/${localStorage.getItem('auth_name')}`}
                                            className="nav-link "
                                        >
                                            Thông tin chung
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/changePassword/${localStorage.getItem('auth_name')}`}
                                            className="nav-link "
                                        >
                                            Thay đổi mật khẩu
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/voucher/${localStorage.getItem('auth_name')}`}
                                            className="nav-link activeNavLink"
                                        >
                                            Mã giảm giá
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" className="nav-link" onClick={handleLogout}>
                                            Thoát
                                            <svg
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    margin: '0 0 0 5px',
                                                }}
                                                width="15"
                                                height="17"
                                                viewBox="0 0 15 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H6.25716C6.00353 15.6929 5.78261 15.3578 5.59971 15H2C1.44772 15 1 14.5523 1 14V2C1 1.44772 1.44772 1 2 1H10C10.5523 1 11 1.44772 11 2V7.02242C11.3434 7.05337 11.6777 7.11588 12 7.20703V2C12 0.895431 11.1046 0 10 0H2ZM4 8C4 8.55229 3.55228 9 3 9C2.44772 9 2 8.55229 2 8C2 7.44771 2.44772 7 3 7C3.55228 7 4 7.44771 4 8ZM10.5 17C12.9853 17 15 14.9853 15 12.5C15 10.0147 12.9853 8 10.5 8C8.01472 8 6 10.0147 6 12.5C6 14.9853 8.01472 17 10.5 17ZM10.8536 14.8536C10.6583 15.0488 10.3417 15.0488 10.1464 14.8536C9.95118 14.6583 9.95118 14.3417 10.1464 14.1464L11.2929 13H8.5C8.22386 13 8 12.7761 8 12.5C8 12.2239 8.22386 12 8.5 12H11.2929L10.1464 10.8536C9.95119 10.6583 9.95119 10.3417 10.1464 10.1464C10.3417 9.95118 10.6583 9.95118 10.8536 10.1464L12.8536 12.1464C12.9015 12.1944 12.9377 12.2496 12.9621 12.3086C12.9861 12.3667 12.9996 12.4303 13 12.497L13 12.5L13 12.503C12.9996 12.5697 12.9861 12.6333 12.9621 12.6914C12.938 12.7495 12.9026 12.804 12.8557 12.8514L12.8532 12.854L10.8536 14.8536Z"
                                                    fill="#757575"
                                                ></path>
                                            </svg>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            <div className="box_support">
                                Cần hỗ trợ, vui lòng liên hệ:{' '}
                                <a href="mailto:tadashopasia@gmail.com">tadashopasia@gmail.com</a>
                            </div>
                        </div>
                        <div className="grid__column-9">
                            <div className="tit-row ltext-102">Mã giảm giá</div>
                            <div className="user-info">
                                {loading ? (
                                    <div style={{ textAlign: 'center' }}>Đang tải dữ liệu...</div>
                                ) : (
                                    vouchers.map((item, index) => (
                                        <div
                                            key={index}
                                            className="voucher"
                                            style={{
                                                marginBottom: '20px',
                                                backgroundColor: item.status !== 1 ? '#a0b8b5' : '',
                                            }}
                                        >
                                            <div className="voucher-name mtext-101">
                                                Mã giảm giá: {item.priceOffPercent}
                                            </div>
                                            {item.status === 1 ? (
                                                <div className="voucher-status stext-101">Có thể sử dụng</div>
                                            ) : (
                                                <div className="voucher-status stext-101" style={{ color: '#c70101' }}>
                                                    Hết hạn
                                                </div>
                                            )}
                                            <div className="voucher-code">{item.code}</div>
                                            <p className="voucher-expires stext-105">
                                                Thời gian hết hạn: {item.expirationTime}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Voucher;
