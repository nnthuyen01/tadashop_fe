import PaymentService from '../../services/paymentService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    PAYMENTS_SET,
    PAYMENT_APPEND,
    PAYMENT_DELETE,
    PAYMENT_SET,
    PAYMENT_UPDATE,
} from './actionTypes';

export const insertPayment = (payment) => async (dispatch) => {
    const service = new PaymentService();

    try {
        console.log('Insert payment');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertPayment(payment);

        if (response.status === 201) {
            dispatch({
                type: PAYMENT_SET,
                payload: response.data,
            });
            dispatch({
                type: PAYMENT_APPEND,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Payment is saved',
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

export const getPayments = () => async (dispatch) => {
    const service = new PaymentService();

    try {
        console.log('Get Payments');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getPayments();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: PAYMENTS_SET,
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

export const getPayment = (id) => async (dispatch) => {
    const service = new PaymentService();

    try {
        console.log('Get Payment');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getPayments(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: PAYMENT_SET,
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

export const updatePayment = (payment) => async (dispatch) => {
    const service = new PaymentService();

    try {
        console.log('Update payment');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.updatePayment(payment);

        if (response.status === 200) {
            dispatch({
                type: PAYMENT_SET,
                payload: response.data,
            });
            dispatch({
                type: PAYMENT_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Payment is updated',
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

export const deletePayment = (id) => async (dispatch) => {
    const service = new PaymentService();

    try {
        console.log('Delete Payment');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deletePayment(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: PAYMENT_DELETE,
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
