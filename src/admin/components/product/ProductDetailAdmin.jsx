import { Button, Checkbox, Col, Divider, Form, Image, Input, Row, Skeleton, Space } from 'antd';
import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import BrandService from '../../services/brandService';
import ProductService from '../../services/productService';
import withRouter from '~/admin/helpers/withRouter';
import { connect } from 'react-redux';
import { getProductById } from '../../redux/actions/productAction';
import ContentHeader from '../common/ContentHeader';
import { convert } from 'html-to-text';

class ProductDetailAdmin extends Component {
    form = React.createRef();

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;

        this.props.getProductById(id);

        console.log('this mount');
    };
    // preventEditing = (editor) => {
    //     editor.editing.view.document.on('keydown', (event, data) => {
    //         if (!editor.isReadOnly) {
    //             data.preventDefault();
    //         }
    //     });
    // };
    render() {
        const { product, isLoading } = this.props;
        const { navigate } = this.props.router;
        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="Product detail"
                        className="site-page-header"
                    ></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="Product detail" className="site-page-header"></ContentHeader>
                <Form layout="vertical" className="form" size="middle" ref={this.form}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Product ID" name="id" initialValue={product.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" initialValue={product.name}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Total quantity" name="totalQuantity" initialValue={product.totalQuantity}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Price" name="price" initialValue={product.price}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item label="Sizes" name="sizes" initialValue={product.sizes?.size}>
                                        <Space direction="horizontal">
                                            {product.sizes && Array.isArray(product.sizes)
                                                ? product.sizes.map((size, index) => (
                                                      <div
                                                          key={index}
                                                          style={{
                                                              display: 'flex',
                                                              alignItems: 'center',
                                                              margin: '0px 10px',
                                                              border: '2px solid rgb(217, 217, 217)',
                                                              borderRadius: '5px',
                                                          }}
                                                      >
                                                          {/* <Input readOnly value={size.size}></Input>
                                                          <Input readOnly value={size.quantity}></Input> */}
                                                          <div
                                                              style={{
                                                                  padding: ' 0px 10px',
                                                                  borderRight: '2px solid  rgb(217, 217, 217)',
                                                                  fontWeight: '650',
                                                              }}
                                                          >
                                                              {size.size}
                                                          </div>
                                                          <div style={{ padding: ' 0px 10px' }}>{size.quantity}</div>
                                                      </div>
                                                  ))
                                                : null}
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>{' '}
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Row>
                                <Col md={12}>
                                    {' '}
                                    <Form.Item label="Discount" name="discount" initialValue={product.discount}>
                                        <Input readOnly></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Featured"
                                        name="isFeatured"
                                        initialValue={product.isFeatured}
                                        valuePropName="checked"
                                    >
                                        <Checkbox />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Status" name="status" initialValue={product.status}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Club" name="clubId" initialValue={product.club?.name}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item label="Brand" name="brand" initialValue={product.brand?.name}>
                                        <Row>
                                            <Col md={6}>
                                                {/* <Image
                                                    src="https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_96x96.png"
                                                    height={32}
                                                ></Image> */}
                                                {product.brand ? (
                                                    <Image
                                                        src={BrandService.getBrandLogoUrl(product.brand?.logo)}
                                                        height={32}
                                                    ></Image>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                            <Col md={18}>
                                                <Input value={product.brand?.name} readOnly></Input>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={13}>
                            <Form.Item label="Main Image" name="image" initialValue={product.image?.fileName}>
                                <Space>
                                    {product.image ? (
                                        <Image
                                            src={ProductService.getProductImageUrl(product.image.fileName)}
                                            height={90}
                                        ></Image>
                                    ) : (
                                        ''
                                    )}
                                    {/* <Image
                                        src="https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_96x96.png"
                                        height={90}
                                    ></Image> */}
                                </Space>
                            </Form.Item>
                        </Col>

                        <Col md={11}>
                            <Form.Item label="Related Image" name="images" initialValue={product.images?.fileName}>
                                <Space>
                                    {product.images && Array.isArray(product.images)
                                        ? product.images.map((image, index) => (
                                              /* <Image src={BrandService.getBrandLogoUrl(product.brand)} height={90}></Image> */
                                              <Image
                                                  key={index}
                                                  src={ProductService.getProductImageUrl(image.fileName)}
                                                  height={90}
                                              ></Image>
                                          ))
                                        : null}
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            {' '}
                            <Form.Item label="Brief" name="brief" initialValue={convert(product.brief)}>
                                {/* <ReactQuill theme="snow" readOnly></ReactQuill> */}
                                <Input readOnly></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            {' '}
                            <Form.Item
                                label="Description"
                                name="description"
                                initialValue={convert(product.description)}
                            >
                                <Input readOnly></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            <Divider></Divider>
                            <Button type="primary" onClick={this.goNext} style={{ float: 'right' }}>
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    product: state.productReducer.product,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getProductById,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailAdmin));
