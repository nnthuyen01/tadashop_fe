import { Skeleton } from 'antd';
import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import withRouter from '~/admin/helpers/withRouter';
import { connect } from 'react-redux';
import { getOrderById, updateOrder } from '../../redux/actions/orderAction';
import ContentHeader from '../common/ContentHeader';
import { API_URL } from '~/config/constant';
import OrderForm from './OrderForm';
class OrderDetailAdmin extends Component {
    form = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            // order: { id: '', state: '' },
        };
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;

        this.props.getOrderById(id);

        console.log('this mount');
    };

    formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    onEdit = () => {
        this.setState({ open: true });
    };
    onUpdate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateOrder(values);
        }
        this.setState({ open: false });
    };
    render() {
        const { order, isLoading } = this.props;
        const { open } = this.state;
        const { navigate } = this.props.router;
        console.log(order);

        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="Order detail"
                        className="site-page-header"
                    ></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="Order detail" className="site-page-header"></ContentHeader>

                <div>
                    <section className="h-100 gradient-custom">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-10 col-xl-8">
                                    <div className="card1" style={{ borderRadius: '10px' }}>
                                        <div className="card-header px-4 py-5">
                                            <h5 className="mtext-102" style={{ color: '#fff', textAlign: 'center' }}>
                                                Order Detail
                                            </h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="mtext-105 mb-0" style={{ color: '#001529' }}>
                                                    {/* {order.order?.state === 0
                                                        ? 'Unconfirm'
                                                        : order.status === 1
                                                        ? 'Unpaid'
                                                        : 'Paid'}  */}
                                                    {order.order?.state}
                                                </p>
                                                <button className="btn btn-success btn-sm" onClick={this.onEdit}>
                                                    Update order status
                                                </button>
                                            </div>
                                            <div className="d-flex justify-content-between pt-2 mb-4">
                                                <p className="mtext-102 mb-0">
                                                    Receiver:{' '}
                                                    <span style={{ color: '#6c757d' }}>
                                                        {order.order?.orderdetail?.receiverName}
                                                    </span>
                                                </p>
                                                <p className="mtext-102 mb-0">
                                                    Phone:{' '}
                                                    <span style={{ color: '#6c757d' }}>
                                                        {order.order?.orderdetail?.receiverPhone}
                                                    </span>
                                                </p>
                                                <p className="mtext-102 mb-0">
                                                    Account:{' '}
                                                    <span style={{ color: '#6c757d' }}>
                                                        {order.order?.orderUser?.username}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-between pt-2 mb-4">
                                                <p className="mtext-102 mb-0">
                                                    Address:{' '}
                                                    <span style={{ color: '#6c757d' }}>
                                                        {order.order?.orderdetail?.deliveryAddress}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="card1 shadow-0 border mb-4">
                                                {order?.items?.map((item, index) => (
                                                    <div key={index} className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <img
                                                                    src={
                                                                        API_URL +
                                                                        'products/images/' +
                                                                        item.product?.image?.fileName
                                                                    }
                                                                    loading="lazy"
                                                                    alt={item.itemName}
                                                                    className="img-fluid"
                                                                ></img>
                                                            </div>
                                                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                <p className="stext-115 mb-0">{item.itemName}</p>
                                                            </div>
                                                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="stext-115 mb-0  ">
                                                                    Size: {item.productSize?.size}
                                                                </p>
                                                            </div>

                                                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="stext-115 mb-0  ">
                                                                    Quantity: {item.quantity}
                                                                </p>
                                                            </div>
                                                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="stext-115 mb-0  ">
                                                                    {this.formatNumberWithCommas(item.totalPrice)}đ
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <hr
                                                            className="mb-4"
                                                            style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="mtext-102 mb-0">Invoice information</p>
                                                <p className="stext-115 mb-0">
                                                    <span className="mtext-102 me-4">
                                                        {order.order?.orderdetail?.totalPrice !== undefined && (
                                                            <>
                                                                Total amount:{' '}
                                                                {this.formatNumberWithCommas(
                                                                    order.order.orderdetail.totalPrice,
                                                                )}
                                                                đ
                                                            </>
                                                        )}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="stext-115 mb-0">ID: {order.order?.id}</p>
                                                <p className="stext-115 mb-0">
                                                    <span className="mtext-102 me-4">
                                                        {order.order?.orderdetail?.totalPrice !== undefined && (
                                                            <>
                                                                Discount:{' '}
                                                                {this.formatNumberWithCommas(
                                                                    order.order.orderdetail.priceOff,
                                                                )}
                                                                đ
                                                            </>
                                                        )}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <p className="stext-115 mb-0">Date: {order.order?.createTime} </p>
                                            </div>
                                        </div>
                                        <div
                                            className="card-footer border-0 px-4 py-5"
                                            style={{
                                                backgroundColor: '#dc0021',
                                                borderBottomLeftRadius: '10px',
                                                borderBottomRightRadius: '10px',
                                            }}
                                        >
                                            <h5 className="d-flex align-items-center justify-content-end text-white  mb-0">
                                                Total payment:{' '}
                                                <span className="text-uppercase">
                                                    {order.order?.orderdetail?.totalPrice !== undefined && (
                                                        <>
                                                            {this.formatNumberWithCommas(
                                                                order.order.orderdetail.totalPrice,
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                                đ<span className="h2 mb-0 ms-2"></span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {this.props.order?.order !== undefined && (
                    <OrderForm
                        order={this.props.order?.order}
                        open={open}
                        onUpdate={this.onUpdate}
                        onCancel={() => {
                            this.setState({ ...this.state, order: {}, open: false });
                        }}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    order: state.orderReducer.order,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getOrderById,
    updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderDetailAdmin));
