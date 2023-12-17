import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './modalExpiration.scss';
function TokenExpirationChecker() {
    const navigate = useNavigate();
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Kiểm tra xem access_token có trong localStorage hay không
        const token = localStorage.getItem('auth_token');

        if (token) {
            // Decode token để truy cập thông tin thời gian hết hạn
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

            // Kiểm tra xem thời gian hiện tại có lớn hơn thời gian hết hạn không
            if (Date.now() >= expirationTime) {
                // Token đã hết hạn, xóa nó và đăng xuất người dùng
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('role');
                setIsTokenExpired(true);
                setIsLoading(false);

                navigate('/');
            } else {
                // Token còn hiệu lực
                setIsLoading(false);
            }
        } else {
            // Không có token
            setIsLoading(false);
        }
    }, [navigate]);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {isTokenExpired && (
                <div className="blocks">
                    <div className="popup">
                        <h1>Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại !!!</h1>
                        <span className="close" onClick={() => setIsTokenExpired(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TokenExpirationChecker;
