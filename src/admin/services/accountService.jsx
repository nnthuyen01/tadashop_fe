import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class AccountService {
    getAccounts = async () => {
        return await axios.get(API_URL + 'admin/users');
    };
    getAccountsByName = async (params) => {
        return await axios.get(API_URL + 'admin/query/users', { params });
    };
    getAccountsPageable = async (params) => {
        return await axios.get(API_URL + 'admin/find/users', { params });
    };
    getAccount = async (id) => {
        return await axios.get(API_URL + 'admin/account/' + id);
    };
    disableAccountById = async (id) => {
        return await axios.put(API_URL + 'admin/users/disable/' + id);
    };
    // static để gọi nhanh đến phương thức
    static getAvatarUserUrl = (filename) => {
        return API_URL + 'user/avatar/' + filename;
    };
}
