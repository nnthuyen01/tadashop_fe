import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import CartAside from './CartAside';
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

    const [totalItem, setTotalItem] = useState(0);
    const quantityItem = (quantity) => {
        setTotalItem(quantity);
    };
    return (
        <Fragment>
            {/* <!-- Header --> */}
            <header className="header-v4">
                {/* <!-- Header desktop --> */}
                <div className={`container-menu-desktop ${isFixed ? 'fix-menu-desktop' : ''}`}>
                    <div className="wrap-menu-desktop how-shadow1">
                        <nav className="limiter-menu-desktop container">
                            {/* <!-- Logo desktop -->		 */}
                            <Link to="/" className="logo">
                                <img src={images.logo} alt="IMG-LOGO" />
                            </Link>

                            {/* <!-- Menu desktop --> */}
                            <div className="menu-desktop">
                                <ul className="main-menu">
                                    <li>
                                        <Link to="/">Trang Chủ</Link>
                                    </li>

                                    <li className="label1" data-label1="hot">
                                        <Link to="/shop">Cửa hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="/cart">Giỏ hàng</Link>
                                    </li>

                                    <li>
                                        <Link to="/blog">Bài viết</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">Giới thiệu</Link>
                                    </li>

                                    <li>
                                        <Link to="/contact">Liên hệ</Link>
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
                                            className={`icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 ${
                                                totalItem > 0 ? 'icon-header-noti' : ''
                                            } js-show-cart`}
                                            data-notify={totalItem}
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
                                                            <Link to="#">#{localStorage.getItem('auth_name')}</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/profile/${localStorage.getItem('auth_name')}`}>
                                                                Thông tin chung
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={`/changePassword/${localStorage.getItem(
                                                                    'auth_name',
                                                                )}`}
                                                            >
                                                                Đổi mật khẩu
                                                            </Link>
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
                            <img src={images.logo} alt="IMG-LOGO" />
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
                                <Link to="/">Liên hệ</Link>
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
                                <Link to="/about">Giới thiệu</Link>
                            </li>

                            <li>
                                <Link to="/blog">Bài viết</Link>
                            </li>

                            <li>
                                <Link to="/cart">Giỏ hàng</Link>
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

            <CartAside
                handleHideHeaderCart={handleHideHeaderCart}
                showHeaderCart={showHeaderCart}
                quantityItem={quantityItem}
            />
        </Fragment>
    );
}

export default HeaderPages;
