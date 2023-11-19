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
    productDetail: '/product-detail/:product/:id',
    contact: '/contact',
    order: '/order',
    thankyou: '/checkout/:idOrder/thankyou',
    paymentFail: '/payment-fail',
};
export default routes;
