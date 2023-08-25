import React, { Component } from 'react';
import { Button, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';

class SizeList extends Component {
    render() {
        const { dataSource, onEdit, onDeleteConfirm } = this.props;
        return (
            <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
                <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>
                <Column title="Size" key="size" dataIndex="size"></Column>
                <Column title="Quantity" key="quantity" dataIndex="quantity"></Column>
                <Column title="Id Product" key="productId" dataIndex="productId"></Column>

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

export default SizeList;
