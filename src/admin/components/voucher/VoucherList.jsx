import React, { Component } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';

class VoucherList extends Component {
    render() {
        const { dataSource, onEdit, onDeleteConfirm } = this.props;
        return (
            <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
                <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>
                <Column title="Code" key="code" dataIndex="code"></Column>
                <Column title="Price" key="price" dataIndex="price"></Column>

                <Column
                    title="Status"
                    key="status"
                    dataIndex="status"
                    width={100}
                    align="center"
                    render={(_, record) => {
                        let color = 'volcano';
                        let name = 'In-active';
                        console.log(record);
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
