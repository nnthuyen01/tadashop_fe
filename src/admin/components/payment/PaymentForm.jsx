import { Divider, Form, Input, Modal } from 'antd';
import React, { Component, createRef } from 'react';

class PaymentForm extends Component {
    form = createRef();
    constructor(props) {
        super(props);

        this.state = {
            payment: { id: '', name: '' },
        };
    }

    render() {
        const { open, onCreate, onCancel } = this.props;
        const { payment } = this.props;
        let title = 'Create a new payment';
        let okText = 'Create';
        if (payment.id) {
            title = 'Update the payment';
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
                    key={'f' + payment.id + payment.name}
                >
                    <Form.Item label="Payment ID" name="id" initialValue={payment.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={payment.name}
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input></Input>
                    </Form.Item>

                    <Divider></Divider>
                </Form>
            </Modal>
        );
    }
}

export default PaymentForm;
