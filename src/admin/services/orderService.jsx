import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class OrderService {
    getOrders = async () => {
        return await axios.get(API_URL + 'admin/orders');
    };
    // getOrdersPageable = async (params) => {
    //     return await axios.get(API_URL + 'admin/orders/page', { params });
    // };
    getOrdersPageable = async (params) => {
        return await axios.get(API_URL + 'admin/ordersUsername/page', { params });
    };
    getOrder = async (id) => {
        return await axios.get(API_URL + 'orderDetail/' + id);
    };
    updateOrder = async (id, order) => {
        let status;

        // Tùy thuộc vào giá trị của order, đặt giá trị status
        if (order.state === 'Pending') {
            status = 0;
        } else if (order.state === 'Processing') {
            status = 1;
        } else if (order.state === 'Complete') {
            status = 2;
        } else if (order.state === 'Cancel') {
            status = 3;
        } else if (order.state === 'Delivery') {
            status = 4;
        } else if (order.state === 'Paid') {
            status = 5;
        } else if (order.state === 'UnPaid') {
            status = 6;
        } else if (order.state === 'Confirmed') {
            status = 7;
        } else {
            status = 0;
        }
        const state = {
            status: status,
        };
        return await axios.put(API_URL + 'admin/updateStatus/' + id, state);
    };
    getOrderByStatus = async (params) => {
        return await axios.get(API_URL + 'admin/order/by-status', { params });
    };
}
