const routes = {
    home: '/',
    shop: '/shop',
    about: '/about',
    blog: '/blog',
    blogDetail: '/blogDetail',
    cart: '/cart',
    checkout: '/checkout',
    profile: '/profile/:username',
    changePassword: '/changePassword/:username',
    voucher: '/voucher/:username',
    productDetail: '/product-detail/:product/:id',
    contact: '/contact',
    order: '/order',
    orderDetail: '/order-detail/:id',
    thankyou: '/checkout/:idOrder/thankyou',
    paymentFail: '/payment-fail',

    productQuery: '/search',
    productLeagues: '/product-leagues/:league',
};
export default routes;
