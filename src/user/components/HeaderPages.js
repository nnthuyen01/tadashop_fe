import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import CartAside from './CartAside';
import axios from 'axios';
import { API_URL } from '~/config/constant';

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
    const [searchInputValue, setSearchInputValue] = useState('');
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
        setSearchResult([]);
        setSearchInputValue('');
    };

    const handleModalStopOutSearchClick = (e) => {
        e.stopPropagation();
    };

    const [searchResult, setSearchResult] = useState([]);
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    let lastSearchInput = '';
    let timeoutId;

    const handleChangeInputSearch = (e) => {
        setSearchInputValue(e.target.value);
    };

    const callApi = () => {
        const currentSearchInput = searchInputValue.trim();
        if (currentSearchInput !== '' && currentSearchInput !== lastSearchInput) {
            // Nếu giá trị nhập không trống và khác lần nhập trước đó, gọi API
            const apiEndpoint = `${API_URL}products/list/queryName?query=${currentSearchInput}`;

            axios
                .get(apiEndpoint)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        setSearchResult(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi fetch dữ liệu từ API:', error);
                });

            // Cập nhật lần nhập cuối cùng
            lastSearchInput = currentSearchInput;
        } else if (currentSearchInput === '') setSearchResult([]);
    };

    useEffect(() => {
        // Đặt lại hẹn giờ mới sau 1 giây khi người dùng dừng nhập liệu
        timeoutId = setTimeout(() => {
            callApi();
        }, 1000);

        // Hủy bỏ hẹn giờ nếu có
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchInputValue]);
    const handleModalSearchClick = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        console.log({ searchInputValue });

        navigate(`/search?q=${searchInputValue}`, { forceRefresh: true });
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
                    <div className="container-search-header" onClick={handleModalStopOutSearchClick}>
                        <button
                            className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search"
                            onClick={hideModalSearch}
                        >
                            <img src="../assets/images/icons/icon-close2.png" alt="CLOSE" />
                        </button>

                        <form className="wrap-search-header flex-w p-l-15">
                            <button className="flex-c-m trans-04" onClick={handleModalSearchClick}>
                                <i className="zmdi zmdi-search"></i>
                            </button>
                            <input
                                id="searchInput"
                                className="plh3"
                                type="text"
                                name="search"
                                placeholder="Nhập sản phẩm cần tìm..."
                                value={searchInputValue}
                                autoComplete="off"
                                onChange={handleChangeInputSearch}
                            />
                        </form>
                        <div className="auto-suggest">
                            {searchResult.slice(0, 5).map((item, index) => (
                                <Link
                                    to={`/product-detail/${item.name}/${item.id}`}
                                    key={index}
                                    className="suggest-item"
                                >
                                    <div className="suggest-item-image-wrap">
                                        <img
                                            src={API_URL + 'products/images/' + item.imageFileName}
                                            loading="lazy"
                                            alt={item.name}
                                            className="suggest-item-image"
                                        ></img>
                                    </div>
                                    <div className="suggest-item-title">
                                        <span>{item.name}</span>
                                        <span> {formatNumberWithCommas(item.priceAfterDiscount)}₫</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
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
