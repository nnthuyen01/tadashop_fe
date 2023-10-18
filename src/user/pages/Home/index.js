import React, { useState, useEffect, Fragment } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import ProductItem from '~/user/components/ProductItem';
import ModalProduct from '~/user/components/ModalProduct';
import Banners from '~/user/components/Banners';
import SliderHome from '~/user/components/SliderHome';
import Sidebar from '~/user/components/Sidebar';
import CartAside from '~/user/components/CartAside';

function Home() {
    const navigate = useNavigate();
    const currentUser = !!localStorage.getItem('auth_token');
    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        navigate('/');
    };

    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    // header
    const [isFixed, setIsFixed] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
    const handleShowMenuMobile = () => {
        if (!isShowMenuMobile) setIsShowMenuMobile(true);
        else setIsShowMenuMobile(false);
    };

    // sidebar
    const [showSidebar, setShowSidebar] = useState(false);

    const handleShowSidebar = () => {
        setShowSidebar(true);
    };
    const handleHideSidebar = () => {
        setShowSidebar(false);
    };

    // cart
    const [showHeaderCart, setShowHeaderCart] = useState(false);

    const handleShowHeaderCart = () => {
        setShowHeaderCart(true);
    };
    const handleHideHeaderCart = () => {
        setShowHeaderCart(false);
    };

    // Product

    // Show Modal1 Product
    const [showModal, setShowModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleShowModal = () => {
        setScrollPosition(window.scrollY);
        setShowModal(true);
    };

    const handleHideModal = () => {
        window.scrollTo(0, scrollPosition);
        setShowModal(false);
    };

    return (
        <Fragment>
            {/* Header */}
            <header className="header-v3">
                {/* <!-- Header desktop --> */}
                <div className={`container-menu-desktop trans-03 ${isFixed ? 'fix-menu-desktop' : ''}`}>
                    <div className="wrap-menu-desktop">
                        <nav className="limiter-menu-desktop p-l-45">
                            {/* <!-- Logo desktop -->		 */}
                            <Link to="/" className="logo">
                                <img src="assets\images\icons\Logo.png" alt="IMG-LOGO" />
                            </Link>

                            {/* <!-- Menu desktop --> */}
                            <div className="menu-desktop">
                                <ul className="main-menu">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>

                                    <li className="label1" data-label1="hot">
                                        <Link to="/shop">Shop</Link>
                                    </li>

                                    <li>
                                        <Link to="/cart">Cart</Link>
                                    </li>
                                    <li>
                                        <Link to="/blog">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>

                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* <!-- Icon header --> */}
                            <div className="wrap-icon-header flex-w flex-r-m h-full">
                                {currentUser ? (
                                    <>
                                        <div className="flex-c-m h-full p-r-25 bor6">
                                            <div
                                                className="icon-header-item cl0 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart "
                                                onClick={handleShowHeaderCart}
                                                data-notify="2"
                                            >
                                                <i className="zmdi zmdi-shopping-cart"></i>
                                            </div>
                                        </div>
                                        <div className="flex-c-m h-full p-l-20 p-r-20 bor6">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    cursor: 'pointer',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                }}
                                            >
                                                <div className="account-menu">
                                                    <div className="icon-header-item cl0 hov-cl1 trans-04 p-lr-11">
                                                        <i className="zmdi zmdi-account-circle"></i>
                                                    </div>
                                                    <ul className="sub-account-menu">
                                                        <li className="header-sub-account-menu">
                                                            <Link to="#">Nguyễn Ngọc Thuyên</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/profile">Thông tin chung</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/changePassword">Đổi mật khẩu</Link>
                                                        </li>
                                                        <li className="footer-sub-account-menu" onClick={handleLogout}>
                                                            <Link to="/">Đăng xuất</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-c-m h-full p-l-20 p-r-20 bor6">
                                            <Link
                                                className="hov-cl1 trans-04"
                                                to="/login"
                                                style={{
                                                    display: 'flex',
                                                    cursor: 'pointer',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                }}
                                            >
                                                <div className="icon-header-item cl0 hov-cl1 trans-04 p-lr-11 js-show-cart ">
                                                    <i className="zmdi zmdi-account-circle"></i>
                                                </div>
                                                Đăng nhập/ đăng ký
                                            </Link>
                                        </div>
                                    </>
                                )}
                                <div className="flex-c-m h-full p-lr-19">
                                    <div
                                        className="icon-header-item cl0 hov-cl1 trans-04 p-lr-11 js-show-sidebar"
                                        onClick={handleShowSidebar}
                                    >
                                        <i className="zmdi zmdi-menu"></i>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* <!-- Header Mobile --> */}
                <div className="wrap-header-mobile">
                    {/* <!-- Logo moblie -->		 */}
                    <div className="logo-mobile">
                        <a href="index.html">
                            <img src="assets/images/icons/Logo.png" alt="IMG-LOGO" />
                        </a>
                    </div>

                    {/* <!-- Icon header --> */}
                    <div className="wrap-icon-header flex-w flex-r-m h-full m-r-15">
                        <div className="flex-c-m h-full p-r-5">
                            <div
                                className="icon-header-item cl0 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart"
                                onClick={handleShowHeaderCart}
                                data-notify="2"
                            >
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Button show menu --> */}
                    <div className="btn-show-menu-mobile hamburger hamburger--squeeze" onClick={handleShowMenuMobile}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </div>
                </div>

                {/* <!-- Menu Mobile --> */}
                {isShowMenuMobile && (
                    <div className="menu-mobile">
                        <ul className="main-menu-m">
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/shop" className="label1 rs1" data-label1="hot">
                                    Shop
                                </Link>
                                <ul className="sub-menu-m">
                                    <li>
                                        <a href="index.html">Homepage 1</a>
                                    </li>
                                    <li>
                                        <a href="home-02.html">Homepage 2</a>
                                    </li>
                                    <li>
                                        <a href="home-03.html">Homepage 3</a>
                                    </li>
                                </ul>
                                <span className="arrow-main-menu-m">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </span>
                            </li>

                            <li>
                                <Link to="/about">About</Link>
                            </li>

                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>

                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>

                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        </ul>
                    </div>
                )}
                {/* <!-- Modal Search --> */}
                <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
                    <button className="flex-c-m btn-hide-modal-search trans-04">
                        <i className="zmdi zmdi-close"></i>
                    </button>

                    <form className="container-search-header">
                        <div className="wrap-search-header">
                            <input className="plh0" type="text" name="search" placeholder="Search..." />

                            <button className="flex-c-m trans-04">
                                <i className="zmdi zmdi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </header>

            {/* <!-- Sidebar --> */}
            <Sidebar handleHideSidebar={handleHideSidebar} showSidebar={showSidebar} />
            {/* {showSidebar && <Sidebar handleHideSidebar={handleHideSidebar} />} */}

            {/* <!--  aside Cart --> */}
            <CartAside handleHideHeaderCart={handleHideHeaderCart} showHeaderCart={showHeaderCart} />

            {/* <!-- Slider --> */}
            <SliderHome />

            {/* <!-- Banners --> */}
            <Banners />

            {/* <!-- Product --> */}
            <ProductItem handleShowModal={handleShowModal} title={true} pagination={true} />

            {/* <!-- Modal1 --> */}
            {showModal && <ModalProduct handleHideModal={handleHideModal} />}

            <section className="hero-section">
                <div className="container">
                    <div className="card-container">
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur1.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí thiết kế</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur2.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí In Tên Số</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur3.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí Giao Hàng</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur4.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Đa dạng chất vãi</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}

            {/* <!-- Back to top --> */}
        </Fragment>
    );
}

export default Home;
