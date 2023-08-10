import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import PaymentList from './PaymentList';
import withRouter from '../../helpers/withRouter';
import PaymentForm from './PaymentForm';
import { Button, Col, Modal, Row } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { insertPayment, getPayments, deletePayment, updatePayment } from '../../redux/actions/paymentAction';

class ListPayments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            payment: { id: '', name: '' },
        };
    }
    componentDidMount = () => {
        this.props.getPayments();

        console.log('this mount');
    };

    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updatePayment(values);
        } else {
            this.props.insertPayment(values);
        }
        this.setState({ ...this.state, payment: {}, open: false });
    };

    deletePayment = () => {
        this.props.deletePayment(this.state.payment.id);

        console.log('Delete Payment');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, payment: value });
        const message = 'Do you want to delete the payment ' + value.name + ' ?';
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deletePayment,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    onEdit = (value) => {
        this.setState({ ...this.state, payment: value, open: true });
    };

    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { payments } = this.props;
        return (
            <>
                <ContentHeader navigate={navigate} title="List Payments" className="site-page-header"></ContentHeader>

                <Row style={{ marginBottom: 8 }}>
                    {/* <Col md={18}>
                        <Form layout="inline" name="search" onFinish={this.handleSearch}>
                            <Form.Item name="query" initialValue={pagination.query}>
                                <Input></Input>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Form>
                    </Col> */}
                    <Col md={6}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, payment: {}, open: true });
                            }}
                        >
                            New Payment
                        </Button>
                    </Col>
                </Row>

                <PaymentList dataSource={payments} onDeleteConfirm={this.onDeleteConfirm} onEdit={this.onEdit} />

                {/* <Row style={{ marginTop: 8 }}>
                    <Col md={24} style={{ textAlign: 'right' }}>
                        <Pagination
                            defaultCurrent={pagination.page}
                            defaultPageSize={pagination.size}
                            total={pagination.totalElements}
                            // onShowSizeChange={this.onShowSizeChange}
                            onChange={this.onChange}
                            showSizeChanger="true"
                        ></Pagination>
                    </Col>
                </Row> */}

                <PaymentForm
                    payment={this.state.payment}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, payment: {}, open: false });
                    }}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    payments: state.paymentReducer.payments,
    pagination: state.paymentReducer.pagination,
});

const mapDispatchToProps = {
    insertPayment,
    getPayments,
    deletePayment,
    updatePayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPayments));
