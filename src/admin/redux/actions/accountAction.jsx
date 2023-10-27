import AccountService from '../../services/accountService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    ACCOUNTS_SET,
    ACCOUNT_APPEND,
    ACCOUNT_DELETE,
    ACCOUNT_SET,
    ACCOUNT_SET_PAGEABLE,
    ACCOUNT_UPDATE,
} from './actionTypes';
export const getAccounts = () => async (dispatch) => {
    const service = new AccountService();

    try {
        console.log('Get Accounts');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getAccounts();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ACCOUNTS_SET,
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

export const getAccountsPageable = (params) => async (dispatch) => {
    const service = new AccountService();

    try {
        console.log('Get Accounts Pageable');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getAccountsPageable(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ACCOUNTS_SET,
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
                type: ACCOUNT_SET_PAGEABLE,
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
export const getAccountsByName = (params) => async (dispatch) => {
    const service = new AccountService();

    try {
        console.log('Get Accounts by name');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getAccountsByName(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ACCOUNTS_SET,
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
                type: ACCOUNT_SET_PAGEABLE,
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
export const getAccountById = (id) => async (dispatch) => {
    const service = new AccountService();

    try {
        console.log('Get Account');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getAccount(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ACCOUNT_SET,
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

export const disabledAccountById = (id) => async (dispatch) => {
    const service = new AccountService();

    try {
        console.log('Update account');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.disableAccountById(id);
        const params = {
            page: 0,
            size: 5,
        };

        if (response.status === 201) {
            dispatch({
                type: ACCOUNT_SET,
                payload: response.data,
            });
            dispatch({
                type: ACCOUNT_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Account is updated',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        const response1 = await service.getAccountsPageable(params);
        dispatch({
            type: ACCOUNTS_SET,
            payload: response1.data.content,
        });
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
