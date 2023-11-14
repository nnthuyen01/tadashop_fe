import { Form, Input, Modal, Select } from 'antd';
import React, { Component, createRef } from 'react';

class OrderForm extends Component {
    form = createRef();
    constructor(props) {
        super(props);

        this.state = {
            order: { id: '', state: '' },
        };
    }

    render() {
        const { open, onUpdate, onCancel } = this.props;
        const { order } = this.props;
        let title = 'Update the order';
        let okText = 'Update State';

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
                            onUpdate(values);
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
                    key={'f' + order.state + order.id}
                >
                    <Form.Item label="Order ID" name="id" initialValue={order.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item label="State" name="state" initialValue={order.state} required>
                        <Select placeholder="Select State Order">
                            <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Processing">Processing</Select.Option>
                            <Select.Option value="Complete">Complete</Select.Option>
                            <Select.Option value="Cancel">Cancel</Select.Option>
                            <Select.Option value="Delivery">Delivery</Select.Option>
                            <Select.Option value="Paid">Paid</Select.Option>
                            <Select.Option value="UnPaid">UnPaid</Select.Option>
                            <Select.Option value="Confirmed">Confirmed</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default OrderForm;
