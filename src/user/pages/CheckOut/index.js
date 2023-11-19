import React, { useState, useEffect } from 'react';
import HeaderPages from '~/user/components/HeaderPages';
import { Link, useNavigate } from 'react-router-dom';
import './checkout.scss';
import images from '~/assets/images';
import axios from 'axios';
import { API_URL } from '~/config/constant';
import swal from 'sweetalert';

function Checkout() {
    const [deliveryOption, setDeliveryOption] = useState('direct');

    const [paymentOption, setPaymentOption] = useState('card');

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value);
        if (event.target.value === 'store') {
            setCheckout((prevCheckout) => ({
                ...prevCheckout,
                deliveryAddress: 'Nhận tại cửa hàng',
            }));
        }
        if (event.target.value === 'direct') {
            setCheckout((prevCheckout) => ({
                ...prevCheckout,
                deliveryAddress: '',
            }));
        }
    };

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
        if (event.target.value === 'card') {
            setCheckout((prevCheckout) => ({
                ...prevCheckout,
                paymentMethod: 'CardATM',
            }));
        }
        if (event.target.value === 'cod') {
            setCheckout((prevCheckout) => ({
                ...prevCheckout,
                paymentMethod: 'COD',
            }));
        }
    };

    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        axios
            .get(API_URL + 'cart')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setCartProducts(response.data);
                    const total = response.data.reduce((total, item) => {
                        return total + item.quantity * item.item.price;
                    }, 0);
                    setTotalPrice(total);
                    setLoading(false);

                    if (response.data.length === 0) {
                        navigate('/');
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, [navigate]);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const [checkout, setCheckout] = useState({
        deliveryAddress: '',
        note: '',
        differentReceiverName: '',
        differentReceiverPhone: '',
        discountCode: '',
        paymentMethod: 'CardATM',
    });
    const [isCheckName, setIsCheckName] = useState(false);
    const [isCheckPhone, setIsCheckPhone] = useState(false);
    const [isCheckAddress, setIsCheckAddress] = useState(false);
    const handleInputChange = (field, value) => {
        setCheckout((prevCheckout) => ({
            ...prevCheckout,
            [field]: value,
        }));
        if (field === 'differentReceiverPhone') setIsCheckPhone(false);
        if (field === 'differentReceiverName') setIsCheckName(false);
        if (field === 'deliveryAddress') setIsCheckAddress(false);
    };
    const [voucherValue, setVoucherValue] = useState('');
    const [applyVoucher, setApplyVoucher] = useState(false);

    const handleVoucherChange = (event) => {
        setVoucherValue(event.target.value);
    };
    const handleApplyVoucher = () => {
        setCheckout((prevCheckout) => ({
            ...prevCheckout,
            discountCode: voucherValue,
        }));
        setApplyVoucher(true);
    };
    const [isPaymentSuccess, setPaymentSuccess] = useState(false);
    const handleCheckout = (info) => {
        if (info.differentReceiverName === '' && info.differentReceiverPhone === '' && info.deliveryAddress === '') {
            setIsCheckName(true);
            setIsCheckPhone(true);
            setIsCheckAddress(true);
            return;
        }
        if (info.differentReceiverName === '' && info.differentReceiverPhone === '') {
            setIsCheckName(true);
            setIsCheckPhone(true);

            return;
        }
        if (info.differentReceiverPhone === '' && info.deliveryAddress === '') {
            setIsCheckPhone(true);
            setIsCheckAddress(true);
            return;
        }
        if (info.differentReceiverName === '' && info.deliveryAddress === '') {
            setIsCheckName(true);
            setIsCheckAddress(true);
            return;
        }
        if (info.differentReceiverName === '') {
            setIsCheckName(true);
            return;
        }
        if (info.differentReceiverPhone === '') {
            setIsCheckPhone(true);
            return;
        }
        if (info.deliveryAddress === '') {
            setIsCheckAddress(true);
            return;
        }
        console.log(info);
        if (info.paymentMethod === 'CardATM') {
            axios
                .post(API_URL + 'order', info)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        const { totalPrice, id } = response.data;

                        // Thực hiện cuộc gọi POST đến điểm cuối Java API của bạn với các giá trị đã trích xuất
                        axios
                            .get(API_URL + 'pay', {
                                params: {
                                    price: totalPrice,
                                    id: id,
                                },
                            })
                            .then((payResponse) => {
                                console.log(payResponse);
                                if (payResponse.status === 200) {
                                    // Nếu yêu cầu thành công, chuyển hướng người dùng đến URL thanh toán
                                    window.location.href = payResponse.data;
                                } else {
                                    // Xử lý lỗi phản hồi API cho cuộc gọi thứ hai
                                    swal('Lỗi', payResponse.data.message, 'error');
                                }
                            })
                            .catch((payError) => {
                                // Xử lý lỗi cho cuộc gọi HTTP thứ hai
                                console.error('Lỗi khi thực hiện yêu cầu thanh toán:', payError);
                                swal('Lỗi', 'Có lỗi xảy ra khi thanh toán', 'error');
                            });
                    } else {
                        // Nếu có lỗi từ API, hiển thị thông báo lỗi
                        swal('Lỗi', response.data.message, 'error');
                    }
                })
                .catch((error) => {
                    // Xử lý lỗi khi gửi yêu cầu
                    console.error('Lỗi khi thực hiện yêu cầu:', error);
                    swal('Lỗi', 'Có lỗi xảy ra khi đặt hàng', 'error');
                });
        }
        if (info.paymentMethod === 'COD') {
            axios
                .post(API_URL + 'order', info)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        swal('Đặt hàng thành công!', {
                            title: 'bạn đã thanh toán thành công',
                            icon: 'success',
                        });
                        setPaymentSuccess(true);
                        navigate(`/checkout/${response.data.id}/thankyou`, { replace: true });
                    } else {
                        // Nếu có lỗi từ API, hiển thị thông báo lỗi
                        swal('Lỗi', response.data.message, 'error');
                    }
                })
                .catch((error) => {
                    // Xử lý lỗi khi gửi yêu cầu
                    console.error('Lỗi khi thực hiện yêu cầu:', error);
                    swal('Lỗi', 'Có lỗi xảy ra khi đặt hàng', 'error');
                });
        }

        // axios
        //     .post(API_URL + 'order', info)
        //     .then((response) => {
        //         console.log(response);
        //         if (response.status === 200) {
        //             swal('Đặt hàng thành công!', {
        //                 title: 'bạn đã thanh toán thành công',
        //                 icon: 'success',
        //             });
        //             setPaymentSuccess(true);
        //             navigate(`/checkout/${response.data.id}/thankyou`, { replace: true });
        //         } else {
        //             // Nếu có lỗi từ API, hiển thị thông báo lỗi
        //             swal('Lỗi', response.data.message, 'error');
        //         }
        //     })
        //     .catch((error) => {
        //         // Xử lý lỗi khi gửi yêu cầu
        //         console.error('Lỗi khi thực hiện yêu cầu:', error);
        //         swal('Lỗi', 'Có lỗi xảy ra khi đặt hàng', 'error');
        //     });
    };

    return (
        <div style={{ backgroundColor: '#fff' }}>
            {isPaymentSuccess && navigate('/checkout/thankyou', { replace: true })}
            <HeaderPages />
            {/* <!-- breadcrumb --> */}

            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <Link to="/" className="stext-107 cl8 hov-cl1 trans-04">
                        Trang chủ
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>
                    <Link to="/cart" className="stext-107 cl8 hov-cl1 trans-04">
                        Giỏ hàng
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>

                    <span className="stext-107 cl4">Thông tin giao hàng</span>
                </div>
            </div>
            <section className="bg0 p-t-20 p-b-60">
                <div className="container">
                    <div className="grid__row">
                        <div className="grid__column-7">
                            <div className="main-checkout">
                                <div className="main-content">
                                    <div className="step-section">
                                        <div className="section-header">Thông tin giao hàng</div>
                                        <div className="section-content section-customer-information">
                                            <div className="fieldset">
                                                <div className="field">
                                                    <div className="field-input-wrapper">
                                                        <label className="field-label">Họ và tên</label>
                                                        <input
                                                            placeholder="Họ và tên"
                                                            className="field-input"
                                                            size="30"
                                                            type="text"
                                                            value={checkout.differentReceiverName}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    'differentReceiverName',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            style={{
                                                                boxShadow: isCheckName ? '0 0 0 2px #ff6d6d' : '',
                                                            }}
                                                        ></input>
                                                        {isCheckName && (
                                                            <p
                                                                style={{
                                                                    margin: '0.75em 0 0.25em',
                                                                    transition: 'all 0.3s ease-out',
                                                                    lineHeight: '1.3em',
                                                                    color: '#ff6d6d',
                                                                }}
                                                            >
                                                                Tên không được trống
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="field-input-wrapper">
                                                        <label className="field-label">Số điện thoại</label>
                                                        <input
                                                            placeholder="Số điện thoại"
                                                            className="field-input"
                                                            size="30"
                                                            type="text"
                                                            value={checkout.differentReceiverPhone}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    'differentReceiverPhone',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            style={{
                                                                boxShadow: isCheckPhone ? '0 0 0 2px #ff6d6d' : '',
                                                            }}
                                                        ></input>
                                                        {isCheckPhone && (
                                                            <p
                                                                style={{
                                                                    margin: '0.75em 0 0.25em',
                                                                    transition: 'all 0.3s ease-out',
                                                                    lineHeight: '1.3em',
                                                                    color: '#ff6d6d',
                                                                }}
                                                            >
                                                                Số điện thoại không được trống
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="m-t-15" style={{ fontStyle: 'italic' }}>
                                                    Giao hàng:
                                                </label>
                                                <div>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <label style={{ display: 'flex' }}>
                                                            <input
                                                                type="radio"
                                                                value="direct"
                                                                checked={deliveryOption === 'direct'}
                                                                onChange={handleDeliveryOptionChange}
                                                            />
                                                            Giao tận nơi
                                                        </label>

                                                        <label style={{ display: 'flex' }}>
                                                            <input
                                                                type="radio"
                                                                value="store"
                                                                checked={deliveryOption === 'store'}
                                                                onChange={handleDeliveryOptionChange}
                                                            />
                                                            Nhận tại cửa hàng
                                                        </label>
                                                    </div>
                                                    {deliveryOption === 'direct' && (
                                                        <div className="fieldset">
                                                            <div className="field">
                                                                <div className="field-input-wrapper">
                                                                    <label className="field-label">Địa chỉ</label>
                                                                    <input
                                                                        placeholder="Địa chỉ"
                                                                        className="field-input"
                                                                        size="30"
                                                                        type="text"
                                                                        value={checkout.deliveryAddress}
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                'deliveryAddress',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        style={{
                                                                            boxShadow: isCheckAddress
                                                                                ? '0 0 0 2px #ff6d6d'
                                                                                : '',
                                                                        }}
                                                                    ></input>
                                                                    {isCheckAddress && (
                                                                        <p
                                                                            style={{
                                                                                margin: '0.75em 0 0.25em',
                                                                                transition: 'all 0.3s ease-out',
                                                                                lineHeight: '1.3em',
                                                                                color: '#ff6d6d',
                                                                            }}
                                                                        >
                                                                            Vui lòng nhập địa chỉ giao hàng
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {deliveryOption === 'store' && (
                                                        <div>
                                                            <p>
                                                                Địa chỉ cửa hàng: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức,
                                                                Thành phố Hồ Chí Minh
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="m-t-15" style={{ fontStyle: 'italic' }}>
                                                    Phương thức thanh toán:
                                                </label>

                                                <div>
                                                    <label style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input
                                                            type="radio"
                                                            value="card"
                                                            checked={paymentOption === 'card'}
                                                            onChange={handlePaymentOptionChange}
                                                        />
                                                        <img
                                                            src={images.cardIcon}
                                                            alt="card-icon"
                                                            style={{ height: '40px' }}
                                                        />
                                                        Chuyển khoản qua ngân hàng
                                                    </label>
                                                    {paymentOption === 'card' && (
                                                        <div className="container-card">
                                                            <h3>Thông tin thẻ</h3>
                                                            <p>
                                                                <span className="highlight">TK NH:</span> 4706205185346
                                                            </p>
                                                            <p>
                                                                <span className="highlight">Nguyễn Ngọc Thuyên</span>
                                                            </p>
                                                            <p>
                                                                <span className="highlight">NH Agribank</span>
                                                            </p>
                                                            <p>Nội dung: Tên + SĐT đặt hàng</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input
                                                            type="radio"
                                                            value="cod"
                                                            checked={paymentOption === 'cod'}
                                                            onChange={handlePaymentOptionChange}
                                                        />
                                                        <img
                                                            src={images.codIcon}
                                                            alt="card-icon"
                                                            style={{ height: '40px' }}
                                                        />
                                                        Thanh toán khi giao hàng (COD)
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="m-t-15">Ghi chú:</label>
                                                <div className="fieldset">
                                                    <div className="field">
                                                        <div className="field-input-wrapper">
                                                            <label className="field-label">Ghi chú</label>
                                                            <input
                                                                placeholder="Ghi chú"
                                                                className="field-input"
                                                                size="30"
                                                                type="text"
                                                                value={checkout.note}
                                                                onChange={(e) =>
                                                                    handleInputChange('note', e.target.value)
                                                                }
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section-footer">
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <div
                                                    className="flex-c-m stext-101 cl2 size-119  bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                                                    onClick={() => navigate('/cart')}
                                                >
                                                    Giỏ hàng
                                                </div>
                                                <div
                                                    className="flex-c-m stext-101 cl0 size-119 bg1 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                                                    // onClick={() => console.log(checkout)}
                                                    onClick={() => handleCheckout(checkout)}
                                                >
                                                    Thanh toán
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column-5">
                            <div className="sidebar-checkout">
                                <div
                                    className="section-header"
                                    style={{ marginBottom: '1.5em', fontSize: '18px', fontWeight: '700' }}
                                >
                                    Thông tin đơn hàng
                                </div>

                                <table className="table-payment">
                                    <thead>
                                        <tr>
                                            <th className="th-payment">Hình ảnh</th>
                                            <th className="th-payment">Mô tả</th>
                                            <th className="th-payment">Size</th>
                                            <th className="th-payment">Số lượng</th>
                                            <th className="th-payment">Giá</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <tbody>
                                            <tr>
                                                <td className="td-payment" colSpan="6" style={{ textAlign: 'center' }}>
                                                    <div className="loading-indicator">Đang tải dữ liệu...</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            {cartProducts.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="td-payment">
                                                        <img
                                                            src={
                                                                API_URL + 'products/images/' + item.item.image.fileName
                                                            }
                                                            loading="lazy"
                                                            alt="IMG-PRODUCT"
                                                            style={{ height: '60px' }}
                                                        />
                                                    </td>
                                                    <td className="td-payment">{item.item.productName}</td>
                                                    <td className="td-payment">{item.item.size.size}</td>
                                                    <td className="td-payment">{item.quantity}</td>
                                                    <td className="td-payment">
                                                        {' '}
                                                        {formatNumberWithCommas(item.item.price)}₫
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                                <div className="flex-w flex-m m-tb-5" style={{ justifyContent: 'space-between' }}>
                                    <input
                                        className="stext-104 cl2 plh4 size-117 bor20 p-lr-20 m-tb-5"
                                        type="text"
                                        name="coupon"
                                        placeholder="Nhập mã Voucher"
                                        value={voucherValue}
                                        onChange={handleVoucherChange}
                                    />

                                    <div
                                        className="flex-c-m stext-101 cl2 size-118 bg8 hov-btn3 bor20 p-lr-15 trans-04 pointer m-tb-5"
                                        onClick={handleApplyVoucher}
                                    >
                                        Áp dụng voucher
                                    </div>
                                </div>
                                {applyVoucher && (
                                    <div className="mtext-101" style={{ color: '#12a700' }}>
                                        Bạn đã áp dụng voucher: {voucherValue.toUpperCase()}
                                    </div>
                                )}
                                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-t-20 m-lr-0-xl p-lr-15-sm">
                                    <h4 className="mtext-109 cl2 p-b-30">ĐƠN HÀNG</h4>

                                    <div className="flex-w flex-t p-b-13">
                                        <div style={{ width: '40%' }}>
                                            <span className="stext-110 cl2">Tạm tính:</span>
                                        </div>

                                        <div style={{ width: '60%' }}>
                                            <span className="mtext-110 ">{formatNumberWithCommas(totalPrice)}</span>
                                        </div>
                                    </div>
                                    <div className="flex-w flex-t bor12 p-b-13">
                                        <div style={{ width: '40%' }}>
                                            <span className="stext-110 cl2">Phí vận chuyển:</span>
                                        </div>

                                        <div style={{ width: '60%' }}>
                                            <span className="mtext-110 ">-</span>
                                        </div>
                                    </div>

                                    <div className="flex-w flex-t p-t-27 p-b-10">
                                        <div style={{ width: '40%' }}>
                                            <span className="mtext-109 cl2">Tổng tiền:</span>
                                        </div>

                                        <div className="p-t-1" style={{ width: '60%' }}>
                                            <span className="mtext-109 " style={{ color: '#e32124' }}>
                                                {formatNumberWithCommas(totalPrice)}đ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Checkout;
