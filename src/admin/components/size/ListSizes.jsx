import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import SizeList from './SizeList';
import withRouter from '../../helpers/withRouter';
import SizeForm from './SizeForm';
import { Button, Col, Modal, Row, Pagination, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { insertSize, getSizes, deleteSize, updateSize, getSizesPageable } from '../../redux/actions/sizeAction';

class ListSizes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            size: { id: '', quantity: '', size: '', productId: '', productName: '' },
        };
    }
    componentDidMount = () => {
        // this.props.getSizes();

        // console.log('this mount');
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            size: pagination.size,
        };
        this.props.getSizesPageable(params);

        console.log('this mount');
    };
    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
            sort: pagination.sort,
        };
        this.props.getSizesPageable(params);
        // console.log(params.query);
    };
    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateSize(values);
        } else {
            this.props.insertSize(values);
        }
        this.setState({ ...this.state, size: {}, open: false });
    };
    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
            sort: pagination.sort,
        };

        this.props.getSizesPageable(params);
    };

    deleteSize = () => {
        this.props.deleteSize(this.state.size.id);

        console.log('Delete Size');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, size: value });
        const message = 'Do you want to delete the size ' + value.name + ' ?';
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteSize,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    onEdit = (value) => {
        this.setState({ ...this.state, size: value, open: true });
    };

    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { sizes, pagination } = this.props;
        return (
            <>
                <ContentHeader navigate={navigate} title="List Sizes" className="site-page-header"></ContentHeader>

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
                                this.setState({ ...this.state, size: {}, open: true });
                            }}
                        >
                            New Size
                        </Button>
                    </Col>
                </Row>

                <SizeList dataSource={sizes} onDeleteConfirm={this.onDeleteConfirm} onEdit={this.onEdit} />

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

                <SizeForm
                    size={this.state.size}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, size: {}, open: false });
                    }}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    sizes: state.sizeReducer.sizes,
    pagination: state.sizeReducer.pagination,
});

const mapDispatchToProps = {
    insertSize,
    getSizes,
    deleteSize,
    updateSize,
    getSizesPageable,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListSizes));
