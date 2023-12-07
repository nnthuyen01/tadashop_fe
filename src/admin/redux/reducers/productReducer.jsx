import { PRODUCTS_SET, PRODUCT_DELETE, PRODUCT_SET, PRODUCT_SET_PAGEABLE } from '../actions/actionTypes';

const initialState = {
    product: {
        // id: '',
        // name: '',
        // price: 0,
        // totalQuantity: 0,
        // isFeatured: false,
        // discount: 0,
        // brief: '',
        // description: undefined,
    },
    products: [],
    pagination: {
        size: 10,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
        sort: 'id,desc',
    },
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_SET:
            return { ...state, product: payload };
        case PRODUCTS_SET:
            return { ...state, products: payload };
        case PRODUCT_DELETE:
            return { ...state, products: state.products.filter((item) => item.id !== payload) };
        case PRODUCT_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default productReducer;
