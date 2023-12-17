import React, { Component } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import { format } from 'date-fns';

class VoucherList extends Component {
    render() {
        const { dataSource, onEdit, onDeleteConfirm } = this.props;
        return (
            <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
                <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>
                <Column title="Code" key="code" dataIndex="code"></Column>

                <Column
                    title="Price off percent"
                    key="priceOffPercent"
                    render={(_, record) => <>{record.priceOffPercent} %</>}
                ></Column>
                <Column title="Username" key="username" dataIndex="username"></Column>
                <Column title="ID User" key="userId" dataIndex="userId"></Column>
                <Column
                    title="Expiration time"
                    key="expirationTime"
                    render={(_, record) => <> {format(new Date(record.expirationTime), 'HH:mm:ss dd/MM/yyyy')}</>}
                ></Column>

                <Column
                    title="Status"
                    key="status"
                    dataIndex="status"
                    width={100}
                    align="center"
                    render={(_, record) => {
                        let color = 'volcano';
                        let name = 'In-active';

                        if (record.status === 1) {
                            color = 'green';
                            name = 'Active';
                        }
                        return <Tag color={color}>{name}</Tag>;
                    }}
                ></Column>

                <Column
                    title="Action"
                    key="action"
                    width={150}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button key={record.key} type="primary" size="small" onClick={() => onEdit(record)}>
                                <EditOutlined style={{ marginRight: 8 }} /> Edit
                            </Button>
                            <Button
                                key={record.key}
                                type="primary"
                                danger
                                size="small"
                                onClick={() => onDeleteConfirm(record)}
                            >
                                <DeleteOutlined style={{ marginRight: 8 }} /> Delete
                            </Button>
                        </Space>
                    )}
                ></Column>
            </Table>
        );
    }
}

export default VoucherList;
