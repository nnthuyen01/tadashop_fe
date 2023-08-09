import { PRODUCTS_SET, PRODUCT_DELETE, PRODUCT_SET } from '../actions/actionTypes';

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
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_SET:
            return { ...state, product: payload };
        case PRODUCTS_SET:
            return { ...state, products: payload };
        case PRODUCT_DELETE:
            return { ...state, products: state.products.filter((item) => item.id !== payload) };
        default:
            return state;
    }
};
export default productReducer;
