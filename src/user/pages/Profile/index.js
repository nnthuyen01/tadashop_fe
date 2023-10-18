import React, { useState } from 'react';
import HeaderPages from '~/user/components/HeaderPages';
import { NavLink } from 'react-router-dom';

import './profile.scss';
function Profile() {
    const [openUpdateAvatar, setOpenUpdateAvatar] = useState(true);
    const [openUpdateFirstname, setOpenUpdateFirstname] = useState(true);
    const [openUpdateLastname, setOpenUpdateLastname] = useState(true);
    const [openUpdateEmail, setOpenUpdateEmail] = useState(true);
    const [openUpdatePhone, setOpenUpdatePhone] = useState(true);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />
            <section
                className="bg-img1 txt-center p-lr-15 p-tb-92"
                style={{ backgroundImage: "url('assets/images/bg-03.jpg')" }}
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
                                        <NavLink to="/profile" className="nav-link activeNavLink">
                                            Thông tin chung
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/changePassword" className="nav-link">
                                            Thay đổi mật khẩu
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" className="nav-link">
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
                            <div className="tit-row ltext-102">Thông tin cá nhân</div>
                            <div className="user-info">
                                <div className="item_fill_user">
                                    <div className="ctn_fill">
                                        <div className="label_fill">Ảnh đại diện</div>
                                        {openUpdateAvatar ? (
                                            <div className="main_txt">
                                                <span className="img_upload_c">T </span>
                                            </div>
                                        ) : (
                                            /* upload avatar */
                                            <div className="width_common box_upload_anh" id="box_upload">
                                                <input
                                                    type="hidden"
                                                    id="myvne_avatar_input"
                                                    name="myvne_avatar"
                                                    value
                                                />
                                                <div
                                                    className="width_common upload_complete"
                                                    style={{ display: 'flex' }}
                                                >
                                                    <span className="img_upload_c">
                                                        <img src="assets/images/avatartrong.png" alt="anh" />
                                                    </span>
                                                    <div className="item_input_log item_button_act">
                                                        <button
                                                            id="btn_select_avatar"
                                                            className="pri_button btn_lv2 has_transition"
                                                        >
                                                            Chọn lại ảnh
                                                        </button>
                                                        <button
                                                            id="btn_save_avatar"
                                                            className="pri_button btn_log has_transition"
                                                        >
                                                            Lưu thay đổi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {openUpdateAvatar ? (
                                            <div className="click_edit" onClick={() => setOpenUpdateAvatar(false)}>
                                                Thay ảnh đại diện
                                            </div>
                                        ) : (
                                            <div className="click_edit" onClick={() => setOpenUpdateAvatar(true)}>
                                                Đóng
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="item_fill_user">
                                    <div className="ctn_fill">
                                        <div className="label_fill">Tên</div>
                                        {openUpdateFirstname ? (
                                            <div className="main_txt">Thuyên</div>
                                        ) : (
                                            <div id="form_update_firstname" className="width_common box_edit_form">
                                                <div className="form_edit form_log">
                                                    <div className="item_input_log">
                                                        <p className="width_common tit_edit">Nhập tên mới</p>
                                                        <div style={{ position: 'relative' }}>
                                                            <input
                                                                type="text"
                                                                id="txtFirstname"
                                                                className="input_form"
                                                                placeholder="Nhập tên"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="item_input_log">
                                                        <button id="btn_save_password" className="pri_button btn_log ">
                                                            Đổi tên
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {openUpdateFirstname ? (
                                            <div className="click_edit" onClick={() => setOpenUpdateFirstname(false)}>
                                                Thay đổi
                                            </div>
                                        ) : (
                                            <div className="click_edit" onClick={() => setOpenUpdateFirstname(true)}>
                                                Đóng
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="item_fill_user">
                                    <div className="ctn_fill">
                                        <div className="label_fill">Họ</div>
                                        {openUpdateLastname ? (
                                            <div className="main_txt">Nguyễn Ngọc</div>
                                        ) : (
                                            <div id="form_update_lastname" className="width_common box_edit_form">
                                                <div className="form_edit form_log">
                                                    <div className="item_input_log">
                                                        <p className="width_common tit_edit">Nhập họ mới</p>
                                                        <div style={{ position: 'relative' }}>
                                                            <input
                                                                type="text"
                                                                id="txtLastname"
                                                                className="input_form"
                                                                placeholder="Nhập họ"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="item_input_log">
                                                        <button id="btn_save_lastname" className="pri_button btn_log ">
                                                            Đổi họ
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {openUpdateLastname ? (
                                            <div className="click_edit" onClick={() => setOpenUpdateLastname(false)}>
                                                Thay đổi
                                            </div>
                                        ) : (
                                            <div className="click_edit" onClick={() => setOpenUpdateLastname(true)}>
                                                Đóng
                                            </div>
                                        )}
                                    </div>
                                    <div className="item_fill_user">
                                        <div className="ctn_fill">
                                            <div className="label_fill">Email:</div>
                                            {openUpdateEmail ? (
                                                <div className="main_txt">nguyenvana@example.com</div>
                                            ) : (
                                                <div id="form_update_email" className="width_common box_edit_form">
                                                    <div className="form_edit form_log">
                                                        <div className="item_input_log">
                                                            <p className="width_common tit_edit">Nhập email mới</p>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="email"
                                                                    id="txtEmail"
                                                                    className="input_form"
                                                                    placeholder="Nhập email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="item_input_log">
                                                            <button id="btn_save_email" className="pri_button btn_log ">
                                                                Đổi email
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {openUpdateEmail ? (
                                                <div className="click_edit" onClick={() => setOpenUpdateEmail(false)}>
                                                    Thay đổi
                                                </div>
                                            ) : (
                                                <div className="click_edit" onClick={() => setOpenUpdateEmail(true)}>
                                                    Đóng
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="item_fill_user">
                                        <div className="ctn_fill">
                                            <div className="label_fill">Tài khoản:</div>
                                            <div className="main_txt">tada2k1</div>
                                        </div>
                                    </div>
                                    <div className="item_fill_user">
                                        <div className="ctn_fill">
                                            <div className="label_fill">Số điện thoại:</div>
                                            {openUpdatePhone ? (
                                                <div className="main_txt">1234567890</div>
                                            ) : (
                                                <div id="form_update_phone" className="width_common box_edit_form">
                                                    <div className="form_edit form_log">
                                                        <div className="item_input_log">
                                                            <p className="width_common tit_edit">Nhập số điện thoại</p>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="text"
                                                                    id="txtPhone"
                                                                    className="input_form"
                                                                    placeholder="Nhập số điện thoại"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="item_input_log">
                                                            <button
                                                                id="btn_save_number"
                                                                className="pri_button btn_log "
                                                            >
                                                                Đổi số điện thoại
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {openUpdatePhone ? (
                                                <div className="click_edit" onClick={() => setOpenUpdatePhone(false)}>
                                                    Thay đổi
                                                </div>
                                            ) : (
                                                <div className="click_edit" onClick={() => setOpenUpdatePhone(true)}>
                                                    Đóng
                                                </div>
                                            )}
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

export default Profile;
