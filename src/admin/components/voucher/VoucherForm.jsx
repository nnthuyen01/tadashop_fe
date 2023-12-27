import { Divider, Form, Input, Modal, InputNumber, Select, Radio } from 'antd';
import React, { Component, createRef } from 'react';

class VoucherForm extends Component {
    form = createRef();
    constructor(props) {
        super(props);

        this.state = {
            voucher1: { id: '', userId: '', priceOffPercent: 0, status: 0 },
        };
    }
    handleIndividualRadioChange = (e) => {
        this.setState({ voucher1: { userId: '' } });
    };
    handleAllRadioChange = (e) => {
        this.setState({ voucher1: { userId: e.target.value === '1' ? 1 : '' } });
    };
    render() {
        const { open, onCreate, onCancel } = this.props;
        const { voucher } = this.props;
        const { voucher1 } = this.state;
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
                // onOk={() => {
                //     this.form.current
                //         .validateFields()
                //         .then((values) => {
                //             this.form.current.resetFields();
                //             console.log('Values:', values);
                //         })
                //         .catch((info) => {
                //             console.log('Validate Failed:', info);
                //         });
                // }}
            >
                <Form
                    ref={this.form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                    key={'f' + voucher.id + voucher.code + voucher.priceOffPercent}
                >
                    <Form.Item label="Voucher ID" name="id" initialValue={voucher.id}>
                        <Input readOnly disabled></Input>
                    </Form.Item>

                    {voucher.id ? (
                        <Form.Item
                            label="User ID"
                            name="userId"
                            initialValue={voucher.userId}
                            rules={[{ required: true }]}
                            hasFeedback
                        >
                            <Input disabled></Input>
                        </Form.Item>
                    ) : (
                        <>
                            <Form.Item label="Option" name="userId">
                                <Radio.Group>
                                    <Radio value="" onChange={(e) => this.handleIndividualRadioChange(e)}>
                                        Individual
                                    </Radio>
                                    <Radio value="1" onChange={(e) => this.handleAllRadioChange(e)}>
                                        All User
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="User ID"
                                name="userId"
                                initialValue={voucher1.userId}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Input disabled={voucher1.userId === 1} />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item
                        label="Price off percent"
                        name="priceOffPercent"
                        initialValue={voucher.priceOffPercent}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            addonAfter={'%'}
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
