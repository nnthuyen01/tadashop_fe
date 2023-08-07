import { PRODUCTS_SET, PRODUCT_SET } from '../actions/actionTypes';

const initialState = {
    product: {},
    products: [],
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_SET:
            return { ...state, product: payload };
        case PRODUCTS_SET:
            return { ...state, products: payload };
        default:
            return state;
    }
};
export default productReducer;
