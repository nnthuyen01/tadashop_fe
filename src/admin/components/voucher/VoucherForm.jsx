import { Divider, Form, Input, Modal, InputNumber, Select } from 'antd';
import React, { Component, createRef } from 'react';
import VoucherService from '../../services/voucherService';

class VoucherForm extends Component {
    form = createRef();
    constructor(props) {
        super(props);

        this.state = {
            voucher: { id: '', code: '', price: 0, status: 0 },
        };
    }

    render() {
        const { open, onCreate, onCancel } = this.props;
        const { voucher } = this.props;
        let title = 'Create a new voucher';
        let okText = 'Create';
        if (voucher.id) {
            title = 'Update the voucher';
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
                    key={'f' + voucher.id + voucher.code + voucher.price}
                >
                    <Form.Item label="Voucher ID" name="id" initialValue={voucher.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        initialValue={voucher.code}
                        rules={[{ required: true, min: 3 }]}
                        hasFeedback
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        initialValue={voucher.price}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            addonAfter={'₫'}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                        ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        initialValue={voucher.status}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Select placeholder="Select Voucher Status">
                            <Select.Option value={0}>In-acitve</Select.Option>
                            <Select.Option value={1}>Active</Select.Option>
                        </Select>
                    </Form.Item>

                    <Divider></Divider>
                </Form>
            </Modal>
        );
    }
}

export default VoucherForm;
