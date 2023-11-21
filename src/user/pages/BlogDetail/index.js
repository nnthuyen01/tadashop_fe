import { useEffect } from 'react';
import HeaderPages from '~/user/components/HeaderPages';

function BlogDetail() {
    const listStyle = {
        padding: '0',
    };

    const listItemStyle = {
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '15px',
        listStyleType: 'disc',
    };

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />

            {/* <!-- breadcrumb --> */}
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" className="stext-107 cl8 hov-cl1 trans-04">
                        Trang Chủ
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <a href="blog.html" className="stext-107 cl8 hov-cl1 trans-04">
                        Bài Viết
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <span className="stext-107 cl4">Top 10 Cầu Thủ Mặc Áo Bóng Đá Đẹp Nhất Năm</span>
                </div>
            </div>

            {/* <!-- Content page --> */}
            <section className="bg0 p-t-52 p-b-20">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-9 p-b-80">
                            <div className="p-r-45 p-r-0-lg">
                                <div>
                                    <h4 className="ltext-109 cl2 p-b-28">Top 10 Cầu Thủ Mặc Áo Bóng Đá Đẹp Nhất Năm</h4>
                                    <span className="flex-w flex-m stext-111 cl2 p-b-19">
                                        <span>
                                            <span className="cl4">By</span> Admin
                                            <span className="cl12 m-l-4 m-r-6">|</span>
                                        </span>

                                        <span>
                                            31 Oct, 2023
                                            <span className="cl12 m-l-4 m-r-6">|</span>
                                        </span>

                                        <span>
                                            FootballStyle
                                            <span className="cl12 m-l-4 m-r-6">|</span>
                                        </span>

                                        {/* <span>8 Comments</span> */}
                                    </span>
                                    <p className="stext-116 cl6 p-b-26">
                                        Bạn có bao giờ tự hỏi ai là những cầu thủ mặc áo bóng đá đẹp nhất năm? Áo bóng
                                        đá không chỉ là một bộ trang phục thể thao, mà còn là biểu tượng của sự đam mê
                                        và niềm tự hào của mỗi cầu thủ. Trong bài viết này, chúng ta sẽ khám phá về
                                        những cầu thủ có phong cách mặc áo bóng đá độc đáo và ấn tượng nhất. Hãy cùng
                                        tìm hiểu nhé!
                                    </p>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">1. Cristiano Ronaldo</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/thumbBlog1.png" alt="IMG-BLOG" />

                                            <div className="flex-col-c-m size-123 bg9 how-pos5">
                                                <span className="ltext-107 cl2 txt-center">31</span>

                                                <span className="stext-109 cl3 txt-center">Oct 2023</span>
                                            </div>
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Cổ điển và lịch thiệp
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 7</li>
                                            </ul>
                                            <b>Cristiano Ronaldo</b> không chỉ nổi tiếng với kỹ thuật chơi bóng đá xuất
                                            sắc mà còn là một biểu tượng thời trang. Áo bóng đá mà anh mặc thường có
                                            kiểu dáng cổ điển, tinh tế và luôn tạo được ấn tượng mạnh mẽ trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">2. Lionel Messi</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog2.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Adidas</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Trang nhã và tối giản
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 10</li>
                                            </ul>
                                            <b>Lionel Messi</b> là một trong những cầu thủ xuất sắc nhất trong lịch sử
                                            bóng đá và cũng có gu thời trang đẳng cấp. Áo bóng đá mà anh mặc thường có
                                            kiểu dáng đơn giản, trang nhã nhưng vẫn rất đẹp mắt và ấn tượng.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">3. Neymar Jr.</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog3.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>Phong cách đặc trưng: Mạnh mẽ và sáng tạo</li>
                                                <li style={listItemStyle}>Số áo phổ biến: 10</li>
                                            </ul>
                                            <b>Neymar Jr.</b> không chỉ được biết đến với tài năng chơi bóng đá xuất sắc
                                            mà còn với phong cách thời trang độc đáo. Áo bóng đá mà anh mặc thường có sự
                                            kết hợp màu sắc táo bạo và nổi bật, tạo nên sự ấn tượng mạnh mẽ trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">4. Kylian Mbappé</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog4.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Trẻ trung và năng động
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 7</li>
                                            </ul>
                                            <b>Kylian Mbappé</b> là một trong những tài năng trẻ triển vọng nhất hiện
                                            nay và cũng có gu thời trang đáng ngưỡng mộ. Áo bóng đá mà anh mặc thường
                                            mang trong mình sự trẻ trung, năng động và luôn tạo được sự tươi mới trên
                                            sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">5. Paul Pogba</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog5.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Adidas</li>
                                                <li style={listItemStyle}>Phong cách đặc trưng: Độc đáo và sặc sỡ</li>
                                                <li style={listItemStyle}>Số áo phổ biến: 6</li>
                                            </ul>
                                            <b>Paul Pogba</b> không chỉ là một cầu thủ tài năng mà còn là một biểu tượng
                                            thời trang. Áo bóng đá mà anh mặc thường có những kiểu dáng độc đáo, sặc sỡ
                                            và đầy cá tính.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">6. Mohamed Salah</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog6.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Adidas</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Hiện đại và thời trang
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 11</li>
                                            </ul>
                                            <b>Mohamed Salah</b> là một trong những cầu thủ xuất sắc nhất của Liverpool
                                            và cũng có gu thời trang đáng ngưỡng mộ. Áo bóng đá mà anh mặc thường mang
                                            trong mình sự hiện đại, thời trang và luôn tạo được sự nổi bật trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">7. Sergio Ramos</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog7.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>Phong cách đặc trưng: Mạnh mẽ và uy quyền</li>
                                                <li style={listItemStyle}>Số áo phổ biến: 4</li>
                                            </ul>
                                            <b>Sergio Ramos</b> không chỉ là một trong những hậu vệ xuất sắc nhất mà còn
                                            là một biểu tượng thời trang. Áo bóng đá mà anh mặc thường mang trong mình
                                            sự mạnh mẽ, uy quyền và tạo được sự ấn tượng trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">8. Antoine Griezmann</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog8.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Hiện đại và thời trang
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 7</li>
                                            </ul>
                                            <b>Antoine Griezmann</b> klà một trong những cầu thủ tài năng của Barcelona
                                            và cũng có gu thời trang độc đáo. Áo bóng đá mà anh mặc thường mang trong
                                            mình sự hiện đại, thời trang và luôn tạo nên phong cách của riêng mình.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">9. Eden HazardEden Hazard</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog9.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>Phong cách đặc trưng: Mượt mà và tự nhiên</li>
                                                <li style={listItemStyle}>Số áo phổ biến: 10</li>
                                            </ul>
                                            <b>Eden Hazard</b> là một trong những tiền vệ xuất sắc nhất và cũng có gu
                                            thời trang đẳng cấp. Áo bóng đá mà anh mặc thường mang trong mình sự mượt
                                            mà, tự nhiên và luôn tạo được sự thanh lịch trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">10. Harry Kane</h5>
                                        <div className="wrap-pic-w how-pos5-parent p-b-26">
                                            <img src="assets/images/blog10.png" alt="IMG-BLOG" />
                                        </div>
                                        <p className="stext-116 cl6 p-b-26">
                                            <ul style={listStyle}>
                                                <li style={listItemStyle}>Nhà tài trợ: Nike</li>
                                                <li style={listItemStyle}>
                                                    Phong cách đặc trưng: Cổ điển và truyền thống
                                                </li>
                                                <li style={listItemStyle}>Số áo phổ biến: 9</li>
                                            </ul>
                                            <b>Harry Kane</b> là một trong những tiền đạo xuất sắc nhất của Tottenham và
                                            cũng có gu thời trang cổ điển. Áo bóng đá mà anh mặc thường mang trong mình
                                            sự cổ điển, truyền thống và luôn tạo nên phong cách mạnh mẽ trên sân cỏ.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="ltext-107 cl2 p-b-28">Kết luận</h5>
                                        <p className="stext-116 cl6 p-b-26">
                                            Qua bài viết này, chúng ta đã có cái nhìn tổng quan về những cầu thủ mặc áo
                                            bóng đá đẹp nhất năm. Chúng ta đã tìm hiểu về phong cách thời trang độc đáo
                                            của từng cầu thủ và những nhà tài trợ nổi tiếng đứng sau áo bóng đá của họ.
                                            Hy vọng rằng bạn đã tìm được những thông tin hữu ích và có thêm niềm đam mê
                                            với bóng đá!
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-w flex-t p-t-16">
                                    <span className="size-216 stext-116 cl8 p-t-4">Tags</span>

                                    <div className="flex-w size-217">
                                        <a
                                            href="#"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                        >
                                            FootballStyle
                                        </a>
                                    </div>
                                </div>

                                {/* <!--  --> */}
                                <div className="p-t-40">
                                    <h5 className="mtext-113 cl2 p-b-12">Ý kiến</h5>

                                    <p className="stext-107 cl6 p-b-40">
                                        Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *
                                    </p>

                                    <form>
                                        <div className="bor19 m-b-20">
                                            <textarea
                                                className="stext-111 cl2 plh3 size-124 p-lr-18 p-tb-15"
                                                name="cmt"
                                                placeholder="Chia sẻ ý kiến của bạn..."
                                            ></textarea>
                                        </div>

                                        <div className="bor19 size-218 m-b-20">
                                            <input
                                                className="stext-111 cl2 plh3 size-116 p-lr-18"
                                                type="text"
                                                name="name"
                                                placeholder="Name *"
                                            />
                                        </div>

                                        <div className="bor19 size-218 m-b-20">
                                            <input
                                                className="stext-111 cl2 plh3 size-116 p-lr-18"
                                                type="text"
                                                name="email"
                                                placeholder="Email *"
                                            />
                                        </div>

                                        <div className="bor19 size-218 m-b-30">
                                            <input
                                                className="stext-111 cl2 plh3 size-116 p-lr-18"
                                                type="text"
                                                name="web"
                                                placeholder="Website"
                                            />
                                        </div>

                                        <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04">
                                            Gửi
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3 p-b-80">
                            <div className="side-menu">
                                <div className="bor17 of-hidden pos-relative">
                                    <input
                                        className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                    />

                                    <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                                        <i className="zmdi zmdi-search"></i>
                                    </button>
                                </div>

                                <div className="p-t-55">
                                    <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                                    <ul>
                                        <li className="bor18">
                                            <a
                                                href="#"
                                                className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                                            >
                                                Fashion
                                            </a>
                                        </li>

                                        <li className="bor18">
                                            <a
                                                href="#"
                                                className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                                            >
                                                Beauty
                                            </a>
                                        </li>

                                        <li className="bor18">
                                            <a
                                                href="#"
                                                className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                                            >
                                                Street Style
                                            </a>
                                        </li>

                                        <li className="bor18">
                                            <a
                                                href="#"
                                                className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                                            >
                                                Life Style
                                            </a>
                                        </li>

                                        <li className="bor18">
                                            <a
                                                href="#"
                                                className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                                            >
                                                DIY & Crafts
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-t-65">
                                    <h4 className="mtext-112 cl2 p-b-33">Featured Products</h4>

                                    <ul>
                                        <li className="flex-w flex-t p-b-30">
                                            <a href="#" className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/product-min-01.jpg" alt="PRODUCT" />
                                            </a>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                                                    White Shirt With Pleat Detail Back
                                                </a>

                                                <span className="stext-116 cl6 p-t-20">$19.00</span>
                                            </div>
                                        </li>

                                        <li className="flex-w flex-t p-b-30">
                                            <a href="#" className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/product-min-02.jpg" alt="PRODUCT" />
                                            </a>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                                                    Converse All Star Hi Black Canvas
                                                </a>

                                                <span className="stext-116 cl6 p-t-20">$39.00</span>
                                            </div>
                                        </li>

                                        <li className="flex-w flex-t p-b-30">
                                            <a href="#" className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/product-min-03.jpg" alt="PRODUCT" />
                                            </a>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                                                    Nixon Porter Leather Watch In Tan
                                                </a>

                                                <span className="stext-116 cl6 p-t-20">$17.00</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-t-55">
                                    <h4 className="mtext-112 cl2 p-b-20">Archive</h4>

                                    <ul>
                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>July 2018</span>

                                                <span>(9)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>June 2018</span>

                                                <span>(39)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>May 2018</span>

                                                <span>(29)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>April 2018</span>

                                                <span>(35)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>March 2018</span>

                                                <span>(22)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>February 2018</span>

                                                <span>(32)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>January 2018</span>

                                                <span>(21)</span>
                                            </a>
                                        </li>

                                        <li className="p-b-7">
                                            <a
                                                href="#"
                                                className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2"
                                            >
                                                <span>December 2017</span>

                                                <span>(26)</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-t-50">
                                    <h4 className="mtext-112 cl2 p-b-27">Tags</h4>

                                    <div className="flex-w m-r--5">
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
                </div>
            </section>
        </div>
    );
}

export default BlogDetail;
