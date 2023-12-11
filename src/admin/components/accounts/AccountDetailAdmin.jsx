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
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
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
                                            fontWeight: '650',
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
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
                                        label="First Name"
                                        name="firstname"
                                        initialValue={account.firstname}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
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
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
                                        label="Email"
                                        name="email"
                                        initialValue={account.email}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
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
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
                                        label="Role"
                                        name="role"
                                        initialValue={account.role}
                                    >
                                        <Input readOnly></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
                                        label="Enable"
                                        name="enable"
                                        initialValue={account.enable}
                                        valuePropName="checked"
                                    >
                                        <Checkbox disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                style={{ fontStyle: 'italic', fontWeight: '650' }}
                                label="Amount Paid"
                                name="amountPaid"
                                initialValue={account.amountPaid}
                            >
                                <Input addonAfter={'₫'} readOnly></Input>
                            </Form.Item>
                            <Row>
                                <Col md={24}>
                                    <Form.Item
                                        style={{ fontStyle: 'italic', fontWeight: '650' }}
                                        label="Vouchers"
                                        name="vouchers"
                                        initialValue={account.vouchers?.voucher}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            {account.vouchers &&
                                            Array.isArray(account.vouchers) &&
                                            account.vouchers.length !== 0 ? (
                                                account.vouchers.map((voucher, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            flex: '0 0 calc(33.33% - 20px)',
                                                            margin: '0px 10px',
                                                            marginBottom: '10px',
                                                            border: '2px solid rgb(217, 217, 217)',
                                                            borderRadius: '5px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            backgroundColor:
                                                                voucher.status === 0 ? 'rgba(169, 169, 169, 0.5)' : '',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                padding: '10px',
                                                                borderBottom: '2px solid rgb(217, 217, 217)',
                                                                fontWeight: '650',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <div>{voucher.code}</div>
                                                            <div>{voucher.priceOffPercent}%</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div
                                                    style={{
                                                        color: '#555',
                                                        fontWeight: '500',
                                                        fontStyle: 'italic',
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    Không có voucher nào
                                                </div>
                                            )}
                                        </div>
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
