import OrderService from '../../services/orderService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    ORDERS_SET,
    ORDER_APPEND,
    ORDER_DELETE,
    ORDER_SET,
    ORDER_SET_PAGEABLE,
    ORDER_STATE_CLEAR,
    ORDER_UPDATE,
} from './actionTypes';

export const getOrders = () => async (dispatch) => {
    const service = new OrderService();

    try {
        console.log('Get Orders');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getOrders();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ORDERS_SET,
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

export const getOrdersPageable = (params) => async (dispatch) => {
    const service = new OrderService();

    try {
        console.log('Get Orders Pageable');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getOrdersPageable(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ORDERS_SET,
                payload: response.data.content,
            });

            const { size, totalPages, totalElements, pageable } = response.data;
            const pagination = {
                size: size,
                page: pageable.pageNumber,
                username: params.username,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({
                type: ORDER_SET_PAGEABLE,
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

export const getOrderById = (id) => async (dispatch) => {
    const service = new OrderService();

    try {
        console.log('Get Order');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getOrder(id);

        // console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ORDER_SET,
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

export const updateOrder = (order, paginationQ) => async (dispatch) => {
    const service = new OrderService();

    try {
        console.log('Update order');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const { id } = order;
        const response = await service.updateOrder(id, order);

        const response1 = await service.getOrdersPageable(paginationQ);
        const response2 = await service.getOrder(id);

        if (response.status === 200) {
            dispatch({
                type: ORDER_STATE_CLEAR,
            });
            dispatch({
                type: ORDER_SET,
                payload: response2.data,
            });
            dispatch({
                type: ORDERS_SET,
                payload: response1.data.content,
            });

            const { size, totalPages, totalElements, pageable } = response1.data;
            const pagination = {
                size: size,
                page: pageable.pageNumber,
                username: paginationQ.username,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({
                type: ORDER_SET_PAGEABLE,
                payload: pagination,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Order is updated',
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

export const getOrdersByStatus = (params) => async (dispatch) => {
    const service = new OrderService();

    try {
        console.log('Get Orders by status');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getOrderByStatus(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ORDERS_SET,
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
