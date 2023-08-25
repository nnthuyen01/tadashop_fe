import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class SizeService {
    insertSize = async (size) => {
        return await axios.post(API_URL + 'admin/size', size);
    };
    getSizes = async () => {
        return await axios.get(API_URL + 'size/all');
    };
    deleteSize = async (id) => {
        return await axios.delete(API_URL + 'size/' + id);
    };
    getSize = async (id) => {
        return await axios.get(API_URL + 'size/' + id);
    };

    updateSize = async (id, size) => {
        return await axios.patch(API_URL + 'admin/size/' + id, size);
    };
}
