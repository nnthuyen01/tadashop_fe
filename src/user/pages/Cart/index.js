import React, { Fragment, useEffect, useState, useRef } from 'react';
import HeaderPages from '~/user/components/HeaderPages';
import $ from 'jquery';
import 'select2';
import axios from 'axios';
import { API_URL } from '~/config/constant';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import swal from 'sweetalert';
function Cart() {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [headerKey, setHeaderKey] = useState(0); // Biến trạng thái để cập nhật HeaderPages
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        axios
            .get(API_URL + 'cart')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setCartProducts(response.data);
                    const total = response.data.reduce((total, item) => {
                        return total + item.quantity * item.item.price;
                    }, 0);
                    setTotalPrice(total);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, [cartProducts]);
    // console.log(cartProducts);
    // console.log(loading);
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    // [ +/- num product ]*/

    const handleDecrease = (index) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product, i) => {
                if (i === index && product.quantity > 1) {
                    // Giảm quantity đi 1
                    const newQuantity = product.quantity - 1;

                    // Gọi API để cập nhật quantity ở đây
                    axios
                        .put(API_URL + `cart/update?productSizeId=${product.item.size.id}&quantity=${newQuantity}`)
                        .then((response) => {
                            // Xử lý phản hồi từ API nếu cần
                            // console.log('API response: ', response.data);

                            // Sau khi cập nhật thông qua API, cập nhật lại state nếu cần
                            // Điều này giúp đảm bảo state và dữ liệu từ API phù hợp
                            if (response.status === 200) {
                                setCartProducts((updatedProducts) => {
                                    return updatedProducts.map((updatedProduct, updatedIndex) => {
                                        if (updatedIndex === index) {
                                            // Cập nhật lại số lượng sản phẩm

                                            setHeaderKey(headerKey + 1);
                                            return { ...updatedProduct, quantity: newQuantity };
                                        } else {
                                            return updatedProduct;
                                        }
                                    });
                                });
                            } else {
                                // Nếu có lỗi từ API, hiển thị thông báo lỗi
                                swal('Lỗi', response.data.message, 'error');
                            }
                        })
                        .catch((error) => {
                            // Xử lý lỗi từ API
                            console.error('API error: ', error);
                        });

                    return { ...product, quantity: newQuantity };
                } else {
                    return product;
                }
            }),
        );
    };

    const handleIncrease = (index) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product, i) => {
                if (i === index) {
                    // Tăng quantity lên 1
                    const newQuantity = product.quantity + 1;

                    // Call the API to update quantity here
                    axios
                        .put(API_URL + `cart/update?productSizeId=${product.item.size.id}&quantity=${newQuantity}`)
                        .then((response) => {
                            // Handle the API response if needed
                            console.log('API response: ', response);

                            // Sau khi cập nhật thông qua API, cập nhật lại state nếu cần
                            // Điều này giúp đảm bảo state và dữ liệu từ API phù hợp
                            if (response.status === 200) {
                                setCartProducts((updatedProducts) => {
                                    return updatedProducts.map((updatedProduct, updatedIndex) => {
                                        if (updatedIndex === index) {
                                            // Cập nhật lại số lượng của sản phẩm
                                            setHeaderKey(headerKey + 1);

                                            return { ...updatedProduct, quantity: newQuantity };
                                        } else {
                                            return updatedProduct;
                                        }
                                    });
                                });
                            } else {
                                // Nếu có lỗi từ API, hiển thị thông báo lỗi
                                swal('Lỗi', response.data.message, 'error');
                            }
                        })
                        .catch((error) => {
                            // Handle API error
                            // console.error('API error: ', error);
                            if (error.response.data.message === 'Số lượng vượt quá số lượng sản phẩm.') {
                                swal('Lỗi', error.response.data.message, 'error');
                                setCartProducts((updatedProducts) => {
                                    return updatedProducts.map((updatedProduct, updatedIndex) => {
                                        if (updatedIndex === index) {
                                            // Cập nhật lại số lượng của sản phẩm
                                            setHeaderKey(headerKey + 1);

                                            return { ...updatedProduct, quantity: newQuantity - 1 };
                                        } else {
                                            return updatedProduct;
                                        }
                                    });
                                });
                            } else {
                                console.error('API error: ', error);
                            }
                        });

                    return { ...product, quantity: newQuantity };
                } else {
                    return product;
                }
            }),
        );
    };

    const handleDeleteItem = (idItem) => {
        axios
            .delete(API_URL + `cart/remove?productSizeId=${idItem}`)
            .then((response) => {
                // Xử lý phản hồi từ API nếu cần
                console.log('API response: ', response);
                if (response.status === 200) {
                    const updatedCartProducts = cartProducts.filter((item) => item.item.size.id !== idItem);
                    setCartProducts(updatedCartProducts);
                    setHeaderKey(headerKey + 1);
                }
            })
            .catch((error) => {
                // Xử lý lỗi từ API
                console.error('API error: ', error);
            });
    };
    // select2
    const selectAddressRef = useRef();

    useEffect(() => {
        // Initialize the select2 plugin when the component mounts
        $(selectAddressRef.current).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(selectAddressRef.current).next('.dropDownSelect2'),
        });

        // Clean up the plugin when the component unmounts
        return () => {
            $(selectAddressRef.current).select2('destroy');
        };
    }, []);

    const handleBuy = (e) => {
        if (e) {
            e.preventDefault();
        }
        navigate('/shop');
    };
    const handleUpdateCart = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log(cartProducts);
        // Reload trang
        window.location.reload();
    };

    const handleCheckout = (e) => {
        if (e) {
            e.preventDefault();
        }
        navigate('/checkout');
    };

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages key={headerKey} />
            {/* <!-- breadcrumb --> */}
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <Link to="/" className="stext-107 cl8 hov-cl1 trans-04">
                        Trang chủ
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>

                    <span className="stext-107 cl4">Giỏ hàng</span>
                </div>
            </div>

            {/* <!-- Shoping Cart --> */}
            <form className="bg0 p-t-75 p-b-85">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-8 m-lr-auto m-b-50">
                            <div className="m-l-25 m-r--38 m-lr-0-xl">
                                <div className="wrap-table-shopping-cart">
                                    <table className="table-shopping-cart">
                                        <thead>
                                            <tr className="table_head">
                                                <th className="column-1">Hình ảnh</th>
                                                <th className="column-2">Tên sản phâm</th>
                                                <th className="column-3">Kích cỡ</th>
                                                <th className="column-4">Đơn Giá</th>
                                                <th className="column-5">Số lượng</th>
                                                <th className="column-6">Thành Tiền</th>
                                            </tr>
                                        </thead>

                                        {loading ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                                        <div className="loading-indicator">Đang tải dữ liệu...</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : !loading && cartProducts.length === 0 ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                                        <img
                                                            src={images.emptyCart}
                                                            alt="empty-cart"
                                                            style={{ width: '300px' }}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                {cartProducts.map((item, index) => (
                                                    <tr key={index} className="table_row">
                                                        <td className="column-1">
                                                            <div
                                                                className="how-itemcart1"
                                                                onClick={() => handleDeleteItem(item.item.size.id)}
                                                            >
                                                                <img
                                                                    src={
                                                                        API_URL +
                                                                        'products/images/' +
                                                                        item.item.image.fileName
                                                                    }
                                                                    loading="lazy"
                                                                    alt="IMG-PRODUCT"
                                                                ></img>
                                                            </div>
                                                        </td>
                                                        <td className="column-2">{item.item.productName}</td>
                                                        <td className="column-3">{item.item.size.size}</td>
                                                        <td className="column-4">
                                                            {formatNumberWithCommas(item.item.price)}₫
                                                        </td>
                                                        <td className="column-5">
                                                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                                                <div
                                                                    className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                                                    onClick={() => handleDecrease(index)}
                                                                >
                                                                    <i className="fs-16 zmdi zmdi-minus"></i>
                                                                </div>

                                                                <input
                                                                    className="mtext-104 cl3 txt-center num-product"
                                                                    type="number"
                                                                    name="num-product1"
                                                                    value={item.quantity}
                                                                    readOnly
                                                                />

                                                                <div
                                                                    className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                                                    onClick={() => handleIncrease(index)}
                                                                >
                                                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="column-6">
                                                            {formatNumberWithCommas(item.item.price * item.quantity)}₫
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>

                                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                                    <div className="flex-w flex-m m-r-20 m-tb-5">
                                        <div
                                            className="flex-c-m stext-101 cl0 size-118 bg1 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5"
                                            onClick={handleBuy}
                                        >
                                            Mua tiếp
                                        </div>
                                    </div>
                                    <div
                                        className="flex-c-m stext-101 cl0 size-119 bg1 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                                        onClick={handleUpdateCart}
                                    >
                                        Cập nhật Giỏ
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-10 col-lg-7 col-xl-4 m-lr-auto m-b-50">
                            <div className="bor10 p-lr-40 p-t-30 p-b-40  m-l-20 m-lr-0-xl p-lr-15-sm">
                                <h4 className="mtext-109 cl2 p-b-30">ĐƠN HÀNG</h4>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div style={{ width: '40%' }}>
                                        <span className="stext-110 cl2">Tạm tính:</span>
                                    </div>

                                    <div style={{ width: '60%' }}>
                                        <span className="mtext-110 ">{formatNumberWithCommas(totalPrice)}₫</span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t p-t-27 p-b-33">
                                    <div style={{ width: '40%' }}>
                                        <span className="mtext-109 cl2">Tổng tiền:</span>
                                    </div>

                                    <div className="p-t-1" style={{ width: '60%' }}>
                                        <span className="mtext-109 " style={{ color: '#e32124' }}>
                                            {formatNumberWithCommas(totalPrice)}₫
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                                    onClick={handleCheckout}
                                >
                                    Tiến hành Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Cart;
