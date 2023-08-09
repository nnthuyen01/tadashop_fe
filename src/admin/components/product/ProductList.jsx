import React, { Component } from 'react';
import ProductService from './../../services/productService';
import { MdDelete, MdEdit, MdPreview, MdCheckCircle } from 'react-icons/md';
import { Button, Image, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import withRouter from '../../helpers/withRouter';

class ProductList extends Component {
    render() {
        const { products, onDeleteConfirm } = this.props;
        const { navigate } = this.props.router;
        return (
            <Table dataSource={products} size="small" rowKey="id" pagination={false}>
                <Column
                    title="Image"
                    key="imageFileName"
                    width={90}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <Image width="100%" src={ProductService.getProductImageUrl(record.imageFileName)}></Image>
                        </Space>
                    )}
                ></Column>

                <Column title="Name" key="name" dataIndex="name"></Column>
                <Column title="Total Quantity" key="totalQuantity" dataIndex="totalQuantity" width={60}></Column>
                <Column title="Price" key="price" dataIndex="price" width={60}></Column>
                <Column title="Discount" key="discount" dataIndex="discount" width={60}></Column>
                <Column
                    title="Is Featured"
                    key="isFeatured"
                    dataIndex="isFeatured"
                    width={100}
                    // render={(_, record) => <h1>{record.isFeatured}</h1>}
                    render={(_, record) => {
                        return record.isFeatured === true ? <MdCheckCircle color="#f74877" size={24} /> : null;
                    }}
                ></Column>
                <Column
                    title="Status"
                    key="status"
                    dataIndex="status"
                    width={60}
                    render={(_, record) => <h1>{record.status}</h1>}
                ></Column>

                <Column
                    title="Action"
                    key="action"
                    width={150}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <Tooltip placement="top" title="View Product Detail" color="green">
                                <Button
                                    key={record.key}
                                    type="link"
                                    //   style={{ backgroundColor: '#52c41a' }}
                                    size="small"
                                    onClick={() => navigate('/dashboard/products/view/' + record.id)}
                                >
                                    <MdPreview color="#52c41a" size={24} />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Edit Product" color="blue">
                                <Button
                                    key={record.key}
                                    type="link"
                                    size="small"
                                    onClick={() => navigate('/dashboard/products/update/' + record.id)}
                                >
                                    <MdEdit color="blue" size={24} />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Delete Product" color="red">
                                <Button
                                    key={record.key}
                                    type="link"
                                    danger
                                    size="small"
                                    onClick={() => onDeleteConfirm(record)}
                                >
                                    <MdDelete color="red" size={24} />
                                </Button>
                            </Tooltip>
                        </Space>
                    )}
                ></Column>
            </Table>
        );
    }
}

export default withRouter(ProductList);
