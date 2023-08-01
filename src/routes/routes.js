import config from '~/config';

// Layout
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/user/pages/Home';
import About from '~/user/pages/About';
import Profile from '~/user/pages/Profile';
import Shop from '~/user/pages/Shop';
import Blog from '~/user/pages/Blog';
import Cart from '~/user/pages/Cart';
import ProductDetail from '~/user/pages/ProductDetail';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.about, component: About },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.productDetail, component: ProductDetail },
];

// Private routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };
