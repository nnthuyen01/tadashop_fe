import React, { Component } from 'react';
import ContentHeader from '../common/ContentHeader';
import BrandList from './BrandList';
import withRouter from '../../helpers/withRouter';
import BrandForm from './BrandForm';
import { Button, Col, Form, Input, Modal, Pagination, Row } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { insertBrand, getBrands, deleteBrand, updateBrand, getBrandsByName } from '../../redux/actions/brandAction';

class ListBrands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            brand: { id: '', name: '', logo: '' },
        };
    }
    componentDidMount = () => {
        this.props.getBrands();

        console.log('this mount');
    };

    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateBrand(values);
        } else {
            this.props.insertBrand(values);
        }
        this.setState({ ...this.state, brand: {}, open: false });
    };

    deleteBrand = () => {
        this.props.deleteBrand(this.state.brand.id);

        console.log('Delete Brand');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, brand: value });
        const message = 'Do you want to delete the brand ' + value.name + ' ?';
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteBrand,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    onEdit = (value) => {
        this.setState({ ...this.state, brand: value, open: true });
    };

    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
        };

        this.props.getBrandsByName(params);
    };

    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        };

        this.props.getBrandsByName(params);
    };
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;

        const { brands, pagination } = this.props;
        return (
            <>
                <ContentHeader navigate={navigate} title="List Brands" className="site-page-header"></ContentHeader>

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
                                this.setState({ ...this.state, brand: {}, open: true });
                            }}
                        >
                            New Brand
                        </Button>
                    </Col>
                </Row>

                <BrandList dataSource={brands} onDeleteConfirm={this.onDeleteConfirm} onEdit={this.onEdit} />

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

                <BrandForm
                    brand={this.state.brand}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, brand: {}, open: false });
                    }}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    brands: state.brandReducer.brands,
    pagination: state.brandReducer.pagination,
});

const mapDispatchToProps = {
    insertBrand,
    getBrands,
    deleteBrand,
    updateBrand,
    getBrandsByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListBrands));
