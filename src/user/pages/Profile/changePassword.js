import React, { useState, useEffect, useRef } from 'react';

import HeaderPages from '~/user/components/HeaderPages';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'; // Import CSS của Tippy
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '~/config/constant';

import './profile.scss';
function ChangePassword() {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isCheckOldPassword, setIsCheckOldPassword] = useState(false);
    const [isCheckPassword, setIsCheckPassword] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const newPasswordInputRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        axios
            .get(API_URL + 'user')
            .then((response) => {
                if (response.status === 200) {
                    setFormData((prevData) => ({
                        ...prevData,
                        email: response.data.email,
                    }));
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []); // [] nghĩa là useEffect chỉ chạy một lần khi thành phần được tạo

    // console.log(formData);

    const handleInputBlur = () => {
        setIsTooltipVisible(false);
        setIsPasswordValid(true);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
        handleIsPasswordValid(value);
        // console.log('formData.newPassword:', formData.newPassword);
    };
    const handleIsPasswordValid = (password) => {
        // Kiểm tra chiều dài mật khẩu
        if (password.length < 6 || password.length > 26) {
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

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        localStorage.removeItem('role');
        swal('đăng xuất thành công !', {
            title: 'Thành công',
            icon: 'success',
        });
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isCheckPassword === false) {
            swal('Mật khẩu mới không đúng định dạng.', {
                title: 'Lỗi',
                icon: 'warning',
            }).then(() => {
                newPasswordInputRef.current.focus();
            });
            return; // Ngừng xử lý tiếp
        }

        console.log(formData);
        const data = {
            email: formData.email,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        };
        console.log('Data', data);
        try {
            const response = await axios.put(API_URL + 'auth/changePassword', data);

            if (response.status === 200) {
                swal('Bạn đã thay đổi mật khẩu thành công !!!', {
                    title: 'Thành công',
                    icon: 'success',
                }).then(() => {
                    setIsCheckOldPassword(false);
                    // Chuyển hướng đến trang chủ sau khi người dùng nhấn "oke"
                    navigate('/');
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === 'Invalid Old Password') {
                swal('Mật khẩu cũ không chính xác', {
                    title: 'Mật khẩu cũ không chính xác',
                    icon: 'error',
                });
                setIsCheckOldPassword(true);
            } else if (
                error.response &&
                error.response.status === 400 &&
                error.response.data === 'The new password is the same as the old password'
            ) {
                swal('Mật khẩu mới trùng với mật khẩu cũ', {
                    title: 'Mật khẩu mới trùng với mật khẩu cũ',
                    icon: 'warning',
                });
                setIsCheckOldPassword(false);
            } else {
                swal('Có lỗi xảy ra !!!', {
                    title: 'Lỗi',
                    icon: 'error',
                }).then(() => {
                    // Chuyển hướng đến trang đăng nhập sau khi người dùng nhấn "oke"
                    navigate('/');
                });
            }
        }
    };

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
                                            className="nav-link activeNavLink"
                                        >
                                            Thay đổi mật khẩu
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/voucher/${localStorage.getItem('auth_name')}`}
                                            className="nav-link"
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
                            <div className="tit-row ltext-102">Thay đổi mật khẩu</div>
                            <div className="user-info">
                                <div className="item_fill_user">
                                    <div className="ctn_fill">
                                        <div id="form_update_password" className="width_common .box_edit_password_form">
                                            <div className="form_edit form_log">
                                                <div className="item_input_log">
                                                    <p className="width_common tit_edit">Nhập mật khẩu hiện tại</p>
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                            type={isOldPasswordVisible ? 'text' : 'password'}
                                                            id="pass_old"
                                                            name="oldPassword"
                                                            className="input_form"
                                                            placeholder="Nhập mật khẩu hiện tại"
                                                            value={formData.oldPassword}
                                                            onChange={(event) => {
                                                                handleInputChange(event);
                                                            }}
                                                        />
                                                        <span className="icon_input ">
                                                            <div style={{ padding: '0 10px' }}>
                                                                {isCheckOldPassword ? (
                                                                    <FontAwesomeIcon
                                                                        style={{ color: '#f70000' }}
                                                                        icon={faCircleXmark}
                                                                    />
                                                                ) : (
                                                                    <FontAwesomeIcon
                                                                        style={{ color: '#fff' }}
                                                                        icon={faCircleXmark}
                                                                    />
                                                                )}
                                                            </div>
                                                            {isOldPasswordVisible ? (
                                                                <div
                                                                    style={{ padding: '0 10px' }}
                                                                    onClick={() => setIsOldPasswordVisible(false)}
                                                                >
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    style={{ padding: '0 10px' }}
                                                                    onClick={() => setIsOldPasswordVisible(true)}
                                                                >
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                </div>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="item_input_log">
                                                    <p className="width_common tit_edit">Nhập mật khẩu mới</p>
                                                    <div style={{ position: 'relative', display: 'flex' }}>
                                                        <Tooltip
                                                            title="Password must be 6-26 characters long and include at least one lowercase letter, 
                                        one uppercase letter, one digit, and one special character."
                                                            open={!isPasswordValid && isTooltipVisible}
                                                            position="bottom"
                                                            arrow={true}
                                                            trigger="manual"
                                                            animation="scale"
                                                            style={{ flex: 1 }}
                                                        >
                                                            <input
                                                                type={isNewPasswordVisible ? 'text' : 'password'}
                                                                id="pass_new"
                                                                name="newPassword"
                                                                className="input_form"
                                                                placeholder="Nhập mật khẩu mới"
                                                                value={formData.newPassword}
                                                                onChange={(event) => {
                                                                    handlePasswordChange(event);
                                                                }}
                                                                onBlur={handleInputBlur}
                                                                onFocus={() => {
                                                                    setIsTooltipVisible(true);
                                                                    setIsPasswordValid(false);
                                                                }}
                                                                ref={newPasswordInputRef}
                                                            />
                                                            <span className="icon_input ">
                                                                <div style={{ padding: '0 10px' }}>
                                                                    {isCheckPassword ? (
                                                                        <FontAwesomeIcon
                                                                            className="checkChangePassword"
                                                                            icon={faCheckCircle}
                                                                        />
                                                                    ) : (
                                                                        <FontAwesomeIcon
                                                                            className="checkChangePassword"
                                                                            style={{ color: '#fff' }}
                                                                            icon={faCheckCircle}
                                                                        />
                                                                    )}
                                                                </div>
                                                                {isNewPasswordVisible ? (
                                                                    <div
                                                                        style={{ padding: '0 10px' }}
                                                                        onClick={() => setIsNewPasswordVisible(false)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        style={{ padding: '0 10px' }}
                                                                        onClick={() => setIsNewPasswordVisible(true)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEye} />
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className="item_input_log">
                                                    <button
                                                        id="btn_save_password"
                                                        className="pri_button btn_log "
                                                        onClick={handleSubmit}
                                                    >
                                                        Đổi mật khẩu
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChangePassword;
