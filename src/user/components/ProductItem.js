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
    const itemsPerPage = 20;

    const [defaultBrands, setDefaultBrands] = useState([]);
    const [sortBrands, setSortBrands] = useState([]);

    const handleSortBrandToggle = (brand) => {
        const brandIndex = sortBrands.findIndex((item) => item.name === brand.name);

        // Check if the brand is already in the array
        if (brandIndex !== -1 && sortBrands.length === 3) {
            setSortBrands(sortBrands.filter((item) => item.name === brand.name));
        } else if (brandIndex !== -1 && sortBrands.length === 1) {
            setSortBrands(defaultBrands);
        } else if (brandIndex !== -1) {
            setSortBrands(sortBrands.filter((item) => item.name !== brand.name));
        } else {
            setSortBrands([...sortBrands, brand]);
        }
    };
    // console.log(sortBrands);
    // const [sortBrands, setSortBrands] = useState(['Adidas', 'Puma', 'Nike']);
    // const handleSortBrandToggle = (brand) => {
    //     // Check if the brand is already in the array
    //     if (sortBrands.includes(brand) && sortBrands.length === 3) {
    //         setSortBrands(sortBrands.filter((item) => item === brand));
    //     } else if (sortBrands.includes(brand) && sortBrands.length === 1) {
    //         // If yes, remove it
    //         setSortBrands(['Adidas', 'Puma', 'Nike']);
    //     } else if (sortBrands.includes(brand)) {
    //         // If yes, remove it
    //         setSortBrands(sortBrands.filter((item) => item !== brand));
    //     } else {
    //         // If no, add it
    //         setSortBrands([...sortBrands, brand]);
    //     }
    // };

    const [sortTypes, setSortTypes] = useState(['Home', 'Away', 'Third', 'Goalkeeper']);

    const handleSortTypeToggle = (type) => {
        if (sortTypes.includes(type) && sortTypes.length === 4) {
            setSortTypes(sortTypes.filter((item) => item === type));
        } else if (sortTypes.includes(type) && sortTypes.length === 1) {
            // If yes, remove it
            setSortTypes(['Home', 'Away', 'Third', 'Goalkeeper']);
        }
        // Check if the type is already in the array
        else if (sortTypes.includes(type)) {
            // If yes, remove it
            setSortTypes(sortTypes.filter((item) => item !== type));
        } else {
            // If no, add it
            setSortTypes([...sortTypes, type]);
        }
    };

    const [sortSexs, setSortSexs] = useState(['Men', 'Women']);
    const handleSortSexToggle = (sex) => {
        if (sortSexs.includes(sex) && sortSexs.length === 2) {
            setSortSexs(sortSexs.filter((item) => item === sex));
        } else if (sortSexs.includes(sex) && sortSexs.length === 1) {
            // If yes, remove it
            setSortSexs(['Men', 'Women']);
        }
        // Check if the type is already in the array
        else if (sortSexs.includes(sex)) {
            // If yes, remove it
            setSortSexs(sortSexs.filter((item) => item !== sex));
        } else {
            // If no, add it
            setSortSexs([...sortSexs, sex]);
        }
    };

    const [sortPrices, setSortPrices] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const handleSortPriceToggle = (price) => {
        if (sortPrices.includes(price)) {
            // If yes, remove it
            setSortPrices([]);
        } else {
            // If no, add it
            setSortPrices([price]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, sort, sortBrands, sortTypes, sortSexs, minPrice, maxPrice]); // Fetch data when changes
    const formatClassName = (name) => {
        return name
            .toLowerCase() // Chuyển đổi thành chữ thường
            .replace(/\s+/g, '') // Xóa khoảng trắng
            .normalize('NFD') // Loại bỏ dấu
            .replace(/[\u0300-\u036f]/g, ''); // Xóa các dấu thanh
    };
    const [League, setLeague] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + 'league')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setLeague(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
        axios
            .get(API_URL + 'brand')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setDefaultBrands(response.data);
                    setSortBrands(response.data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);

    const fetchData = () => {
        setLoading(true);

        const brandNames = sortBrands.map((brand) => brand.name).join(', ');

        const apiEndpoint = `${API_URL}products/listFilter?brand=${brandNames}
          &kitType=${sortTypes.join(', ')}
          &gender=${sortSexs.join(', ')}
          &minPrice=${minPrice}
          &maxPrice=${maxPrice}
          &page=${currentPage}&size=${itemsPerPage}&sort=${sort}`;

        axios
            .get(apiEndpoint)
            .then((response) => {
                if (response.status === 200) {
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

    // filter

    const topeContainerRef = useRef(null);
    const filterRef = useRef(null);
    const isotopeButtonRef = useRef(null);
    useEffect(() => {
        if (!loading) {
            const $topeContainer = topeContainerRef.current;
            const $filter = filterRef.current;
            const $isotopeButton = isotopeButtonRef.current;

            // Delay execution by 0.5 seconds
            const delay = 500; // 0.5 seconds
            const timeoutId = setTimeout(() => {
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
            }, delay);

            // Clear the timeout on component unmount or dependency change
            return () => clearTimeout(timeoutId);
        }
    }, [loading]);

    // useEffect(() => {
    //     if (!loading) {
    //         const $topeContainer = topeContainerRef.current;
    //         const $filter = filterRef.current;
    //         const $isotopeButton = isotopeButtonRef.current;

    //         // Wait for all images inside $topeContainer to be loaded
    //         imagesLoaded($topeContainer, () => {
    //             // Init Isotope
    //             const isotope = new Isotope($topeContainer, {
    //                 itemSelector: '.isotope-item',
    //                 layoutMode: 'fitRows',
    //                 percentPosition: true,
    //                 animationEngine: 'best-available',
    //                 masonry: {
    //                     columnWidth: '.isotope-item',
    //                 },
    //             });

    //             // Filter items on button click
    //             $filter.addEventListener('click', (event) => {
    //                 if (event.target.tagName === 'BUTTON') {
    //                     const filterValue = event.target.getAttribute('data-filter');

    //                     isotope.arrange({ filter: filterValue });
    //                 }
    //             });

    //             // Add click event listener to each isotope button
    //             $isotopeButton.querySelectorAll('button').forEach((button) => {
    //                 button.addEventListener('click', () => {
    //                     $isotopeButton.querySelectorAll('button').forEach((btn) => {
    //                         btn.classList.remove('how-active1');
    //                     });
    //                     button.classList.add('how-active1');
    //                 });
    //             });
    //         });
    //     }
    // }, [loading]);

    // Pagination click handler
    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    // [ Filter / Search product ]
    const [showFilter, setShowFilter] = useState(false);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
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
                    <div className="flex-w flex-sb-m p-b-30">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10" ref={filterRef}>
                            <div className="isotope-button" ref={isotopeButtonRef}>
                                <button
                                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                                    data-filter="*"
                                >
                                    Tất cả sản phẩm
                                </button>

                                {League.map((item, index) => (
                                    <button
                                        key={index}
                                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                        data-filter={`.${formatClassName(item.name)}`}
                                    >
                                        Giải {item.name}
                                    </button>
                                ))}
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
                        </div>

                        {/* <!-- Filter --> */}
                        <div
                            className="dis-none panel-filter w-full p-t-10"
                            style={{ display: showFilter ? 'block' : 'none' }}
                        >
                            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Xếp theo</div>

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
                                    <div className="mtext-102 cl2 p-b-15">Thương hiệu</div>

                                    {/* <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortBrands.length === 3 ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSortBrands(['Adidas', 'Puma', 'Nike']);
                                                }}
                                            >
                                                All
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortBrands.includes('Adidas') && sortBrands.length !== 3
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortBrandToggle('Adidas');
                                                }}
                                            >
                                                Adidas
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortBrands.includes('Nike') && sortBrands.length !== 3
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortBrandToggle('Nike');
                                                }}
                                            >
                                                Nike
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortBrands.includes('Puma') && sortBrands.length !== 3
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortBrandToggle('Puma');
                                                }}
                                            >
                                                Puma
                                            </Link>
                                        </li>
                                    </ul> */}

                                    <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortBrands.length === 3 ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSortBrands(defaultBrands);
                                                }}
                                            >
                                                All
                                            </Link>
                                        </li>

                                        {defaultBrands.map((item, index) => (
                                            <li key={index} className="p-b-6">
                                                <img
                                                    src={API_URL + 'brand/logo/' + item.logo}
                                                    alt={item.name}
                                                    style={{ height: '20px', marginRight: '5px' }}
                                                />
                                                <Link
                                                    to="#"
                                                    className={`filter-link stext-106 trans-04 ${
                                                        sortBrands.some((brand) => brand.name === item.name) &&
                                                        sortBrands.length !== 3
                                                            ? 'filter-link-active'
                                                            : ''
                                                    }`}
                                                    onClick={() => {
                                                        handleSortBrandToggle(item);
                                                    }}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Loại Áo</div>
                                    <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortTypes.length === 4 ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSortTypes(['Home', 'Away', 'Third', 'Goalkeeper']);
                                                }}
                                            >
                                                All
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortTypes.includes('Home') && sortTypes.length !== 4
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortTypeToggle('Home');
                                                }}
                                            >
                                                Sân nhà
                                            </Link>
                                        </li>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortTypes.includes('Away') && sortTypes.length !== 4
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortTypeToggle('Away');
                                                }}
                                            >
                                                Sân Khách
                                            </Link>
                                        </li>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortTypes.includes('Third') && sortTypes.length !== 4
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortTypeToggle('Third');
                                                }}
                                            >
                                                Áo thứ ba
                                            </Link>
                                        </li>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortTypes.includes('Goalkeeper') && sortTypes.length !== 4
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortTypeToggle('Goalkeeper');
                                                }}
                                            >
                                                Áo thủ môn
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Giới tính</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortSexs.length === 2 ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSortSexs(['Men', 'Women']);
                                                }}
                                            >
                                                All
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortSexs.includes('Men') && sortSexs.length !== 2
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortSexToggle('Men');
                                                }}
                                            >
                                                Nam
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortSexs.includes('Women') && sortSexs.length !== 2
                                                        ? 'filter-link-active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortSexToggle('Women');
                                                }}
                                            >
                                                Nữ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Giá bán</div>

                                    <ul>
                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.length === 0 ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    setSortPrices([]);
                                                    setMinPrice(0);
                                                    setMaxPrice(10000000);
                                                }}
                                            >
                                                All
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.includes('100000') ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortPriceToggle('100000');
                                                    setMinPrice(0);
                                                    setMaxPrice(100000);
                                                }}
                                            >
                                                Giá dưới 100.000đ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.includes('100000-200000') ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortPriceToggle('100000-200000');
                                                    setMinPrice(100000);
                                                    setMaxPrice(200000);
                                                }}
                                            >
                                                100.000đ - 200.000đ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.includes('200000-300000') ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortPriceToggle('200000-300000');
                                                    setMinPrice(200000);
                                                    setMaxPrice(300000);
                                                }}
                                            >
                                                200.000đ - 300.000đ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.includes('300000-500000') ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortPriceToggle('300000-500000');
                                                    setMinPrice(300000);
                                                    setMaxPrice(500000);
                                                }}
                                            >
                                                300.000đ - 500.000đ
                                            </Link>
                                        </li>

                                        <li className="p-b-6">
                                            <Link
                                                to="#"
                                                className={`filter-link stext-106 trans-04 ${
                                                    sortPrices.includes('500000') ? 'filter-link-active' : ''
                                                }`}
                                                onClick={() => {
                                                    handleSortPriceToggle('500000');
                                                    setMinPrice(500000);
                                                    setMaxPrice(10000000);
                                                }}
                                            >
                                                Giá trên 500.000đ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27" style={{ display: 'flex' }}>
                                    <div className="mtext-102 cl2">Giải đấu</div>

                                    <div style={{ display: 'flex', marginLeft: '50px' }}>
                                        {League.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={`/product-leagues/${item.name}`}
                                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                            >
                                                Giải {item.name}
                                            </Link>
                                        ))}
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
                            {products.length > 0 ? (
                                products.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${
                                            item.league ? formatClassName(item.league) : undefined
                                        }`}
                                    >
                                        <div className="block2">
                                            <div
                                                className={`block2-pic hov-img0  ${
                                                    item.discount ? 'label-discount' : ''
                                                }`}
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
                                                    <Link to="#" className="btn-addwish-b2 dis-block pos-relative ">
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
                                ))
                            ) : (
                                <div
                                    style={{
                                        flex: '0 0 100%',
                                        padding: '15px',
                                        color: '#8a6d3b',
                                        backgroundColor: '#fcf8e3',
                                        borderColor: '#faebcc',
                                    }}
                                >
                                    <p style={{ margin: 0 }}>Sản phẩm không có trong danh mục này.</p>
                                </div>
                            )}
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
                        <div className="flex-c-m flex-w w-full p-t-55">
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
