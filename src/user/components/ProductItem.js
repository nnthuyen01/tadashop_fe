import React, { useLayoutEffect, useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

function ProductItem({ handleShowModal, title, loadmore, pagination }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/product-detail');
    };

    const products = [
        {
            dataFilter: 'women',
            tag: 'New',
            img: 'assets/images/AoMu1.jpg',
            name: 'Esprit Ruffle Shirt',
            price: '$16.64',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoMu2.jpg',
            name: 'Herschel supply',
            price: '$35.31',
        },
        {
            dataFilter: 'men',
            tag: '',
            img: 'assets/images/AoMu3.jpg',
            name: 'Only Check Trouser',
            price: '$25.50',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoAC1.jpg',
            name: 'Classic Trench Coat',
            price: '$75.00',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoAC2.jpg',
            name: 'Front Pocket Jumper',
            price: '$34.75',
        },
        {
            dataFilter: 'watches',
            tag: '',
            img: 'assets/images/AoAtletico1.jpg',
            name: 'Vintage Inspired Classic',
            price: '$93.20',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoArs1.jpg',
            name: 'Shirt in Stretch Cotton',
            price: '$52.66',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoArs2.jpg',
            name: 'Pieces Metallic Printed',
            price: '$18.96',
        },
        {
            dataFilter: 'shoes',
            tag: '',
            img: 'assets/images/AoArs3.jpg',
            name: 'Converse All Star Hi Plimsolls',
            price: '$75.00',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoAston1.jpg',
            name: 'Femme T-Shirt In Stripe',
            price: '$25.85',
        },
        {
            dataFilter: 'men',
            tag: '',
            img: 'assets/images/AoAston2.jpg',
            name: 'Herschel supply',
            price: '$63.16',
        },
        {
            dataFilter: 'men',
            tag: '',
            img: 'assets/images/AoBarce1.jpg',
            name: 'Herschel supply',
            price: '$63.15',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoBarce2.jpg',
            name: 'T-Shirt with Sleeve',
            price: '$18.49',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoBayern1.jpg',
            name: 'Pretty Little Thing',
            price: '$54.79',
        },
        {
            dataFilter: 'watches',
            tag: '',
            img: 'assets/images/AoBayern2.jpg',
            name: 'Mini Silver Mesh Watch',
            price: '$86.85',
        },
        {
            dataFilter: 'women',
            tag: '',
            img: 'assets/images/AoBayern3.jpg',
            name: 'Square Neck Back',
            price: '$29.64',
        },
    ];

    // Product
    // filter

    const topeContainerRef = useRef(null);
    const filterRef = useRef(null);
    const isotopeButtonRef = useRef(null);

    useEffect(() => {
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
    }, []);

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

    return (
        <>
            {/* <!-- Product --> */}
            <section className="bg0 p-t-23 p-b-100">
                <div className="container">
                    {/* title product */}
                    {title === true && (
                        <div className="p-b-10">
                            <h3 className="ltext-103 cl5">Product Overview</h3>
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
                                    All Products
                                </button>

                                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women">
                                    Women
                                </button>

                                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".men">
                                    Men
                                </button>

                                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".bag">
                                    Bag
                                </button>

                                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".shoes">
                                    Shoes
                                </button>

                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                    data-filter=".watches"
                                >
                                    Watches
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
                                Filter
                            </div>

                            <div
                                className={`flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${
                                    showSearch ? 'show-search' : ''
                                }`}
                                onClick={handleSearchClick}
                            >
                                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                Search
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
                                    <div className="mtext-102 cl2 p-b-15">Sort By</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Default
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Popularity
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Average rating
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                Newness
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Price: Low to High
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Price: High to Low
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Price</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                All
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $0.00 - $50.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $50.00 - $100.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $100.00 - $150.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $150.00 - $200.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $200.00+
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col3 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Color</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#222' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Black
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#4272d7' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                Blue
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#b3b3b3' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Grey
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#00ad5f' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Green
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#fa4251' }}>
                                                <i className="zmdi zmdi-circle"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Red
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <span className="fs-15 lh-12 m-r-6" style={{ color: '#aaa' }}>
                                                <i className="zmdi zmdi-circle-o"></i>
                                            </span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                White
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Tags</div>

                                    <div className="flex-w p-t-4 m-r--5">
                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Fashion
                                        </a>

                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Lifestyle
                                        </a>

                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Denim
                                        </a>

                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Streetstyle
                                        </a>

                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            Crafts
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* grid Product */}

                    <div className="row isotope-grid" ref={topeContainerRef}>
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${
                                    item.dataFilter ? item.dataFilter : undefined
                                }`}
                            >
                                {/* <!-- Block2 --> */}
                                <div className="block2">
                                    <div
                                        className={`block2-pic hov-img0 ${item.tag ? 'label-new' : ''}`}
                                        data-label={item.tag ? item.tag : undefined}
                                    >
                                        <img src={item.img} alt="IMG-PRODUCT" />

                                        <a
                                            href="#"
                                            className="block2-btn flex-c-m stext-103 cl0 size-102 bg1 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                            onClick={handleShowModal}
                                        >
                                            Quick View
                                        </a>
                                    </div>

                                    <div className="block2-txt flex-w flex-t p-t-14">
                                        <div className="block2-txt-child1 flex-col-l ">
                                            <div
                                                // to="product-detail"
                                                onClick={handleRedirect}
                                                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {item.name}
                                            </div>

                                            <span className="stext-105 cl3">{item.price}</span>
                                        </div>

                                        <div className="block2-txt-child2 flex-r p-t-3">
                                            <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
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
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <!-- Pagination --> */}
                    {pagination === true && (
                        <div className="flex-c-m flex-w w-full p-t-38">
                            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1">
                                1
                            </a>

                            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
                                2
                            </a>
                        </div>
                    )}

                    {/* <!-- Load more --> */}
                    {loadmore === true && (
                        <div className="flex-c-m flex-w w-full p-t-45">
                            <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                                {' '}
                                Load More{' '}
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ProductItem;
