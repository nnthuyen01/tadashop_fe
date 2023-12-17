import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import VoucherList from './VoucherList';
import withRouter from '../../helpers/withRouter';
import VoucherForm from './VoucherForm';
import { Button, Col, Form, Input, Modal, Pagination, Row } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
    insertVoucher,
    getVouchers,
    deleteVoucher,
    updateVoucher,
    getVouchersByCode,
    getVouchersPageable,
} from '../../redux/actions/voucherAction';

class ListVouchers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            voucher: { id: '', userId: '', priceOffPercent: 0, status: 0 },
        };
    }
    componentDidMount = () => {
        // this.props.getVouchers();

        // console.log('this mount');
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            size: pagination.size,
        };
        this.props.getVouchersPageable(params);

        console.log('this mount');
    };

    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateVoucher(values);
        } else {
            this.props.insertVoucher(values);
        }
        this.setState({ ...this.state, voucher: {}, open: false });
    };

    deleteVoucher = () => {
        this.props.deleteVoucher(this.state.voucher.id);

        console.log('Delete Voucher');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, voucher: value });
        const message = 'Do you want to delete the voucher ' + value.code + ' ?';
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteVoucher,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    onEdit = (value) => {
        this.setState({ ...this.state, voucher: value, open: true });
    };

    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
            sort: pagination.sort,
        };

        this.props.getVouchersPageable(params);
    };

    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
            sort: pagination.sort,
        };
        this.props.getVouchersPageable(params);
    };
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { vouchers, pagination } = this.props;
        return (
            <>
                <ContentHeader navigate={navigate} title="List Vouchers" className="site-page-header"></ContentHeader>

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
                    <Col md={6}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, voucher: {}, open: true });
                            }}
                        >
                            New Voucher
                        </Button>
                    </Col>
                </Row>

                <VoucherList dataSource={vouchers} onDeleteConfirm={this.onDeleteConfirm} onEdit={this.onEdit} />

                <Row style={{ marginTop: 8 }}>
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
                </Row>

                <VoucherForm
                    voucher={this.state.voucher}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, voucher: {}, open: false });
                    }}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    vouchers: state.voucherReducer.vouchers,
    pagination: state.voucherReducer.pagination,
});

const mapDispatchToProps = {
    insertVoucher,
    getVouchers,
    deleteVoucher,
    updateVoucher,
    getVouchersByCode,
    getVouchersPageable,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListVouchers));
