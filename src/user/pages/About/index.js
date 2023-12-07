import { useEffect } from 'react';
import HeaderPages from '~/user/components/HeaderPages';

function About() {
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />

            {/* <!-- Title page --> */}
            <section
                className="bg-img1 txt-center p-lr-15 p-tb-92"
                style={{ backgroundImage: "url('assets/images/bg-01.png')" }}
            >
                <h2 className="ltext-105 cl0 txt-center">About</h2>
            </section>

            {/* <!-- Content page --> */}
            <section className="bg0 p-t-75 p-b-120">
                <div className="container">
                    <div className="row p-b-148">
                        <div className="col-md-7 col-lg-8">
                            <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">Về chúng tôi</h3>

                                <p className="stext-113 cl6 p-b-26">
                                    Thiết kế độc đáo, mới lạ và đầy sáng tạo cùng với đội ngũ thiết kế áo bóng đá chuyên
                                    nghiệp, tiềm năng. Chất liệu vải may đa dạng từ hàng rẻ cho đến hàng cao cấp phù hợp
                                    cho tất cả mọi lứa tuổi chơi bóng. Cam kết thấm hút mồ hôi tốt, cõ giãn cực độ và
                                    siêu bền bỉ.
                                </p>

                                <p className="stext-113 cl6 p-b-26">
                                    Dịch vụ in ấn chuyển nhiệt 3D hiện đại – chuyên nghiệp tại Tada Store được bảo hành
                                    in 2 năm với chất lượng đảm bảo không nhòe, không phai mờ. Đặt may áo bóng đá thiết
                                    kế mới nhất tại Tada Store bạn sẽ nhận được vô vàn quà tặng hấp dẫn như: Quả bóng đá
                                    động lực, giày bóng đá, găng tay thủ môn và nhiều phụ kiện bóng đá khác. Ngoài ra,
                                    việc lựa chọn size áo phù hợp không còn là điều khó khăn khi shop đã có bảng size
                                    đặt may châu Á cực chuẩn từ size S nhỏ nhất cho đến big size 3XL.
                                </p>

                                <p className="stext-113 cl6 p-b-26">
                                    Với phương châm phục vụ hết mình cho các Fan Cứng, Tada Store luôn nổ lực không
                                    ngừng để cung cấp cho khách hàng những chất lượng tốt nhất.
                                </p>
                            </div>
                        </div>

                        <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                            <div className="how-bor1 ">
                                <div className="hov-img0">
                                    <img src="assets/images/about-01.jpg" alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
                            <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">Nhiệm vụ</h3>

                                <p className="stext-113 cl6 p-b-26">
                                    Shop chúng tôi là điểm đến lý tưởng cho những người yêu thể thao, đặc biệt là bóng
                                    đá. Chúng tôi hiểu rằng, không chỉ cơ thể mà tâm hồn cũng cần được chăm sóc. Với đội
                                    ngũ nhân viên giàu kinh nghiệm và đam mê, chúng tôi cam kết mang đến cho bạn những
                                    trải nghiệm mua sắm đẳng cấp và thú vị nhất. Chúng tôi cung cấp những bộ trang phục
                                    bóng đá chất lượng cao, được thiết kế theo xu hướng mới nhất. Sự thoải mái và phong
                                    cách sẽ điều bạn tìm kiếm trong từng sản phẩm. Áo, quần, giày, và phụ kiện - tất cả
                                    đều được lựa chọn kỹ lưỡng để đảm bảo sự hài lòng của bạn. Hãy đến và khám phá thế
                                    giới bóng đá tại cửa hàng của chúng tôi. Chúng tôi tin rằng, để trở thành nhà vô
                                    địch, trí óc của bạn quan trọng không kém phần quan trọng so với tất cả những khía
                                    cạnh khác trên sân cỏ.
                                </p>

                                <div className="bor16 p-l-29 p-b-9 m-t-22">
                                    <p className="stext-114 cl6 p-r-40 p-b-11">
                                        Cho những ai là vận động viên kể cả nam lẫn nữ nếu bạn muốn trở thành nhà vô
                                        địch: trí óc của bạn quan trọng hơn tất cả những bộ phận còn lại trên cơ thể
                                    </p>

                                    <span className="stext-111 cl8">- Gary Neville</span>
                                </div>
                                <div className="bor16 p-l-29 p-b-9 m-t-22">
                                    <p className="stext-114 cl6 p-r-40 p-b-11">
                                        Hãy để chúng tôi là đối tác tin cậy của bạn trên hành trình chinh phục đỉnh cao
                                        bóng đá. Chọn lựa từ bộ sưu tập đa dạng của chúng tôi và hãy để phong cách của
                                        bạn nói lên niềm đam mê. Hãy cùng nhau xây dựng những khoảnh khắc đáng nhớ trên
                                        sân cỏ và ngoài đời. Hãy thăm cửa hàng của chúng tôi ngay hôm nay để trải nghiệm
                                        không gian mua sắm độc đáo và đội ngũ nhân viên tận tâm phục vụ. Chúng tôi tự
                                        hào là địa chỉ tin cậy cho cộng đồng đam mê bóng đá!
                                    </p>

                                    <span className="stext-111 cl8">- Đội ngũ Shop Tada Store</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
                            <div className="how-bor2">
                                <div className="hov-img0">
                                    <img src="assets/images/about-02.jpg" alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
