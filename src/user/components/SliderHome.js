import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

function SliderHome() {
    // silder
    const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={'arrow-slick1 prev-slick1' + (currentSlide === 0 ? ' slick-disabled' : '')}
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
        >
            <i className="zmdi zmdi-caret-left"></i>
        </button>
    );

    const NextArrow = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={'arrow-slick1 next-slick1' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
        >
            <i className="zmdi zmdi-caret-right"></i>
        </button>
    );

    const slidesData = [
        {
            imgSilder: 'assets/images/bg1.jpg',
            thumb: 'assets/images/bg1.jpg',
            caption: 'Thời Trang',
            titleTiny: 'Manchester United',
            titleBig: 'Phong cách Thời Thượng',
        },
        {
            imgSilder: 'assets/images/bg2.jpg',
            thumb: 'assets/images/thumb-02.jpg',
            caption: 'Mạnh Mẽ',
            titleTiny: 'Manchester United',
            titleBig: 'Mùa giải 23/24',
        },
        {
            imgSilder: 'assets/images/bg3.jpg',
            thumb: 'assets/images/thumb-03.jpg',
            caption: 'Năng Động',
            titleTiny: 'Arsenal',
            titleBig: 'Bóng đá đam mê',
        },
        // Add more slide data as needed...
    ];

    const settingSliderShow = {
        dots: true,
        dotsClass: 'wrap-slick1-dots',
        customPaging: function (i) {
            return (
                <div className="caption-dots">
                    <img src={`assets/images/thumb${i + 1}.jpg`} alt={`$i`} />
                    <span className="caption-dots-slick1">{slidesData[i].caption}</span>
                </div>
            );
        },
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        slidesToShow: 1,
        fade: true,
        speed: 1000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };
    return (
        <>
            {' '}
            {/* <!-- Slider --> */}
            <section className="section-slide">
                <div className="wrap-slick1 rs2-slick1">
                    <Slider className="slick1" {...settingSliderShow}>
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                className="item-slick1 bg-overlay1"
                                // data-thumb={slide.thumb}
                                // data-caption={slide.caption}
                            >
                                <div className="slider-img">
                                    <img src={slide.imgSilder} alt="" />
                                </div>

                                <div className="container h-full">
                                    <div className="flex-col-c-m h-full p-t-100 p-b-60 respon5">
                                        <div className="layer-slick1 animated " data-appear="fadeInDown" data-delay="0">
                                            <span className="ltext-202 txt-center cl0 respon2">{slide.titleTiny}</span>
                                        </div>

                                        <div className="layer-slick1 animated " data-appear="fadeInUp" data-delay="800">
                                            <h2 className="ltext-104 txt-center cl0 p-t-22 p-b-40 respon1">
                                                {slide.titleBig}
                                            </h2>
                                        </div>

                                        <div className="layer-slick1 animated " data-appear="zoomIn" data-delay="1600">
                                            <Link
                                                to={'/shop'}
                                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn2 p-lr-15 trans-04"
                                            >
                                                Mua Ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    <div className="wrap-slick1-dots p-lr-10"></div>
                </div>
            </section>
        </>
    );
}

export default SliderHome;
