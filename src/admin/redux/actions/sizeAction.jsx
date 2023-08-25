import SizeService from '../../services/sizeService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    SIZES_SET,
    SIZE_APPEND,
    SIZE_DELETE,
    SIZE_SET,
    SIZE_UPDATE,
} from './actionTypes';

export const insertSize = (size) => async (dispatch) => {
    const service = new SizeService();

    try {
        console.log('Insert size');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertSize(size);

        if (response.status === 201) {
            dispatch({
                type: SIZE_SET,
                payload: response.data,
            });
            dispatch({
                type: SIZE_APPEND,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Size is saved',
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

export const getSizes = () => async (dispatch) => {
    const service = new SizeService();

    try {
        console.log('Get Sizes');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getSizes();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: SIZES_SET,
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

export const getSize = (id) => async (dispatch) => {
    const service = new SizeService();

    try {
        console.log('Get Size');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getSizes(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: SIZE_SET,
                payload: response.data,
            });
            dispatch({
                type: SIZE_APPEND,
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

export const updateSize = (size) => async (dispatch) => {
    const service = new SizeService();

    try {
        console.log('Update size');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });
        const { id } = size;

        const response = await service.updateSize(id, size);

        if (response.status === 201) {
            dispatch({
                type: SIZE_SET,
                payload: response.data,
            });
            dispatch({
                type: SIZE_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Size is updated',
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

export const deleteSize = (id) => async (dispatch) => {
    const service = new SizeService();

    try {
        console.log('Delete Size');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteSize(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: SIZE_DELETE,
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
