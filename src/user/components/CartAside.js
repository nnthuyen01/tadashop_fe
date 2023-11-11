import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { API_URL } from '~/config/constant';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
function CartAside({ handleHideHeaderCart, showHeaderCart, quantityItem }) {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios
            .get(API_URL + 'cart')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setItem(response.data);
                    const total = response.data.reduce((total, item) => {
                        return total + item.quantity * item.item.price;
                    }, 0);

                    quantityItem(response.data.length);
                    setTotalPrice(total);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <>
            <div className={`wrap-header-cart js-panel-cart ${showHeaderCart ? 'show-header-cart' : ''}`}>
                {/* <div className="wrap-header-cart js-panel-cart show-header-cart"> */}
                <div className="s-full js-hide-cart" onClick={handleHideHeaderCart}></div>

                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Giỏ hàng của bạn</span>

                        <div
                            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart "
                            onClick={handleHideHeaderCart}
                        >
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    {!loading && item.length === 0 ? (
                        <div style={{ marginTop: '50%' }}>
                            <img src={images.emptyCart} alt="empty-cart" style={{ width: '300px' }} />
                        </div>
                    ) : (
                        (
                            <div className="header-cart-content flex-w js-pscroll">
                                <ul className="header-cart-wrapitem w-full">
                                    {item.map((item, index) => (
                                        <li key={index} className="header-cart-item flex-w flex-t m-b-12">
                                            <div className="header-cart-item-img">
                                                <img
                                                    src={API_URL + 'products/images/' + item.item.image.fileName}
                                                    loading="lazy"
                                                    alt="IMG-PRODUCT"
                                                ></img>
                                            </div>

                                            <div className="header-cart-item-txt p-t-8">
                                                <Link
                                                    to={`/product-detail/${item.item.productName}/${item.item.idProduct}`}
                                                    className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                                                >
                                                    {item.item.productName}
                                                </Link>

                                                <span className="header-cart-item-info">
                                                    {item.quantity} x {formatNumberWithCommas(item.item.price)}₫
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-full">
                                    <div className="header-cart-total w-full p-tb-40">
                                        Tổng cộng: {formatNumberWithCommas(totalPrice)}₫
                                    </div>

                                    <div className="header-cart-buttons flex-w w-full">
                                        <Link
                                            to="/cart"
                                            className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                                        >
                                            Xem Giỏ
                                        </Link>

                                        <a
                                            href="shoping-cart.html"
                                            className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                                        >
                                            Thanh Toán
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) || <div className="loading-indicator">Đang tải dữ liệu...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartAside;
