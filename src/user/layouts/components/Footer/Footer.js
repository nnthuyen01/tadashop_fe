import React, { useState, useEffect, Fragment, useRef } from 'react';

function Footer() {
    return (
        /* <!-- Footer --> */
        <Fragment>
            <footer className="bg3 p-t-75 p-b-32">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 ">
                            <h4 className="stext-301 cl0 p-b-30">Danh mục sản phẩm</h4>

                            <ul>
                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Tất cả
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        New Arrival
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Giải đấu
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Thương hiệu
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-10">
                            <h4 className="stext-301 cl0 p-b-30">Hỗ trợ </h4>

                            <ul>
                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Tài khoản
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Chính sách vận chuyển
                                    </a>
                                </li>
                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        Chính sách bảo hành
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl2 trans-04">
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-10">
                            <h4 className="stext-301 cl0 p-b-30">Liên hệ</h4>

                            <ul>
                                <li className="p-b-10">
                                    <div className="stext-107 cl7 trans-04">Hotline</div>
                                    <p style={{ fontWeight: 'bolder' }}>1900 201 201</p>
                                </li>

                                <li className="p-b-10">
                                    <div className="stext-107 cl7 trans-04">Thứ Hai - Chủ Nhật</div>
                                    <p style={{ fontWeight: 'bolder' }}>09:30 ~ 21:30</p>
                                </li>

                                <li className="p-b-10">
                                    <div className="stext-107 cl7 trans-04">Email liên hệ công việc</div>
                                    <form>
                                        <div className="wrap-input1 w-full p-b-4">
                                            <input
                                                className="input1 bg-none plh1 stext-107 cl7"
                                                type="text"
                                                name="email"
                                                placeholder="tadashopasia@gmail.com"
                                            />
                                            <div className="focus-input1 trans-04"></div>
                                        </div>

                                        <div className="p-t-18">
                                            <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                                                Gửi Mail
                                            </button>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-50">
                            <h4 className="stext-301 cl0 p-b-30">Cửa hàng</h4>
                            <div className="stext-107 cl7 trans-04">
                                01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
                            </div>
                            <div className="p-t-27">
                                <a href="#" className="fs-18 cl7 hov-cl2 trans-04 m-r-16">
                                    <i className="fa fa-facebook"></i>
                                </a>

                                <a href="#" className="fs-18 cl7 hov-cl2 trans-04 m-r-16">
                                    <i className="fa fa-instagram"></i>
                                </a>

                                <a href="#" className="fs-18 cl7 hov-cl2 trans-04 m-r-16">
                                    <i className="fa fa-youtube-play"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex-c-m flex-w p-b-10">
                            <h3 className="stext-301 cl0 ">Về Chúng Tôi</h3>
                        </div>

                        <p className="stext-107 cl6 txt-center">
                            <a href="https://colorlib.com" target="_blank">
                                TADA STORE
                            </a>{' '}
                            <i className="fa fa-heart-o" aria-hidden="true"></i> Dress Like A Pro, Play Like A Champion!
                        </p>

                        <div className="flex-c-m flex-w p-b-18">
                            <div className="stext-107 cl7 trans-04">
                                HỘ KINH DOANH Tada
                                <br />
                                GPKD được cấp bởi Cục Cảnh sát QLHC & TTXH <br />
                                Mä só thuê: ABC1234567
                                <br />
                                Người đại diện: Nguyễn Ngọc Thuyên
                            </div>
                            <div className="m-l-10">
                                <img
                                    style={{
                                        width: 'auto',
                                        maxHeight: '80px',
                                    }}
                                    src="assets/images/logoBoCongThuong.png"
                                    alt="daThongBao"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;
