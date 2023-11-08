import React, { Component } from 'react';
import { Button, Image, Space, Table, Tooltip } from 'antd';
import { SearchOutlined, PoweroffOutlined, UnlockOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import AccountService from '../../services/accountService';
import { MdCheckCircle } from 'react-icons/md';
import withRouter from '~/admin/helpers/withRouter';

class AccountList extends Component {
    render() {
        const { navigate } = this.props.router;
        const { dataSource, onDisabledConfirm, onEnabledConfirm } = this.props;
        return (
            <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
                <Column
                    title="Avatar"
                    key="avatar"
                    dataIndex="avatar"
                    width={90}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            {record.avatar !== null ? (
                                <Image width="100%" src={AccountService.getAvatarUserUrl(record.avatar)}></Image>
                            ) : (
                                <Image width="100%" src="../assets/images/avatartrong.png"></Image>
                            )}
                        </Space>
                    )}
                ></Column>
                <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>
                <Column title="Name" key="firstname" dataIndex="firstname"></Column>
                <Column title="Username" key="username" dataIndex="username"></Column>
                <Column title="Role" key="role" dataIndex="role"></Column>

                <Column
                    title="Enable"
                    key="enable"
                    dataIndex="enable"
                    width={150}
                    align="center"
                    render={(_, record) => {
                        return record.enable === true ? <MdCheckCircle color="#52c41a" size={24} /> : null;
                    }}
                ></Column>

                <Column
                    title="Action"
                    key="action"
                    width={150}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            {record.enable === true ? (
                                <Button
                                    key={record.key}
                                    type="primary"
                                    danger
                                    size="small"
                                    onClick={() => onDisabledConfirm(record)}
                                >
                                    <PoweroffOutlined style={{ marginRight: 8 }} /> Disable
                                </Button>
                            ) : (
                                <Button
                                    style={{ backgroundColor: '#52c41a', color: 'white' }}
                                    key={record.key}
                                    type="default"
                                    // ghost
                                    size="small"
                                    onClick={() => onEnabledConfirm(record)}
                                >
                                    <UnlockOutlined style={{ marginRight: 8 }} /> Enable
                                </Button>
                            )}
                            <Tooltip placement="top" title="View Product Detail" color="blue">
                                <Button
                                    key={record.key}
                                    type="primary"
                                    size="small"
                                    onClick={() => navigate('/dashboard/accounts/view/' + record.id)}
                                >
                                    <SearchOutlined style={{ marginRight: 8 }} /> View
                                </Button>
                            </Tooltip>
                        </Space>
                    )}
                ></Column>
            </Table>
        );
    }
}

export default withRouter(AccountList);
