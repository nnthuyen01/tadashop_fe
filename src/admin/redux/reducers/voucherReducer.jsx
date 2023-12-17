import {
    VOUCHERS_SET,
    VOUCHER_APPEND,
    VOUCHER_DELETE,
    VOUCHER_SET,
    VOUCHER_SET_PAGEABLE,
    VOUCHER_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    voucher: {},
    vouchers: [],
    pagination: {
        size: 10,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
    },
};

const voucherReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case VOUCHER_SET:
            return { ...state, voucher: payload };
        case VOUCHERS_SET:
            return { ...state, vouchers: payload };
        case VOUCHER_APPEND:
            return { ...state, vouchers: [payload, ...state.vouchers] };
        case VOUCHER_DELETE:
            return { ...state, vouchers: state.vouchers.filter((item) => item.id !== payload) };
        case VOUCHER_UPDATE:
            const newVouchers = state.vouchers.filter((item) => item.id !== payload.id);
            return { ...state, vouchers: [payload, ...newVouchers] };
        case VOUCHER_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default voucherReducer;
