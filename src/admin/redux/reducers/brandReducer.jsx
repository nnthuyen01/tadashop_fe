import {
    BRANDS_SET,
    BRAND_APPEND,
    BRAND_DELETE,
    BRAND_SET,
    BRAND_SET_PAGEABLE,
    BRAND_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    brand: {},
    brands: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
    },
};

const brandReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BRAND_SET:
            return { ...state, brand: payload };
        case BRANDS_SET:
            return { ...state, brands: payload };
        case BRAND_APPEND:
            return { ...state, brands: [payload, ...state.brands] };
        case BRAND_DELETE:
            return { ...state, brands: state.brands.filter((item) => item.id !== payload) };
        case BRAND_UPDATE:
            const newBrands = state.brands.filter((item) => item.id !== payload.id);
            return { ...state, brands: [payload, ...newBrands] };
        case BRAND_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default brandReducer;
