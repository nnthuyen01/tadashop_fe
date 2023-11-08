import { Checkbox, Col, Divider, Form, Image, Input, Row, Skeleton, Space } from 'antd';
import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import AccountService from '../../services/accountService';
import withRouter from '~/admin/helpers/withRouter';
import { connect } from 'react-redux';
import { getAccountById } from '../../redux/actions/accountAction';
import ContentHeader from '../common/ContentHeader';

class AccountDetailAdmin extends Component {
    form = React.createRef();

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;

        this.props.getAccountById(id);

        console.log('this mount');
    };

    render() {
        const { account, isLoading } = this.props;
        const { navigate } = this.props.router;
        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="Account detail"
                        className="site-page-header"
                    ></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="Account detail" className="site-page-header"></ContentHeader>
                <Form layout="vertical" className="form" size="middle" ref={this.form}>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={12}>
                            <Row gutter={10}>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Account ID"
                                        name="id"
                                        initialValue={account.id}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        style={{
                                            fontStyle: 'italic',
                                        }}
                                        label="Main Image"
                                        name="image"
                                        initialValue={account?.avatar}
                                    >
                                        <Space
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {account.avatar ? (
                                                <Image
                                                    height={90}
                                                    src={AccountService.getAvatarUserUrl(account.avatar)}
                                                ></Image>
                                            ) : (
                                                <Image height={90} src="../../../assets/images/avatartrong.png"></Image>
                                            )}
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="First Name"
                                        name="firstname"
                                        initialValue={account.firstname}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Last Name"
                                        name="lastname"
                                        initialValue={account.lastname}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Email"
                                        name="email"
                                        initialValue={account.email}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Phone"
                                        name="phone"
                                        initialValue={account.phone}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Role"
                                        name="role"
                                        initialValue={account.role}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Enable"
                                        name="enable"
                                        initialValue={account.enable}
                                        valuePropName="checked"
                                    >
                                        <Checkbox />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                style={{ fontStyle: 'italic' }}
                                label="Amount Paid"
                                name="amountPaid"
                                initialValue={account.amountPaid}
                            >
                                <Input addonAfter={'₫'} readOnly></Input>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic' }}
                                        label="Vouchers"
                                        name="vouchers"
                                        initialValue={account.vouchers?.voucher}
                                    >
                                        <Space direction="horizontal">
                                            {account.vouchers && Array.isArray(account.vouchers)
                                                ? account.vouchers.map((voucher, index) => (
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
                                                          <div
                                                              style={{
                                                                  padding: ' 0px 10px',
                                                                  borderRight: '2px solid  rgb(217, 217, 217)',
                                                                  fontWeight: '650',
                                                              }}
                                                          >
                                                              {voucher.voucher}
                                                          </div>
                                                          <div style={{ padding: ' 0px 10px' }}>{voucher.quantity}</div>
                                                      </div>
                                                  ))
                                                : null}
                                            {/* <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '0px 10px',
                                                    border: '2px solid rgb(217, 217, 217)',
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: ' 0px 10px',
                                                        borderRight: '2px solid  rgb(217, 217, 217)',
                                                        fontWeight: '650',
                                                    }}
                                                >
                                                    VOUCHER1
                                                </div>
                                                <div style={{ padding: ' 0px 10px' }}>3500000</div>
                                            </div> */}
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>{' '}
                        </Col>
                        <Col md={1}></Col>
                        <Col md={5}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.accountReducer.account,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getAccountById,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountDetailAdmin));
