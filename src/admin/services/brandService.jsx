import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class BrandService {
    insertBrand = async (brand) => {
        let formData = new FormData();
        formData.append('name', brand.name);
        if (brand.logoFile[0].originFileObj) {
            formData.append('logoFile', brand.logoFile[0].originFileObj);
        }
        return await axios.post(API_URL + 'admin/brand', formData);
    };
    getBrands = async () => {
        return await axios.get(API_URL + 'brand');
    };
    getBrandsByName = async (params) => {
        return await axios.get(API_URL + 'brand/find', { params });
    };
    deleteBrand = async (id) => {
        return await axios.delete(API_URL + 'brand/' + id);
    };
    getBrand = async (id) => {
        return await axios.get(API_URL + 'brand/' + id + '/get');
    };

    updateBrand = async (id, brand) => {
        let formData = new FormData();
        formData.append('name', brand.name);
        if (brand.logoFile[0].originFileObj) {
            formData.append('logoFile', brand.logoFile[0].originFileObj);
        }

        return await axios.patch(API_URL + 'brand/' + id, formData);
    };
    // static để gọi nhanh đến phương thức
    static getBrandLogoUrl = (filename) => {
        return API_URL + 'brand/logo/' + filename;
    };
}
