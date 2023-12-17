import { SIZES_SET, SIZE_APPEND, SIZE_DELETE, SIZE_SET, SIZE_SET_PAGEABLE, SIZE_UPDATE } from '../actions/actionTypes';

const initialState = {
    size: {},
    sizes: [],
    pagination: {
        size: 10,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1,
    },
};

const sizeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIZE_SET:
            return { ...state, size: payload };
        case SIZES_SET:
            return { ...state, sizes: payload };
        case SIZE_APPEND:
            return { ...state, sizes: [payload, ...state.sizes] };
        case SIZE_DELETE:
            return { ...state, sizes: state.sizes.filter((item) => item.id !== payload) };
        case SIZE_UPDATE:
            const newSizes = state.sizes.filter((item) => item.id !== payload.id);
            return { ...state, sizes: [payload, ...newSizes] };
        case SIZE_SET_PAGEABLE:
            return { ...state, pagination: payload };
        default:
            return state;
    }
};
export default sizeReducer;
