import { useNavigate } from 'react-router-dom';
import HeaderPages from '~/user/components/HeaderPages';
function PaymentFail() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />

            {/* <!-- Content page --> */}
            <section className="bg0 p-t-104 p-b-116">
                <div className="container">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            flexDirection: 'column',
                            backgroundColor: '#ccc',
                        }}
                    >
                        <h2>THANH TOÁN THẤT BẠI</h2>
                        <h5>Giao dịch của bạn đã bị hủy bỏ</h5>
                        <button
                            style={{
                                padding: '10px',
                                marginTop: '5px',
                                backgroundColor: '#fff',
                            }}
                            onClick={() => navigate('/')}
                        >
                            QUAY LẠI
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default PaymentFail;
