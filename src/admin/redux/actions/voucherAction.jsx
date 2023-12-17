import VoucherService from '../../services/voucherService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    VOUCHERS_SET,
    VOUCHER_APPEND,
    VOUCHER_DELETE,
    VOUCHER_SET,
    VOUCHER_SET_PAGEABLE,
    VOUCHER_UPDATE,
} from './actionTypes';

export const insertVoucher = (voucher) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Insert voucher');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertVoucher(voucher);

        if (response.status === 201) {
            dispatch({
                type: VOUCHER_SET,
                payload: response.data,
            });
            dispatch({
                type: VOUCHER_APPEND,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Voucher is saved',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getVouchers = () => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Get Vouchers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getVouchers();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: VOUCHERS_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getVouchersByCode = (params) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Get Vouchers by code');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getVouchersByCode(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: VOUCHERS_SET,
                payload: response.data.content,
            });
            const { size, totalPages, totalElements, pageable } = response.data;
            const pagination = {
                size: size,
                page: pageable.pageNumber,
                query: params.query,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({
                type: VOUCHER_SET_PAGEABLE,
                payload: pagination,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};
export const getVoucher = (id) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Get Voucher');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getVouchers(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: VOUCHER_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const updateVoucher = (voucher) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Update voucher');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.updateVoucher(voucher);

        if (response.status === 201) {
            dispatch({
                type: VOUCHER_SET,
                payload: response.data,
            });
            dispatch({
                type: VOUCHER_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Voucher is updated',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const deleteVoucher = (id) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Delete Voucher');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteVoucher(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: VOUCHER_DELETE,
                payload: id,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getVouchersPageable = (params) => async (dispatch) => {
    const service = new VoucherService();

    try {
        console.log('Get Vouchers Pageable');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getVouchersPageable(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: VOUCHERS_SET,
                payload: response.data.content,
            });

            const { size, totalPages, totalElements, pageable } = response.data;
            const pagination = {
                size: size,
                page: pageable.pageNumber,
                query: params.query,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({
                type: VOUCHER_SET_PAGEABLE,
                payload: pagination,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};
