import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import OrderList from './OrderList';
import withRouter from '../../helpers/withRouter';
import { Button, Col, Form, Input, Pagination, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';

import { getOrdersPageable, getOrders, updateOrder } from '../../redux/actions/orderAction';
import OrderForm from './OrderForm';

class ListOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            order: { id: '', state: '' },
        };
    }
    componentDidMount = () => {
        const { pagination } = this.props;
        const params = {
            size: pagination.size,
        };

        this.props.getOrdersPageable(params);

        console.log('this mount');
    };

    onEdit = (value) => {
        this.setState({ ...this.state, order: value, open: true });
    };
    onUpdate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateOrder(values);
        }
        this.setState({ ...this.state, order: {}, open: false });
    };

    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        };

        this.props.getOrdersPageable(params);
    };
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { orders, pagination, isLoading } = this.props;

        if (isLoading) {
            return (
                <>
                    <ContentHeader navigate={navigate} title="List Orders" className="site-page-header"></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Orders" className="site-page-header"></ContentHeader>

                <Row style={{ marginBottom: 8 }}>
                    <Col md={18}>
                        <Form layout="inline" name="search" onFinish={this.handleSearch}>
                            <Form.Item name="query" initialValue={pagination.query}>
                                <Input></Input>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>

                {/* <OrderList dataSource={orders} onDeleteConfirm={this.onDeleteConfirm} onEdit={this.onEdit} /> */}
                <OrderList dataSource={orders} onEdit={this.onEdit} />

                <Row style={{ marginTop: 8 }}>
                    <Col md={24} style={{ textAlign: 'right' }}>
                        <Pagination
                            defaultCurrent={pagination.page + 1}
                            defaultPageSize={pagination.size}
                            total={pagination.totalElements}
                            onChange={this.onChange}
                            showSizeChanger="true"
                        ></Pagination>
                    </Col>
                </Row>

                <OrderForm
                    order={this.state.order}
                    open={open}
                    onUpdate={this.onUpdate}
                    onCancel={() => {
                        this.setState({ ...this.state, order: {}, open: false });
                    }}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    orders: state.orderReducer.orders,
    pagination: state.orderReducer.pagination,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getOrdersPageable,
    getOrders,
    updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListOrders));
