import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class PaymentService {
    insertPayment = async (payment) => {
        return await axios.post(API_URL + 'admin/payment', payment);
    };
    getPayments = async () => {
        return await axios.get(API_URL + 'payment');
    };
    deletePayment = async (id) => {
        return await axios.delete(API_URL + 'admin/payment/' + id);
    };
    getPayment = async (id) => {
        return await axios.get(API_URL + 'payment/' + id);
    };

    updatePayment = async (payment) => {
        return await axios.put(API_URL + 'admin/payment', payment);
    };
}
