import { Divider, Form, Input, Modal, Select, InputNumber, message } from 'antd';
import React, { Component, createRef } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import ProductService from '~/admin/services/productService';

class SizeForm extends Component {
    form = createRef();
    constructor(props) {
        super(props);

        this.state = {
            size: { id: '', quantity: '', size: '', productId: '', productName: '' },
            products: [],
        };
    }

    componentDidMount = () => {
        this.loadData();
    };
    loadData = async () => {
        try {
            const productService = new ProductService();
            const productListResponse = await productService.getProductList();

            this.setState({
                ...this.state,
                products: productListResponse.data,
            });
        } catch (error) {
            console.log(error);
            message.error('Error: ' + error);
        }
    };

    render() {
        const { open, onCreate, onCancel } = this.props;
        const { size } = this.props;
        const { products } = this.state;

        console.log(products);

        let title = 'Create a new size';
        let okText = 'Create';
        if (size.id) {
            title = 'Update the size';
            okText = 'Update';
        }

        return (
            <Modal
                open={open}
                title={title}
                okText={okText}
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    this.form.current
                        .validateFields()
                        .then((values) => {
                            this.form.current.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    ref={this.form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                    key={'f' + size.id + size.name}
                >
                    <Form.Item label="Size ID" name="id" initialValue={size.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item
                        label="Size"
                        name="size"
                        initialValue={size.size}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Select placeholder="Select Sizes">
                            <Select.Option value="S">S</Select.Option>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="L">L</Select.Option>
                            <Select.Option value="XL">XL</Select.Option>
                            <Select.Option value="2XL">2XL</Select.Option>
                            {/* <Select.Option value="3XL">3XL</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        initialValue={size.quantity}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                        ></InputNumber>
                    </Form.Item>

                    <Form.Item
                        label="Product"
                        name="productId"
                        initialValue={size.productId}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Select
                            placeholder="Select Club"
                            suffixIcon={<MdOutlineCategory />}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {products &&
                                products.map((item) => (
                                    <Select.Option value={item.id} key={'club' + item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Divider></Divider>
                </Form>
            </Modal>
        );
    }
}

export default SizeForm;
