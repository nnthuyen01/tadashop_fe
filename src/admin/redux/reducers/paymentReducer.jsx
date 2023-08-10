import {
    PAYMENTS_SET,
    PAYMENT_APPEND,
    PAYMENT_DELETE,
    PAYMENT_SET,
    PAYMENT_SET_PAGEABLE,
    PAYMENT_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    payment: {},
    payments: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
    },
};

const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PAYMENT_SET:
            return { ...state, payment: payload };
        case PAYMENTS_SET:
            return { ...state, payments: payload };
        case PAYMENT_APPEND:
            return { ...state, payments: [payload, ...state.payments] };
        case PAYMENT_DELETE:
            return { ...state, payments: state.payments.filter((item) => item.id !== payload) };
        case PAYMENT_UPDATE:
            const newPayments = state.payments.filter((item) => item.id !== payload.id);
            return { ...state, payments: [payload, ...newPayments] };
        case PAYMENT_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default paymentReducer;
