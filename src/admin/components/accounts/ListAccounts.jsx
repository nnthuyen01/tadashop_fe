import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import AccountList from './AccountList';
import withRouter from '../../helpers/withRouter';

import { Button, Col, Form, Input, Modal, Pagination, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
    getAccountsPageable,
    getAccounts,
    getAccountsByName,
    disabledAccountById,
} from '../../redux/actions/accountAction';

class ListAccounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            account: { id: '', firstname: '', username: '', role: '', enable: '' },
        };
    }
    componentDidMount = () => {
        // this.props.getAccounts();

        const { pagination } = this.props;
        const params = {
            size: pagination.size,
        };
        this.props.getAccountsPageable(params);

        console.log('this mount');
    };
    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        };
        if (params.query !== undefined) {
            this.props.getAccountsByName(params);
        } else this.props.getAccountsPageable(params);
        // console.log(params.query);
    };

    enableAccount = () => {
        this.props.disabledAccountById(this.state.account.id);

        console.log('Enabled Account');
    };
    onEnabledConfirm = (value) => {
        this.setState({ ...this.state, account: value });
        const message = 'Do you want to enable the account ' + value.username + ' ?';
        Modal.confirm({
            title: 'Confirm Enable',
            icon: <CheckCircleOutlined />,
            content: message,
            onOk: this.disabledAccount,
            okText: 'Enabled',
            cancelText: 'Cancel',
        });
    };

    disabledAccount = () => {
        this.props.disabledAccountById(this.state.account.id);

        console.log('Delete Account');
    };

    onDisabledConfirm = (value) => {
        this.setState({ ...this.state, account: value });
        const message = 'Do you want to disable the account ' + value.username + ' ?';
        Modal.confirm({
            title: 'Confirm Disable',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.disabledAccount,
            okText: 'Disabled',
            cancelText: 'Cancel',
        });
    };

    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
        };

        this.props.getAccountsByName(params);
    };

    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { accounts, pagination, isLoading } = this.props;
        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="List Accounts"
                        className="site-page-header"
                    ></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Accounts" className="site-page-header"></ContentHeader>

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

                <AccountList
                    dataSource={accounts}
                    onDisabledConfirm={this.onDisabledConfirm}
                    onEnabledConfirm={this.onEnabledConfirm}
                />

                <Row style={{ marginTop: 8 }}>
                    <Col md={24} style={{ textAlign: 'right' }}>
                        <Pagination
                            defaultCurrent={pagination.page + 1}
                            defaultPageSize={pagination.size}
                            total={pagination.totalElements}
                            // onShowSizeChange={this.onShowSizeChange}
                            onChange={this.onChange}
                            showSizeChanger="true"
                        ></Pagination>
                    </Col>
                </Row>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    accounts: state.accountReducer.accounts,
    pagination: state.accountReducer.pagination,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getAccounts,
    getAccountsPageable,
    getAccountsByName,
    disabledAccountById,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListAccounts));
