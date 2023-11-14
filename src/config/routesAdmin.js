const routesAdmin = {
    dashboard: '/dashboard',

    addClub: '/dashboard/club/add',
    updateClub: '/dashboard/club/update/:id',
    listClubs: '/dashboard/club/list',

    addLeague: '/dashboard/league/add',
    updateLeague: '/dashboard/league/update/:id',
    listLeagues: '/dashboard/league/list',

    listBrands: '/dashboard/brand',
    listVouchers: '/dashboard/voucher',
    listPayments: '/dashboard/payment',

    uploadImages: '/dashboard/products/upload',
    addProduct: '/dashboard/products/add',
    updateProduct: '/dashboard/products/update/:id',
    listProducts: '/dashboard/products/list',
    productDetailAdmin: '/dashboard/products/view/:id',

    sizeProduct: '/dashboard/products/size',

    accounts: '/dashboard/accounts',
    accountDetailAdmin: '/dashboard/accounts/view/:id',

    order: '/dashboard/order',
    orderDetailAdmin: '/dashboard/order/view/:id',

    statistics: '/dashboard/statistics',
};
export default routesAdmin;
