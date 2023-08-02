import BrandService from '../../services/brandService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    BRANDS_SET,
    BRAND_APPEND,
    BRAND_DELETE,
    BRAND_SET,
    BRAND_SET_PAGEABLE,
    BRAND_UPDATE,
} from './actionTypes';

export const insertBrand = (brand) => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Insert brand');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertBrand(brand);

        if (response.status === 201) {
            dispatch({
                type: BRAND_SET,
                payload: response.data,
            });
            dispatch({
                type: BRAND_APPEND,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Brand is saved',
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

export const getBrands = () => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Get Brands');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getBrands();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: BRANDS_SET,
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

export const getBrandsByName = (params) => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Get Brands by name');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getBrandsByName(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: BRANDS_SET,
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
                type: BRAND_SET_PAGEABLE,
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
export const getBrand = (id) => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Get Brand');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getBrands(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: BRAND_SET,
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

export const updateBrand = (brand) => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Update brand');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const { id } = brand;
        const response = await service.updateBrand(id, brand);

        if (response.status === 201) {
            dispatch({
                type: BRAND_SET,
                payload: response.data,
            });
            dispatch({
                type: BRAND_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Brand is updated',
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

export const deleteBrand = (id) => async (dispatch) => {
    const service = new BrandService();

    try {
        console.log('Delete Brand');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteBrand(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: BRAND_DELETE,
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
