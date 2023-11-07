import React, { Fragment, useEffect, useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import 'magnific-popup/dist/jquery.magnific-popup.min';
import $ from 'jquery';
import 'select2';
import swal from 'sweetalert';

import axios from 'axios';
import { API_URL } from '~/config/constant';
import { Link } from 'react-router-dom';

function ModalProduct({ handleHideModal, productId }) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(API_URL + 'product/detail/' + productId)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const primaryImage = {
                        fileName: response.data.image.fileName,
                    };

                    if (!response.data.images.some((img) => img.fileName === primaryImage.fileName)) {
                        response.data.images.unshift(primaryImage);
                    }

                    setProduct(response.data);
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

    // [ +/- num product ]*/
    const [numProduct, setNumProduct] = useState(0);
    const handleDecrease = () => {
        if (numProduct > 0) {
            setNumProduct((prevNum) => prevNum - 1);
        }
    };
    const handleIncrease = () => {
        setNumProduct((prevNum) => prevNum + 1);
    };

    const PrevArrowMD = ({ onClick, currentSlide, slideCount, ...props }) => (
        <div className="wrap-slick3-arrows flex-sb-m flex-w">
            <button
                {...props}
                className={'arrow-slick3 prev-slick3' + (currentSlide === 0 ? ' slick-disabled' : '')}
                aria-hidden="true"
                aria-disabled={currentSlide === 0 ? true : false}
                type="button"
                onClick={onClick}
            >
                <i className="fa fa-angle-left"></i>
            </button>
        </div>
    );

    const NextArrowMD = ({ onClick, currentSlide, slideCount, ...props }) => (
        <div className="wrap-slick3-arrows flex-sb-m flex-w">
            <button
                {...props}
                className={'arrow-slick3 next-slick3' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
                aria-hidden="true"
                aria-disabled={currentSlide === slideCount - 1 ? true : false}
                type="button"
                onClick={onClick}
            >
                <i className="fa fa-angle-right"></i>
            </button>
        </div>
    );

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 6000,
        arrows: true,
        prevArrow: <PrevArrowMD />,
        nextArrow: <NextArrowMD />,

        dots: true,
        dotsClass: 'slick3-dots',
        customPaging: function (index) {
            var portrait = product.images[index].fileName; // Assuming you have data containing the images
            return (
                <div className="wrap-slick3-dots">
                    <div className="slick3-dot-border">
                        {/* <img src={portrait} alt="" /> */}
                        <img src={API_URL + 'products/images/' + portrait} alt="IMG-PRODUCT"></img>
                    </div>
                </div>
            );
        },
    };

    useEffect(() => {
        // Initialize Magnific Popup when the component mounts
        $('.gallery-lb').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
            },
            mainClass: 'mfp-fade',
        });
    }, []);

    // select2
    const selectSizeRef = useRef();

    useEffect(() => {
        if (!loading) {
            // Initialize the select2 plugin when the component mounts
            const selectSize = $(selectSizeRef.current);

            selectSize.select2({
                minimumResultsForSearch: 20,
                dropdownParent: selectSize.next('.dropDownSelect2'),
            });

            // Clean up the plugin when the component unmounts
            return () => {
                selectSize.select2('destroy');
            };
        }
    }, [loading]);
    // add cart
    const handleAddToCart = (nameProduct) => {
        swal('is added to cart !', {
            title: `${nameProduct}`,
            icon: 'success',
        });
    };
    return (
        <Fragment>
            {/* <div className={`wrap-modal1 js-modal1 p-t-60 p-b-20 ${showModal ? 'show-modal1' : ''}`}> */}
            <div className="wrap-modal1 js-modal1 p-t-60 p-b-20 show-modal1">
                <div className="overlay-modal1 js-hide-modal1" onClick={handleHideModal}></div>

                <div className="container">
                    <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                        <button className="how-pos3 hov3 trans-04 js-hide-modal1">
                            <img src="assets/images/icons/icon-close.png" alt="CLOSE" onClick={handleHideModal} />
                        </button>

                        {loading ? (
                            <div className="loading-indicator">Đang tải dữ liệu...</div>
                        ) : (
                            <div className="row">
                                <div className="col-md-6 col-lg-7 p-b-30">
                                    <div className="p-l-25 p-r-30 p-lr-0-lg">
                                        <div className="wrap-slick3 flex-sb flex-w">
                                            <Slider {...settings} className="slick3 gallery-lb">
                                                {product.images.map((img, index) => (
                                                    <div key={index} className="item-slick3" data-thumb={img.fileName}>
                                                        <div className="wrap-pic-w pos-relative">
                                                            <img
                                                                src={API_URL + 'products/images/' + img.fileName}
                                                                alt="IMG-PRODUCT"
                                                            ></img>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>

                                            {/* {product.images.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                                    onClick={() => console.log(index)}
                                                >
                                                    <i className="fa fa-expand"></i>
                                                </div>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-5 p-b-30">
                                    <div className="p-r-50 p-t-5 p-lr-0-lg">
                                        <h4 className="mtext-105 cl2  p-b-14">{product.name}</h4>

                                        <span className="mtext-106 cl2">
                                            {formatNumberWithCommas(product.priceAfterDiscount)}₫
                                        </span>

                                        <p
                                            className="stext-102 cl3 p-t-23"
                                            dangerouslySetInnerHTML={{ __html: product.brief }}
                                        ></p>

                                        <div className="p-t-33">
                                            <div className="flex-w flex-r-m p-b-10">
                                                <div className="size-203 flex-c-m respon6">Size</div>

                                                <div className="size-204 respon6-next">
                                                    <div className="rs1-select2 bor8 bg0">
                                                        <select
                                                            ref={selectSizeRef}
                                                            className="js-select2"
                                                            name="size"
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled hidden>
                                                                Chọn Size
                                                            </option>
                                                            {product.sizes.map((size, index) => (
                                                                <option key={index} value={size.size}>
                                                                    Size {size.size}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="dropDownSelect2"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-w flex-r-m p-b-10">
                                                <div className="size-203 flex-c-m respon6">Số lượng</div>
                                                <div className="size-204 flex-w flex-m respon6-next">
                                                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                        <div
                                                            className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                                            onClick={handleDecrease}
                                                        >
                                                            <i className="fs-16 zmdi zmdi-minus"></i>
                                                        </div>

                                                        <input
                                                            className="mtext-104 cl3 txt-center num-product"
                                                            type="number"
                                                            name="num-product"
                                                            value={numProduct}
                                                            readOnly
                                                        />

                                                        <div
                                                            className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                                            onClick={handleIncrease}
                                                        >
                                                            <i className="fs-16 zmdi zmdi-plus"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-w flex-r-m p-b-10">
                                                <div className="size-204 flex-w flex-m respon6-next">
                                                    <button
                                                        className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                                        onClick={() => handleAddToCart('Lightweight Jacket')}
                                                    >
                                                        Thêm vào giỏ hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!--  --> */}
                                        <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                            <div className="flex-m bor9 p-r-10 m-r-11">
                                                <a
                                                    href="https://www.facebook.com/TadaNNT/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                                    data-tooltip="Add to Wishlist"
                                                >
                                                    <i className="zmdi zmdi-favorite"></i>
                                                </a>
                                            </div>

                                            <a
                                                href="https://www.facebook.com/TadaNNT/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                                data-tooltip="Facebook"
                                            >
                                                <i className="fa fa-facebook"></i>
                                            </a>

                                            <a
                                                href="https://www.facebook.com/TadaNNT/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                                data-tooltip="Instagram"
                                            >
                                                <i className="fa fa-instagram"></i>
                                            </a>

                                            <a
                                                href="https://www.facebook.com/TadaNNT/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                                data-tooltip="Youtube"
                                            >
                                                <i className="fa fa-youtube-play"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ModalProduct;
