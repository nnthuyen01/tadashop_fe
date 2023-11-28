import {
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Upload,
    message,
} from 'antd';
import React, { Component } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BrandService from '../../services/brandService';
import ProductService from '../../services/productService';

class ProductForm extends Component {
    form = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            brief: '',
            hasBriefError: false,
            descriptionCkData: '',
        };
    }

    handlePriceChange = (price) => {
        const { discount } = this.form.current.getFieldsValue(['discount']);

        const priceAfterDiscount = Math.ceil((price * (100 - discount)) / 100 / 1000) * 1000; // Làm tròn lên đến hàng ngàn
        this.form.current.setFieldsValue({ priceAfterDiscount });
    };

    handleDiscountChange = (discount) => {
        const { originalPrice } = this.form.current.getFieldsValue(['originalPrice']);

        const priceAfterDiscount = Math.ceil((originalPrice * (100 - discount)) / 100 / 1000) * 1000; // Làm tròn lên đến hàng ngàn
        this.form.current.setFieldsValue({ priceAfterDiscount });
    };

    handleBriefChange = (value) => {
        this.setState({ brief: value });

        // Kiểm tra và cập nhật state hasBriefError
        if (value.length > 500) {
            this.setState({ hasBriefError: true });
        } else {
            this.setState({ hasBriefError: false });
        }
    };

    componentDidMount = () => {
        this.setState({ ...this.state, descriptionCkData: this.props.product.description });
    };

    // phuong thuc tu react 18
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.product.description && !prevState.descriptionCkData) {
            return {
                ...prevState,
                descriptionCkData: nextProps.product.description,
            };
        }

        return null;
    }

    goNext = () => {
        this.form.current
            .validateFields()
            .then((values) => {
                console.log(this.state.hasBriefError);
                if (this.state.hasBriefError) {
                    message.error('Brief cannot exceed 500 characters.');
                } else if (this.state.descriptionCkData.length > 2000) {
                    message.error('Description cannot exceed 2000 characters.');
                } else {
                    // Tiến hành submit nếu không có lỗi brief
                    console.log(values);
                    const newValues = {
                        ...values,
                        description: this.state.descriptionCkData,
                        image: values.image[0].fileName ? values.image[0] : values.image[0].response,
                    };
                    console.log(newValues);
                    this.props.goNext(newValues);
                }
            })
            .catch((info) => {
                console.log(info);
                message.error('Data validation Error. Please check your input fields');
            });
    };
    handleImageRemoved = (info) => {
        console.log('removed image');
        const { id } = this.props.product;
        if (id) {
            console.log(info);
        }
        if (info.fileName && !id) {
            ProductService.deleteProductImage(info.fileName);
        } else if (info.response && info.response.fileName & !id) {
            ProductService.deleteProductImage(info.response.fileName);
        }
    };
    //Chuan hoa file de xu ly upload file toi server
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length > 1) {
            return [e.fileList[1]];
        }
        return e && e.fileList;
    };
    render() {
        const { product, clubs, brands } = this.props;
        const { descriptionCkData } = this.state;

        return (
            <>
                <Form layout="vertical" className="form" size="middle" ref={this.form} key={product.id}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Product ID" name="id" initialValue={product.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" initialValue={product.name} required hasFeedback>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Season" name="season" initialValue={product.season} required hasFeedback>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Original Price"
                                name="originalPrice"
                                initialValue={product.originalPrice}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    addonAfter={'₫'}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                    onChange={this.handlePriceChange}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="discount"
                                initialValue={product.discount}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    addonAfter={'%'}
                                    formatter={(value) => `${value}`}
                                    parser={(value) => value.replace('%', '')}
                                    style={{ width: '100%' }}
                                    onChange={this.handleDiscountChange}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label="Price After Discount"
                                name="priceAfterDiscount"
                                initialValue={product.priceAfterDiscount}
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    addonAfter={'₫'}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                    readOnly
                                ></InputNumber>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    {' '}
                                    <Form.Item
                                        label="Featured"
                                        name="isFeatured"
                                        initialValue={product.isFeatured}
                                        hasFeedback
                                        valuePropName="checked"
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                label="Status"
                                name="status"
                                initialValue={product.status}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select Product Status">
                                    <Select.Option value="InStock">In Stock</Select.Option>
                                    <Select.Option value="OutOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value="Discontinue">Discontinue</Select.Option>
                                    <Select.Option value="OnBackOrder">On Back Order</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Club"
                                name="clubId"
                                initialValue={product.club.id}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select
                                    showSearch
                                    placeholder="Select Club"
                                    suffixIcon={<MdOutlineCategory />}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {clubs &&
                                        clubs.map((item) => (
                                            <Select.Option value={item.id} key={'club' + item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            {/* <Form.Item
                                label="Club"
                                name="clubId"
                                initialValue={product.club.id}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select Club" suffixIcon={<MdOutlineCategory />}>
                                    {clubs &&
                                        clubs.map((item) => (
                                            <Select.Option value={item.id} key={'club' + item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                label="Brand"
                                name="brandId"
                                initialValue={product.brand.id}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select brand" suffixIcon={<MdOutlinePrecisionManufacturing />}>
                                    {brands &&
                                        brands.map((item) => (
                                            <Select.Option value={item.id} key={'brand' + item.id}>
                                                <Space>
                                                    <Image
                                                        src={BrandService.getBrandLogoUrl(item.logo)}
                                                        height={32}
                                                    ></Image>

                                                    {item.name}
                                                </Space>
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Gender"
                                name="gender"
                                initialValue={product.gender}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select Gender">
                                    <Select.Option value="Men">Men</Select.Option>
                                    <Select.Option value="Women">Women</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Kit Type"
                                name="kitType"
                                initialValue={product.kitType}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select Kit Type">
                                    <Select.Option value="Home">Home</Select.Option>
                                    <Select.Option value="Away">Away</Select.Option>
                                    <Select.Option value="Third">Third</Select.Option>
                                    <Select.Option value="Goalkeeper">Goalkeeper</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Main Image"
                                name="image"
                                rules={[{ required: true }]}
                                hasFeedback
                                initialValue={
                                    product.image
                                        ? [
                                              {
                                                  ...product.image,
                                                  url: ProductService.getProductImageUrl(product.image.fileName),
                                              },
                                          ]
                                        : []
                                }
                                valuePropName="fileList"
                                getValueFromEvent={this.normFile}
                            >
                                <Upload
                                    listType="picture"
                                    accept=".jpg,.png,.gif"
                                    maxCount={1}
                                    onRemove={this.handleImageRemoved}
                                    action={ProductService.getProductImageUploadUrl()}
                                >
                                    <Button icon={<UploadOutlined />}></Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            {' '}
                            <Form.Item
                                label="Brief"
                                name="brief"
                                initialValue={product.brief}
                                rules={[{ required: true }]}
                                hasFeedback
                                validateStatus={this.state.hasBriefError ? 'error' : ''}
                                help={this.state.hasBriefError ? 'Maximum 500 characters allowed.' : ''}
                            >
                                <ReactQuill theme="snow" value={this.state.brief} onChange={this.handleBriefChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            {' '}
                            <Form.Item
                                label="Description"
                                name="description"
                                initialValue={descriptionCkData}
                                rules={[{ required: true }]}
                                hasFeedback
                                validateStatus={this.state.descriptionCkData.length > 2000 ? 'error' : ''}
                                help={
                                    this.state.descriptionCkData.length > 2000 ? 'Maximum 2000 characters allowed.' : ''
                                }
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={descriptionCkData}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({ ...this.state, descriptionCkData: data });
                                    }}
                                ></CKEditor>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Divider></Divider>
                            <Button type="primary" onClick={this.goNext} style={{ float: 'right' }}>
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

export default ProductForm;
