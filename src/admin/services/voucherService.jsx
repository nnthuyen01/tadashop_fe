import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class VoucherService {
    insertVoucher = async (voucher) => {
        return await axios.post(API_URL + 'admin/voucher', voucher);
    };
    getVouchers = async () => {
        return await axios.get(API_URL + 'vouchers');
    };
    getVouchersByCode = async (params) => {
        return await axios.get(API_URL + 'vouchers/find', { params });
    };
    deleteVoucher = async (id) => {
        return await axios.delete(API_URL + 'admin/voucher/' + id);
    };
    getVoucher = async (id) => {
        return await axios.get(API_URL + 'voucher/' + id + '/get');
    };

    updateVoucher = async (voucher) => {
        return await axios.put(API_URL + 'admin/voucher', voucher);
    };
}
