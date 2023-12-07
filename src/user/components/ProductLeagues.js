import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '~/config/constant';
import logos from '~/assets/logo';
function ProductLeagues({ handleShowModal, query, index, pagination }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0); // Bắt đầu từ trang 0
    const [totalPage, setTotalPage] = useState(0); // Bắt đầu từ trang 0
    const itemsPerPage = 16;
    // console.log(query);
    useEffect(() => {
        fetchData();
    }, [currentPage, query]); // Fetch data when the currentPage changes

    const fetchData = () => {
        setLoading(true);

        // Sử dụng API endpoint của bạn
        const apiEndpoint = `${API_URL}products/findLeague?query=${query}&page=${currentPage}&size=${itemsPerPage}&sort=id`;

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

    // Pagination click handler
    const handlePaginationClick = (page) => {
        setCurrentPage(page);
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
                    <div className="bread-crumb flex-w p-l-25 p-r-15 p-b-15 p-lr-0-lg">
                        <Link to="/" className="stext-107 cl8 hov-cl1 trans-04">
                            Trang chủ
                            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                        </Link>

                        <span className="stext-107 cl4">Giải đấu</span>
                    </div>

                    <div
                        className="logoLeague"
                        style={{
                            backgroundImage: `url(${logos[index]})`,
                            height: '100px',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            objectFit: 'center',
                        }}
                    ></div>

                    {/* grid Product */}

                    {loading ? (
                        <div className="loading-indicator">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="row ">
                            {products.length === 0 ? (
                                <p className="mtext-104 p-l-40">Sản phẩm bạn vừa tìm không có trong cửa hàng</p>
                            ) : (
                                products.map((item, index) => (
                                    <div
                                        key={index}
                                        className={'col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item m-t-30'}
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

                                                    <div
                                                        className="block2-btn flex-c-m stext-103 cl0 size-102 bg1 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleShowModal(item.id)}
                                                    >
                                                        Xem Nhanh
                                                    </div>
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
                                                    <Link to="#" className="btn-addwish-b2 dis-block pos-relative">
                                                        <img
                                                            className="icon-heart1 dis-block trans-04"
                                                            src="../assets/images/icons/icon-heart-01.png"
                                                            alt="ICON"
                                                        />
                                                        <img
                                                            className="icon-heart2 dis-block trans-04 ab-t-l"
                                                            src="../assets/images/icons/icon-heart-02.png"
                                                            alt="ICON"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
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
                </div>
            </section>
        </>
    );
}

export default ProductLeagues;
