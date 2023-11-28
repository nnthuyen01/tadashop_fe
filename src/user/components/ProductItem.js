import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import axios from 'axios';
import { API_URL } from '~/config/constant';

function ProductItem({ handleShowModal, title, loadmore, pagination }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [sort, setSort] = useState('id');
    const [currentPage, setCurrentPage] = useState(0); // Bắt đầu từ trang 0
    const [totalPage, setTotalPage] = useState(0); // Bắt đầu từ trang 0
    const itemsPerPage = 16;
    const League = {
        EPL: 'EPL',
        Laliga: 'Laliga',
        Bundesliga: 'Bundesliga',
        SeriaA: 'SeriaA',
        League1: 'League1',
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, sort]); // Fetch data when the currentPage changes

    const fetchData = () => {
        setLoading(true);

        // Sử dụng API endpoint của bạn
        const apiEndpoint = `${API_URL}products/find?query=&page=${currentPage}&size=${itemsPerPage}&sort=${sort}`;

        axios
            .get(apiEndpoint)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setProducts(response.data.content);
                    setTotalPage(response.data.totalPages);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
                setLoading(false);
            });
    };

    const handleRedirect = (name, id) => {
        navigate(`/product-detail/${name}/${id}`);
    };

    // Product
    // filter

    const topeContainerRef = useRef(null);
    const filterRef = useRef(null);
    const isotopeButtonRef = useRef(null);

    useEffect(() => {
        if (!loading) {
            const $topeContainer = topeContainerRef.current;
            const $filter = filterRef.current;
            const $isotopeButton = isotopeButtonRef.current;

            // Wait for all images inside $topeContainer to be loaded
            imagesLoaded($topeContainer, () => {
                // Init Isotope
                const isotope = new Isotope($topeContainer, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows',
                    percentPosition: true,
                    animationEngine: 'best-available',
                    masonry: {
                        columnWidth: '.isotope-item',
                    },
                });

                // Filter items on button click
                $filter.addEventListener('click', (event) => {
                    if (event.target.tagName === 'BUTTON') {
                        const filterValue = event.target.getAttribute('data-filter');

                        isotope.arrange({ filter: filterValue });
                    }
                });

                // Add click event listener to each isotope button
                $isotopeButton.querySelectorAll('button').forEach((button) => {
                    button.addEventListener('click', () => {
                        $isotopeButton.querySelectorAll('button').forEach((btn) => {
                            btn.classList.remove('how-active1');
                        });
                        button.classList.add('how-active1');
                    });
                });
            });
        }
    }, [loading]);

    // Pagination click handler
    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    // [ Filter / Search product ]
    const [showFilter, setShowFilter] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
        setShowSearch(false);
    };

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
        setShowFilter(false);
    };

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <>
            {/* <!-- Product --> */}
            <section className="bg0 p-t-23 p-b-100">
                <div className="container">
                    {/* title product */}
                    {title === true && (
                        <div className="p-b-10">
                            <h3 className="ltext-103 cl5">Danh Mục Sản Phẩm</h3>
                        </div>
                    )}
                    {/* header filter product */}
                    <div className="flex-w flex-sb-m p-b-52">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10" ref={filterRef}>
                            <div className="isotope-button" ref={isotopeButtonRef}>
                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                                    data-filter="*"
                                >
                                    Tất cả sản phẩm
                                </button>

                                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".EPL">
                                    Giải Ngoại Hạng Anh (EPL)
                                </button>

                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                    data-filter=".Laliga"
                                >
                                    Giải Tây Ban Nha (Laliga)
                                </button>

                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                    data-filter=".Bundesliga"
                                >
                                    Giải Đức (Bundesliga)
                                </button>

                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                    data-filter=".SeriaA"
                                >
                                    Giải Ý (Seria A)
                                </button>

                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                    data-filter=".League1"
                                >
                                    Giải Pháp (League 1)
                                </button>
                            </div>
                        </div>

                        <div className="flex-w flex-c-m m-tb-10">
                            <div
                                className={`flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter ${
                                    showFilter ? 'show-filter' : ''
                                }`}
                                onClick={handleFilterClick}
                            >
                                <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                                <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                Bộ Lọc
                            </div>

                            <div
                                className={`flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${
                                    showSearch ? 'show-search' : ''
                                }`}
                                onClick={handleSearchClick}
                            >
                                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                Tìm Kiếm
                            </div>
                        </div>

                        {/* <!-- Search product --> */}
                        <div
                            className="dis-none panel-search w-full p-t-10 p-b-15"
                            style={{ display: showSearch ? 'block' : 'none' }}
                        >
                            <div className="bor8 dis-flex p-l-15">
                                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                    <i className="zmdi zmdi-search"></i>
                                </button>
                                <input
                                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                                    type="text"
                                    name="search-product"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                        {/* <!-- Filter --> */}
                        <div
                            className="dis-none panel-filter w-full p-t-10"
                            style={{ display: showFilter ? 'block' : 'none' }}
                        >
                            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                <div className="filter-col1 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Sắp Xếp</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sort === 'id' ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSort('id');
                                                    setShowFilter(!showFilter);
                                                }}
                                            >
                                                Mặc định
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sort === 'id,desc' ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSort('id,desc');
                                                    setShowFilter(!showFilter);
                                                }}
                                            >
                                                Mới nhất
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sort === 'priceAfterDiscount,desc' ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSort('priceAfterDiscount,desc');
                                                    setShowFilter(!showFilter);
                                                }}
                                            >
                                                Giá: cao đên thấp
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sort === 'priceAfterDiscount' ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSort('priceAfterDiscount');
                                                    setShowFilter(!showFilter);
                                                }}
                                            >
                                                Giá: thấp đến cao
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Giá</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                All
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                0 vnđ - 100,000 vnđ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                100,000 vnđ - 200,000 vnđ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                200,000 vnđ - 300,000 vnđ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                300,000 vnđ - 500,000 vnđ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                500,000 vnđ+
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col3 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Size</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#222' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                S
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#4272d7' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                M
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#b3b3b3' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                L
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#00ad5f' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                XL
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#fa4251' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                XXL
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#aaa' }}>
                                                <i className="zmdi zmdi-circle-o"></i>
                                            </span>

                                            <Link to="#" className="filter-link stext-106 trans-04">
                                                XXXL
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Giải đấu</div>

                                    <div className="flex-w p-t-4 m-r--5">
                                        <Link
                                            to={`/product-leagues/${League.EPL}`}
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Ngoại Hạng Anh (ANH)
                                        </Link>

                                        <Link
                                            to={`/product-leagues/${League.Laliga}`}
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            La Liga (TÂY BAN NHA)
                                        </Link>

                                        <Link
                                            to={`/product-leagues/${League.Bundesliga}`}
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Bundesliga (ĐỨC)
                                        </Link>

                                        <Link
                                            to={`/product-leagues/${League.League1}`}
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Ligue 1 (Pháp)
                                        </Link>

                                        <Link
                                            to={`/product-leagues/${League.SeriaA}`}
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Serie A (Ý)
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* grid Product */}

                    {loading ? (
                        <div className="loading-indicator">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="row isotope-grid" ref={topeContainerRef}>
                            {products.map((item, index) => (
                                <div
                                    key={index}
                                    className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${
                                        item.league ? item.league : undefined
                                    }`}
                                >
                                    <div className="block2">
                                        <div
                                            className={`block2-pic hov-img0  ${item.discount ? 'label-discount' : ''}`}
                                            discount-label={item.discount ? `-${item.discount}%` : undefined}
                                        >
                                            <div
                                                className={`${item.isFeatured === true ? 'label-new' : ''}`}
                                                data-label={item.isFeatured === true ? 'HOT' : undefined}
                                            >
                                                <img
                                                    src={API_URL + 'products/images/' + item.imageFileName}
                                                    loading="lazy"
                                                    alt="IMG-PRODUCT"
                                                ></img>

                                                <Link
                                                    to="#"
                                                    className="block2-btn flex-c-m stext-103 cl0 size-102 bg1 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                                    onClick={() => handleShowModal(item.id)}
                                                >
                                                    Xem Nhanh
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="block2-txt flex-w flex-t p-t-14">
                                            <div className="block2-txt-child1 flex-col-l ">
                                                <div
                                                    onClick={() => handleRedirect(item.name, item.id)}
                                                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6 product-name"
                                                    style={{ cursor: 'pointer', fontSize: '16px' }}
                                                >
                                                    {item.name}
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <span
                                                        className="stext-105 cl3"
                                                        style={{
                                                            textDecoration: 'line-through',
                                                            verticalAlign: 'middle',
                                                            lineHeight: '20px',
                                                            color: '#12a700',
                                                        }}
                                                    >
                                                        {formatNumberWithCommas(item.originalPrice)}₫
                                                    </span>
                                                    <span
                                                        className="stext-103 cl3"
                                                        style={{
                                                            fontWeight: '600',
                                                            verticalAlign: 'middle',
                                                            lineHeight: '20px',
                                                            color: '#12a700',
                                                        }}
                                                    >
                                                        {formatNumberWithCommas(item.priceAfterDiscount)}
                                                        <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                                                            ₫
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="block2-txt-child2 flex-r p-t-3">
                                                <Link
                                                    to="#"
                                                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                                                >
                                                    <img
                                                        className="icon-heart1 dis-block trans-04"
                                                        src="assets/images/icons/icon-heart-01.png"
                                                        alt="ICON"
                                                    />
                                                    <img
                                                        className="icon-heart2 dis-block trans-04 ab-t-l"
                                                        src="assets/images/icons/icon-heart-02.png"
                                                        alt="ICON"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* <!-- Pagination --> */}
                    {pagination === true && (
                        <div className="flex-c-m flex-w w-full p-t-38">
                            {Array.from({ length: totalPage }, (_, i) => (
                                <Link
                                    key={i}
                                    to="#"
                                    className={`flex-c-m how-pagination1 trans-04 m-all-7 ${
                                        currentPage === i ? 'active-pagination1' : ''
                                    }`}
                                    onClick={() => handlePaginationClick(i)}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* <!-- Load more --> */}
                    {loadmore === true && (
                        <div className="flex-c-m flex-w w-full p-t-45">
                            <Link
                                to="/shop"
                                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
                            >
                                {' '}
                                Tải thêm{' '}
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ProductItem;
