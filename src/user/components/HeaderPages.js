import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderPages() {
    // header
    const navigate = useNavigate();
    const currentUser = !!localStorage.getItem('auth_token');
    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        navigate('/');
    };

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
    // search
    const [showModalS, setShowModalS] = useState(false);

    const showModalSearch = () => {
        setShowModalS(true);
    };

    const hideModalSearch = () => {
        setShowModalS(false);
    };

    const handleModalSearchClick = (e) => {
        e.stopPropagation();
    };

    // cart
    const [showHeaderCart, setShowHeaderCart] = useState(false);
    const handleShowHeaderCart = () => {
        setShowHeaderCart(true);
    };

    const handleHideHeaderCart = () => {
        setShowHeaderCart(false);
    };
    return (
        <Fragment>
            {/* <!-- Header --> */}
            <header className="header-v4">
                {/* <!-- Header desktop --> */}
                <div className={`container-menu-desktop ${isFixed ? 'fix-menu-desktop' : ''}`}>
                    {/* <!-- Topbar --> */}
                    {/* <div className="top-bar">
                        <div className="content-topbar flex-sb-m h-full container">
                            <div className="left-top-bar">Free shipping for standard order over $100</div>

                            <div className="right-top-bar flex-w h-full">
                                <a href="#" className="flex-c-m trans-04 p-lr-25">
                                    Help & FAQs
                                </a>

                                <a href="#" className="flex-c-m trans-04 p-lr-25">
                                    My Account
                                </a>

                                <a href="#" className="flex-c-m trans-04 p-lr-25">
                                    EN
                                </a>

                                <a href="#" className="flex-c-m trans-04 p-lr-25">
                                    USD
                                </a>
                            </div>
                        </div>
                    </div> */}

                    <div className="wrap-menu-desktop how-shadow1">
                        <nav className="limiter-menu-desktop container">
                            {/* <!-- Logo desktop -->		 */}
                            <Link to="/" className="logo">
                                <img src="../assets/images/icons/Logo.png" alt="IMG-LOGO" />
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
                            <div className="wrap-icon-header flex-w flex-r-m">
                                {currentUser ? (
                                    <>
                                        <div
                                            className="icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search"
                                            onClick={showModalSearch}
                                            style={{ opacity: showModalS ? 0 : 1 }}
                                        >
                                            <i className="zmdi zmdi-search"></i>
                                        </div>

                                        <div
                                            className="icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                                            data-notify="2"
                                            onClick={handleShowHeaderCart}
                                        >
                                            <i className="zmdi zmdi-shopping-cart"></i>
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
                                        <div
                                            className="icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search"
                                            onClick={showModalSearch}
                                            style={{ opacity: showModalS ? 0 : 1 }}
                                        >
                                            <i className="zmdi zmdi-search"></i>
                                        </div>

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
                            </div>
                        </nav>
                    </div>
                </div>

                {/* <!-- Header Mobile --> */}
                <div className="wrap-header-mobile">
                    {/* <!-- Logo moblie -->		 */}
                    <div className="logo-mobile">
                        <Link to="/">
                            <img src="../assets/images/icons/Logo.png" alt="IMG-LOGO" />
                        </Link>
                    </div>

                    {/* <!-- Icon header --> */}
                    <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                        <div className="icon-header-item cl0 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                            <i className="zmdi zmdi-search"></i>
                        </div>

                        <div
                            className="icon-header-item cl0 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                            onClick={handleShowHeaderCart}
                            data-notify="2"
                        >
                            <i className="zmdi zmdi-shopping-cart"></i>
                        </div>

                        {/* <a
                            href="#"
                            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
                            data-notify="0"
                        >
                            <i className="zmdi zmdi-favorite-outline"></i>
                        </a> */}
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
                <div
                    className={`modal-search-header flex-c-m trans-04 js-hide-modal-search ${
                        showModalS ? 'show-modal-search' : ''
                    }  `}
                    onClick={hideModalSearch}
                >
                    <div className="container-search-header" onClick={handleModalSearchClick}>
                        <button
                            className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search"
                            onClick={hideModalSearch}
                        >
                            <img src="../assets/images/icons/icon-close2.png" alt="CLOSE" />
                        </button>

                        <form className="wrap-search-header flex-w p-l-15">
                            <button className="flex-c-m trans-04">
                                <i className="zmdi zmdi-search"></i>
                            </button>
                            <input className="plh3" type="text" name="search" placeholder="Search..." />
                        </form>
                    </div>
                </div>
            </header>

            {/* <!-- Cart --> */}
            <div className={`wrap-header-cart js-panel-cart ${showHeaderCart ? 'show-header-cart' : ''}`}>
                <div className="s-full js-hide-cart" onClick={handleHideHeaderCart}></div>

                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Cart</span>

                        <div
                            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart "
                            onClick={handleHideHeaderCart}
                        >
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    <div className="header-cart-content flex-w js-pscroll">
                        <ul className="header-cart-wrapitem w-full">
                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="../assets/images/AoMu1.jpg" alt="IMG" />
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        White Shirt Pleat
                                    </a>

                                    <span className="header-cart-item-info">1 x $19.00</span>
                                </div>
                            </li>

                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="../assets/images/AoMu1_2.jpg" alt="IMG" />
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        Converse All Star
                                    </a>

                                    <span className="header-cart-item-info">1 x $39.00</span>
                                </div>
                            </li>

                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="../assets/images/AoMu1_1.jpg" alt="IMG" />
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        Nixon Porter Leather
                                    </a>

                                    <span className="header-cart-item-info">1 x $17.00</span>
                                </div>
                            </li>
                        </ul>

                        <div className="w-full">
                            <div className="header-cart-total w-full p-tb-40">Total: $75.00</div>

                            <div className="header-cart-buttons flex-w w-full">
                                <a
                                    href="shoping-cart.html"
                                    className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                                >
                                    View Cart
                                </a>

                                <a
                                    href="shoping-cart.html"
                                    className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                                >
                                    Check Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HeaderPages;
