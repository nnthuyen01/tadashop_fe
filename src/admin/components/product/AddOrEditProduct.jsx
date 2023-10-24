import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { Row, Col, Steps, Divider, Space, Button, message, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';

import ClubService from '~/admin/services/clubServices';
import BrandService from './../../services/brandService';
import { connect } from 'react-redux';
import ProductService from '../../services/productService';
import { insertProduct, updateProduct, getProductById } from '../../redux/actions/productAction';
// const { Step } = Steps;
class AddOrEditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            product: {},
            productImages: [],
            updatedProductImages: [],
            clubs: [],
            brands: [],
        };
    }
    goNext = (values) => {
        this.setState({ ...this.state, product: values, step: 1 });
    };

    goPrevious = () => {
        this.setState({ ...this.state, step: 0 });
    };

    onUpdateFileList = (fileList) => {
        console.log('Update fileList', fileList);

        this.setState({ ...this.state, updatedProductImages: fileList });
    };

    //Cập nhật thông tin product image và kiểm tra
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.product && nextProps.product.images && nextProps.product.images.length > 0) {
            let productImages = [];
            if (nextProps.product.images) {
                productImages = nextProps.product.images.map((item) => ({
                    ...item,
                    uid: item.id,
                    url: ProductService.getProductImageUrl(item.fileName),
                    status: 'done',
                }));

                return { ...prevState, productImages: productImages };
            }
        }
        return null;
    }

    saveProduct = () => {
        const { product, productImages, updatedProductImages } = this.state;

        console.log('save Product');
        const newProduct = {
            ...product,
            images:
                updatedProductImages && updatedProductImages.length > 0
                    ? updatedProductImages.map((item) => {
                          if (item.id) {
                              return { ...item };
                          }
                          return item.response;
                      })
                    : productImages.map((item) => {
                          if (item.id) {
                              return { ...item };
                          }
                          return item.response;
                      }),
        };
        console.log(newProduct);

        if (newProduct.images && newProduct.images.length > 0) {
            const uploading = newProduct.images.filter((item) => item.status !== 'done');

            if (uploading && uploading.length > 0) {
                notification.error({
                    message: 'Error',
                    description: 'Product Images are uploading. Please wait... ',
                    duration: 10,
                });
                return;
            }
        } else if (newProduct.images.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Product Images are not chosen. Please choose the product images before saving.',
                duration: 10,
            });
            return;
        }

        const { navigate } = this.props.router;
        this.setState({ ...this.state, product: {}, productImages: [] });
        // this.props.insertProduct(newProduct, navigate);
        const { id } = this.state.product;

        if (!id) {
            this.props.insertProduct(newProduct, navigate);
        } else {
            this.props.updateProduct(id, newProduct, navigate);
        }
    };
    async componentDidMount() {
        const { id } = this.props.router.params;

        if (id) {
            await this.props.getProductById(id);
            const { product } = this.props;
            // console.log(product);
            const newProduct = {
                id: product.id,
                name: product.name,
                season: product.season,
                originalPrice: product.originalPrice,
                discount: product.discount,
                priceAfterDiscount: product.priceAfterDiscount,
                isFeatured: product.isFeatured,
                status: product.status,
                club: product.club,
                brand: product.brand,
                gender: product.gender,
                kitType: product.kitType,
                image: product.image,
                brief: product.brief,
                description: product.description,
            };
            this.setState({ ...this.state, product: newProduct });
        } else {
            // const { product } = this.props;
            const newProduct = {
                id: '',
                name: '',
                season: '',
                originalPrice: 0,
                discount: 0,
                priceAfterDiscount: 0,
                isFeatured: false,
                status: 'InStock',
                club: '',
                brand: '',
                gender: 'Men',
                kitType: 'Home',
                image: '',
                brief: '',
                description: '',
            };
            this.setState({ ...this.state, product: newProduct });
        }

        this.loadData();
    }

    loadData = async () => {
        try {
            const clubService = new ClubService();
            const clubListResponse = await clubService.getClubs();

            const brandService = new BrandService();
            const brandListResponse = await brandService.getBrands();

            this.setState({
                ...this.state,
                clubs: clubListResponse.data,
                brands: brandListResponse.data,
            });
        } catch (error) {
            console.log(error);
            message.error('Error: ' + error);
        }
    };

    render() {
        const { navigate } = this.props.router;
        const { step, clubs, brands, productImages } = this.state;
        // const { product } = this.props;
        const { product } = this.state;
        if (product.name === undefined) {
            // If product name is not available, render a loading state or return null
            return <div>Loading...</div>;
        }
        const title = 'Add Products';

        return (
            <>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>

                <Row>
                    <Col md={24}>
                        <Steps
                            current={step}
                            items={[
                                {
                                    title: 'Basic Information',
                                    description: 'Fill basic Information',
                                },
                                {
                                    title: 'Images',
                                    description: 'Choose the list of Images',
                                },
                            ]}
                        ></Steps>
                    </Col>
                </Row>

                <Row>
                    <Col md={24}>
                        {step === 0 && (
                            <>
                                <Divider></Divider>
                                {/* <ProductForm product={{}} goNext={this.goNext} clubs={clubs} brands={brands} /> */}
                                <ProductForm product={product} goNext={this.goNext} clubs={clubs} brands={brands} />
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <Divider></Divider>
                                <Row>
                                    <Col md={24}>
                                        <UploadImage
                                            onUpdateFileList={this.onUpdateFileList}
                                            fileList={product && product.id ? productImages : []}
                                        />
                                        <Divider></Divider>
                                        <dir>
                                            <Space>
                                                <Button type="primary" onClick={this.goPrevious}>
                                                    Previous
                                                </Button>
                                                <Button type="primary" onClick={this.saveProduct}>
                                                    <SaveOutlined /> {product && product.id ? 'Update' : 'save '}
                                                </Button>
                                            </Space>
                                        </dir>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    product: state.productReducer.product,
});

const mapDispatchToProps = {
    insertProduct,
    getProductById,

    updateProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddOrEditProduct));
