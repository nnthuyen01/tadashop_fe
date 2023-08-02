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
import HomeAdmin from '~/admin/components/HomeAdmin';
import AddOrEditClub from '~/admin/components/club/AddOrEditClub';
import ListClubs from '~/admin/components/club/ListClubs';
import ListBrands from '~/admin/components/brand/ListBrands';

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
const privateRoutes = [
    { path: config.routesAdmin.dashboard, component: HomeAdmin },
    { path: config.routesAdmin.addClub, component: AddOrEditClub },
    { path: config.routesAdmin.updateClub, component: AddOrEditClub },
    { path: config.routesAdmin.listClubs, component: ListClubs },
    { path: config.routesAdmin.listBrands, component: ListBrands },
    { path: config.routesAdmin.listVouchers, component: ListBrands },
    { path: config.routesAdmin.listPayments, component: ListBrands },
];
export { publicRoutes, privateRoutes };
