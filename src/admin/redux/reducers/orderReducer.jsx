import {
    ORDERS_SET,
    ORDER_APPEND,
    ORDER_DELETE,
    ORDER_SET,
    ORDER_SET_PAGEABLE,
    ORDER_UPDATE,
    ORDER_STATE_CLEAR,
} from '../actions/actionTypes';

const initialState = {
    order: {},
    orders: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        username: '',
        totalPages: 1,
    },
};

const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ORDER_SET:
            return { ...state, order: payload };
        case ORDERS_SET:
            return { ...state, orders: payload };
        case ORDER_APPEND:
            return { ...state, orders: [payload, ...state.orders] };
        case ORDER_DELETE:
            return { ...state, orders: state.orders.filter((item) => item.id !== payload) };
        case ORDER_UPDATE:
            const newBrands = state.orders.filter((item) => item.id !== payload.id);
            return { ...state, orders: [payload, ...newBrands] };
        case ORDER_SET_PAGEABLE:
            return { ...state, pagination: payload };
        case ORDER_STATE_CLEAR:
            return { order: {}, orders: [] };
        default:
            return state;
    }
};
export default orderReducer;
