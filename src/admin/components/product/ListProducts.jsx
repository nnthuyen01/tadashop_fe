import React, { Component } from 'react';
import ProductList from './ProductList';
import { Button, Col, Form, Input, Row, Modal, Pagination } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ContentHeader from '../common/ContentHeader';
import withRouter from '../../helpers/withRouter';
import { connect } from 'react-redux';
import { getProducts, deleteProduct, getProductsPageable } from '../../redux/actions/productAction';
class ListProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: { id: '', name: '', price: '', discount: '', totalQuantity: '', isFeatured: '', status: '' },
        };
    }
    componentDidMount = () => {
        // this.props.getProducts();
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            size: pagination.size,
            sort: pagination.sort,
        };
        this.props.getProductsPageable(params);

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
        this.props.getProductsPageable(params);
        // console.log(params.query);
    };
    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
            sort: pagination.sort,
        };

        this.props.getProductsPageable(params);
    };

    handleNewProduct = () => {
        this.props.router.navigate('/dashboard/products/add');
    };

    deleteProduct = () => {
        this.props.deleteProduct(this.state.product.id);

        console.log('Delete Product');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, product: value });
        const message = 'Do you want to delete the image of the product ' + value.name + ' ?';
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteProduct,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    render() {
        const { products, pagination } = this.props;
        const { navigate } = this.props.router;

        return (
            <>
                <ContentHeader navigate={navigate} title="List Products" className="site-page-header"></ContentHeader>

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
                        <Button type="primary" onClick={this.handleNewProduct}>
                            New Product
                        </Button>
                    </Col>
                </Row>

                <ProductList onDeleteConfirm={this.onDeleteConfirm} products={products} />

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
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    products: state.productReducer.products,
    pagination: state.productReducer.pagination,
});

const mapDispatchToProps = {
    getProducts,
    deleteProduct,
    getProductsPageable,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListProducts));
