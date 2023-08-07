import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class ProductService {
    insertProduct = async (product) => {
        return await axios.post(API_URL + 'admin/product', product);
    };
    //   getProducts = async () => {
    //     return await axios.get(API_URL);
    //   };
    getProductsByName = async (params) => {
        return await axios.get(API_URL + 'products/find', { params });
    };
    getProductList = async () => {
        return await axios.get(API_URL + 'products/list');
    };
    deleteProduct = async (id) => {
        return await axios.delete(API_URL + 'product/' + id);
    };
    getProductById = async (id) => {
        return await axios.get(API_URL + 'product/detail/' + id);
    };

    updateProduct = async (id, product) => {
        let formData = new FormData();
        formData.append('name', product.name);
        if (product.logoFile[0].originFileObj) {
            formData.append('logoFile', product.logoFile[0].originFileObj);
        }

        return await axios.patch(API_URL + 'admin/product/' + id, formData);
    };
    // static để gọi nhanh đến phương thức
    static deleteProductImage = async (fileName) => {
        await axios.delete(API_URL + 'product/images/' + fileName);
    };
    static getProductImageUrl = (filename) => {
        return API_URL + 'products/images/' + filename;
    };
    static getProductImageUploadUrl = (filename) => {
        return API_URL + 'products/images/one';
    };
}
