import {
    ACCOUNTS_SET,
    ACCOUNT_APPEND,
    ACCOUNT_DELETE,
    ACCOUNT_SET,
    ACCOUNT_SET_PAGEABLE,
    ACCOUNT_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    account: {},
    accounts: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
    },
};

const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACCOUNT_SET:
            return { ...state, account: payload };
        case ACCOUNTS_SET:
            return { ...state, accounts: payload };
        case ACCOUNT_APPEND:
            return { ...state, accounts: [payload, ...state.accounts] };
        case ACCOUNT_DELETE:
            return { ...state, accounts: state.accounts.filter((item) => item.id !== payload) };
        case ACCOUNT_UPDATE:
            const newBrands = state.accounts.filter((item) => item.id !== payload.id);
            return { ...state, accounts: [payload, ...newBrands] };
        case ACCOUNT_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default accountReducer;
