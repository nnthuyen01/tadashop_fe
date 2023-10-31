import { Fragment, useEffect, useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import 'magnific-popup/dist/jquery.magnific-popup.min';
import HeaderPages from '~/user/components/HeaderPages';
import $ from 'jquery';
import 'select2';
import swal from 'sweetalert';
import ModalProduct from '~/user/components/ModalProduct';
function ProductDetail() {
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
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

    const data = [
        {
            img: 'assets/images/AoMu1.jpg',
        },
        {
            img: 'assets/images/AoMu1_1.jpg',
        },
        {
            img: 'assets/images/AoMu1_2.jpg',
        },
    ];
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
        // appendArrows: $(wrap-slick3).find('.wrap-slick3-arrows'),
        prevArrow: <PrevArrowMD />,
        nextArrow: <NextArrowMD />,

        dots: true,
        dotsClass: 'slick3-dots',
        customPaging: function (index) {
            var portrait = data[index].img; // Assuming you have data containing the images
            return (
                <div className="wrap-slick3-dots">
                    <div className="slick3-dot-border">
                        <img src={portrait} alt="" />
                    </div>
                    {/* <div className="slick3-dot-overlay"></div> */}
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
    const selectColorRef = useRef();

    useEffect(() => {
        // Initialize the select2 plugin when the component mounts
        $(selectSizeRef.current).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(selectSizeRef.current).next('.dropDownSelect2'),
        });
        $(selectColorRef.current).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(selectColorRef.current).next('.dropDownSelect2'),
        });
        // Clean up the plugin when the component unmounts
        return () => {
            $(selectSizeRef.current).select2('destroy');
            $(selectColorRef.current).select2('destroy');
        };
    }, []);
    // add cart
    const handleAddToCart = (nameProduct) => {
        swal('is added to cart !', {
            title: `${nameProduct}`,
            icon: 'success',
        });
    };

    // slick2

    const RelateProducts = [
        {
            img: 'assets/images/AoMu1.jpg',
            name: 'Esprit Ruffle Shirt',
            price: '$16.64',
        },
        {
            img: 'assets/images/AoAC1.jpg',
            name: 'Herschel supply',
            price: '$35.31',
        },
        {
            img: 'assets/images/AoAC2.jpg',
            name: 'Only Check Trouser',
            price: '$25.50',
        },
        {
            img: 'assets/images/AoArs1.jpg',
            name: 'Classic Trench Coat',
            price: '$75.00',
        },
        {
            img: 'assets/images/AoArs2.jpg',
            name: 'Front Pocket Jumper',
            price: '$34.75',
        },
        {
            img: 'assets/images/AoArs3.jpg',
            name: 'Vintage Inspired Classic',
            price: '$93.20',
        },
        {
            img: 'assets/images/AoAston1.jpg',
            name: 'Shirt in Stretch Cotton',
            price: '$52.66',
        },
        {
            img: 'assets/images/AoAtletico1.jpg',
            name: 'Pieces Metallic Printed',
            price: '$18.96',
        },
    ];

    const PrevArrowRL = ({ onClick, currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={'arrow-slick2 prev-slick2' + (currentSlide === 0 ? ' slick-disabled' : '')}
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
            onClick={onClick}
        >
            <i className="fa fa-angle-left"></i>
        </button>
    );

    const NextArrowRL = ({ onClick, currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={'arrow-slick2 next-slick2' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
            onClick={onClick}
        >
            <i className="fa fa-angle-right"></i>
        </button>
    );
    const settingsRelateProduct = {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 6000,
        arrows: true,
        prevArrow: <PrevArrowRL />,
        nextArrow: <NextArrowRL />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Modal
    // Show Modal1 Product
    const [showModal, setShowModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleShowModal = () => {
        setScrollPosition(window.scrollY);
        setShowModal(true);
    };

    const handleHideModal = () => {
        window.scrollTo(0, scrollPosition);
        setShowModal(false);
    };
    // tab
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        // Initialize the slick slider when the tab is shown
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var nameTab = $(e.target).attr('href');
            $(nameTab).find('.slick2').slick('reinit');
        });

        // Clean up event listener when component unmounts
        return () => {
            $('a[data-toggle="tab"]').off('shown.bs.tab');
        };
    }, []);

    // rating
    const [rated, setRated] = useState(0);
    const [temp, setTemp] = useState(0);

    const handleMouseEnter = (index) => {
        setTemp(index + 1);
    };

    const handleMouseLeave = () => {
        setTemp(0);
    };

    const handleClickRating = (index) => {
        setRated(index + 1);
    };
    const handleChangeRating = (event) => {
        const newRating = event.target.value;
        // onRatingChange(newRating);
    };
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />

            {/* <!-- breadcrumb --> */}
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-23 p-lr-0-lg ">
                    <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <a href="product.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Men
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <span className="stext-109 cl4">Lightweight Jacket</span>
                </div>
            </div>

            {/* <!-- Product Detail --> */}
            <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-7 p-b-30">
                            <div className="p-l-25 p-r-30 p-lr-0-lg">
                                <div className="wrap-slick3 flex-sb flex-w">
                                    {/* <div className="wrap-slick3-dots"></div>
                                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div> */}

                                    <Slider {...settings} className="slick3 gallery-lb">
                                        {data.map((item, index) => (
                                            <div key={index} className="item-slick3" data-thumb={item.img}>
                                                <div className="wrap-pic-w pos-relative">
                                                    <img src={item.img} alt="IMG-PRODUCT" />
                                                    <a
                                                        className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                                        href={item.img}
                                                    >
                                                        <i className="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 p-b-30">
                            <div className="p-r-50 p-t-5 p-lr-0-lg">
                                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                    ÁO ĐẤU MANCHESTER UNITED SÂN NHÀ BẢN PLAYER - LOGO ÉP MÙA GIẢI 2023/2024
                                </h4>

                                <span className="mtext-106 cl2"> 300,000₫ </span>

                                <p className="stext-102 cl3 p-t-23">
                                    Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris
                                    consequat ornare feugiat.
                                </p>

                                {/* <!--  --> */}
                                <div className="p-t-33">
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-203 flex-c-m respon6">Size</div>

                                        <div className="size-204 respon6-next">
                                            <div className="rs1-select2 bor8 bg0">
                                                <select ref={selectSizeRef} className="js-select2" name="time">
                                                    <option>Choose an option</option>
                                                    <option>Size S</option>
                                                    <option>Size M</option>
                                                    <option>Size L</option>
                                                    <option>Size XL</option>
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

                    <div className="bor10 m-t-50 p-t-43 p-b-40">
                        {/* <!-- Tab01 --> */}
                        <div className="tab01">
                            {/* <!-- Nav tabs --> */}
                            <ul className="nav nav-tabs" role="tablist">
                                {/* <li className="nav-item p-b-10">
                                    <a className="nav-link active" data-toggle="tab" href="#description" role="tab"> */}
                                <li className={`nav-item p-b-10 ${activeTab === 'description' ? 'active' : ''}`}>
                                    <div
                                        className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                                        data-toggle="tab"
                                        // href="#description"
                                        role="tab"
                                        onClick={() => setActiveTab('description')}
                                    >
                                        Description
                                    </div>
                                </li>
                                {/* 
                                <li className="nav-item p-b-10">
                                    <a className="nav-link" data-toggle="tab" href="#information" role="tab"> */}
                                <li className={`nav-item p-b-10 ${activeTab === 'information' ? 'active' : ''}`}>
                                    <div
                                        className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                                        data-toggle="tab"
                                        // href="#information"
                                        role="tab"
                                        onClick={() => setActiveTab('information')}
                                    >
                                        Additional information
                                    </div>
                                </li>

                                {/* <li className="nav-item p-b-10">
                                    <a className="nav-link" data-toggle="tab" href="#reviews" role="tab"> */}
                                <li className={`nav-item p-b-10 ${activeTab === 'reviews' ? 'active' : ''}`}>
                                    <div
                                        className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                                        data-toggle="tab"
                                        // href="#reviews"
                                        role="tab"
                                        onClick={() => setActiveTab('reviews')}
                                    >
                                        Reviews (1)
                                    </div>
                                </li>
                            </ul>

                            {/* <!-- Tab panes --> */}
                            <div className="tab-content p-t-43">
                                {/* <!-- - --> */}
                                {/* <div className="tab-pane fade show active" id="description" role="tabpanel"> */}
                                <div
                                    className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}
                                    id="description"
                                    role="tabpanel"
                                >
                                    <div className="how-pos2 p-lr-15-md">
                                        <p className="stext-102 cl6">
                                            Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc
                                            fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet,
                                            in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium
                                            maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut
                                            ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex
                                            ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit
                                            amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus
                                            nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed
                                            metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
                                        </p>
                                    </div>
                                </div>

                                {/* <!-- - --> */}
                                {/* <div className="tab-pane fade" id="information" role="tabpanel"> */}
                                <div
                                    className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`}
                                    id="information"
                                    role="tabpanel"
                                >
                                    <div className="row">
                                        <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                            <ul className="p-lr-28 p-lr-15-sm">
                                                <li className="flex-w flex-t p-b-7">
                                                    <span className="stext-102 cl3 size-205"> Weight </span>

                                                    <span className="stext-102 cl6 size-206"> 0.79 kg </span>
                                                </li>

                                                <li className="flex-w flex-t p-b-7">
                                                    <span className="stext-102 cl3 size-205"> Dimensions </span>

                                                    <span className="stext-102 cl6 size-206"> 110 x 33 x 100 cm </span>
                                                </li>

                                                <li className="flex-w flex-t p-b-7">
                                                    <span className="stext-102 cl3 size-205"> Materials </span>

                                                    <span className="stext-102 cl6 size-206"> 60% cotton </span>
                                                </li>

                                                <li className="flex-w flex-t p-b-7">
                                                    <span className="stext-102 cl3 size-205"> Color </span>

                                                    <span className="stext-102 cl6 size-206">
                                                        {' '}
                                                        Black, Blue, Grey, Green, Red, White{' '}
                                                    </span>
                                                </li>

                                                <li className="flex-w flex-t p-b-7">
                                                    <span className="stext-102 cl3 size-205"> Size </span>

                                                    <span className="stext-102 cl6 size-206"> XL, L, M, S </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- - --> */}
                                {/* <div className="tab-pane fade" id="reviews" role="tabpanel"> */}
                                <div
                                    className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
                                    id="reviews"
                                    role="tabpanel"
                                >
                                    <div className="row">
                                        <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                            <div className="p-b-30 m-lr-15-sm">
                                                {/* <!-- Review --> */}
                                                <div className="flex-w flex-t p-b-68">
                                                    <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                        <img src="assets/images/avatar-01.jpg" alt="AVATAR" />
                                                    </div>

                                                    <div className="size-207">
                                                        <div className="flex-w flex-sb-m p-b-17">
                                                            <span className="mtext-107 cl2 p-r-20">
                                                                {' '}
                                                                Ariana Grande{' '}
                                                            </span>

                                                            <span className="fs-18 cl11">
                                                                <i className="zmdi zmdi-star"></i>
                                                                <i className="zmdi zmdi-star"></i>
                                                                <i className="zmdi zmdi-star"></i>
                                                                <i className="zmdi zmdi-star"></i>
                                                                <i className="zmdi zmdi-star-half"></i>
                                                            </span>
                                                        </div>

                                                        <p className="stext-102 cl6">
                                                            Quod autem in homine praestantissimum atque optimum est, id
                                                            deseruit. Apud ceteros autem philosophos
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* <!-- Add review --> */}
                                                <form className="w-full">
                                                    <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>

                                                    <p className="stext-102 cl6">
                                                        Your email address will not be published. Required fields are
                                                        marked *
                                                    </p>

                                                    <div className="flex-w flex-m p-t-50 p-b-23">
                                                        <span className="stext-102 cl3 m-r-16"> Your Rating </span>

                                                        {/* <span className="wrap-rating fs-18 cl11 pointer">
                                                            <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                            <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                            <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                            <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                            <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                            <input className="dis-none" type="number" name="rating" />
                                                        </span> */}
                                                        <span className="wrap-rating fs-18 cl11 pointer">
                                                            {[1, 2, 3, 4, 5].map((value, index) => (
                                                                <i
                                                                    key={index}
                                                                    className={`item-rating pointer zmdi ${
                                                                        index < temp || index < rated
                                                                            ? 'zmdi-star'
                                                                            : 'zmdi-star-outline'
                                                                    }`}
                                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                    onClick={() => handleClickRating(index)}
                                                                />
                                                            ))}
                                                            <input
                                                                className="dis-none"
                                                                type="number"
                                                                name="rating"
                                                                value={rated}
                                                                onChange={handleChangeRating}
                                                            />
                                                        </span>
                                                    </div>

                                                    <div className="row p-b-25">
                                                        <div className="col-12 p-b-5">
                                                            <label className="stext-102 cl3" for="review">
                                                                Your review
                                                            </label>
                                                            <textarea
                                                                className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                                                id="review"
                                                                name="review"
                                                            ></textarea>
                                                        </div>

                                                        <div className="col-sm-6 p-b-5">
                                                            <label className="stext-102 cl3" for="name">
                                                                Name
                                                            </label>
                                                            <input
                                                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                id="name"
                                                                type="text"
                                                                name="name"
                                                            />
                                                        </div>

                                                        <div className="col-sm-6 p-b-5">
                                                            <label className="stext-102 cl3" for="email">
                                                                Email
                                                            </label>
                                                            <input
                                                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                id="email"
                                                                type="text"
                                                                name="email"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
                    <span className="stext-107 cl6 p-lr-25"> SKU: JAK-01 </span>

                    <span className="stext-107 cl6 p-lr-25"> Categories: Jacket, Men </span>
                </div>
            </section>

            {/* <!-- Related Products --> */}
            <section className="sec-relate-product bg0 p-t-45 p-b-105">
                <div className="container">
                    <div className="p-b-45">
                        <h3 className="ltext-106 cl5 txt-center">Sản phẩm liên quan</h3>
                    </div>

                    {/* <!-- Slide2 --> */}
                    <div className="wrap-slick2">
                        <Slider {...settingsRelateProduct} className="slick2">
                            {RelateProducts.map((item, index) => (
                                <div key={index} className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                                    {/* <!-- Block2 --> */}
                                    <div className="block2">
                                        <div className="block2-pic hov-img0">
                                            <img src={item.img} alt="IMG-PRODUCT" />

                                            <a
                                                href="#"
                                                className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                                onClick={handleShowModal}
                                            >
                                                Quick View
                                            </a>
                                        </div>

                                        <div className="block2-txt flex-w flex-t p-t-14">
                                            <div className="block2-txt-child1 flex-col-l">
                                                <a
                                                    href="product-detail.html"
                                                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                                                >
                                                    {item.name}
                                                </a>

                                                <span className="stext-105 cl3">{item.price} </span>
                                            </div>

                                            <div className="block2-txt-child2 flex-r p-t-3">
                                                <a
                                                    href="#"
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
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {showModal && <ModalProduct handleHideModal={handleHideModal} />}
        </div>
    );
}

export default ProductDetail;
