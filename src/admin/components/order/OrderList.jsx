import React, { Component } from 'react';
import { Button, Space, Table, Tag, Tooltip, Dropdown, Menu, Input, Select } from 'antd';
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import { MdPreview } from 'react-icons/md';
import withRouter from '../../helpers/withRouter';
import { connect } from 'react-redux';
import { getOrdersByStatus } from '../../redux/actions/orderAction';
class OrderList extends Component {
    state = {
        filteredState: null,
        filterDropdownVisible: false,
    };

    onStateFilter = () => {
        this.setState({
            filterDropdownVisible: false,
        });

        console.log(this.state.filteredState);
        let status;

        // Tùy thuộc vào giá trị của order, đặt giá trị status
        if (this.state.filteredState === 'Pending') {
            status = 0;
        } else if (this.state.filteredState === 'Processing') {
            status = 1;
        } else if (this.state.filteredState === 'Complete') {
            status = 2;
        } else if (this.state.filteredState === 'Cancel') {
            status = 3;
        } else if (this.state.filteredState === 'Delivery') {
            status = 4;
        } else if (this.state.filteredState === 'Paid') {
            status = 5;
        } else if (this.state.filteredState === 'UnPaid') {
            status = 6;
        } else if (this.state.filteredState === 'Confirmed') {
            status = 7;
        } else {
            status = 0;
        }
        const state = {
            status: status,
        };
        this.props.getOrdersByStatus(state);
    };
    render() {
        const { dataSource, onEdit } = this.props;
        const { navigate } = this.props.router;
        console.log(dataSource);

        return (
            <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
                <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>

                <Column
                    title="User"
                    key="user"
                    render={(_, record) => <span>{record.orderUser?.username}</span>}
                ></Column>
                <Column title="Create Time" key="createTime" dataIndex="createTime"></Column>
                {/* <Column
                    title="State"
                    key="state"
                    render={(_, record) => <Tag style={{ fontWeight: '700', color: 'navy' }}> {record.state}</Tag>}
                ></Column> */}
                <Column
                    title="State"
                    key="state"
                    filterDropdown={
                        <div className="custom-filter-dropdown">
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select state"
                                optionFilterProp="children"
                                onChange={(value) =>
                                    this.setState({
                                        filteredState: value,
                                    })
                                }
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {/* Tạo các option từ trạng thái duy nhất trong dataSource */}
                                {Array.from(new Set(dataSource.map((record) => record.state))).map((state, index) => (
                                    <Select.Option key={index} value={state}>
                                        {state}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button type="primary" onClick={() => this.onStateFilter()}>
                                Filter
                            </Button>
                        </div>
                    }
                    filterIcon={<DownOutlined />}
                    render={(_, record) => (
                        <Tag
                            style={{
                                fontWeight: '700',
                                color: record.state === 'Paid' ? 'green' : 'navy',
                                backgroundColor: record.state === 'Paid' ? 'yellow' : '',
                            }}
                        >
                            {' '}
                            {record.state}
                        </Tag>
                    )}
                ></Column>

                <Column
                    title="Action"
                    key="action"
                    width={150}
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button key={record.key} type="primary" size="small" onClick={() => onEdit(record)}>
                                <EditOutlined style={{ marginRight: 8 }} /> Edit State
                            </Button>

                            <Tooltip placement="top" title="View Product Detail" color="green">
                                <Button
                                    key={record.key}
                                    type="link"
                                    size="small"
                                    onClick={() => navigate('/dashboard/order/view/' + record.id)}
                                >
                                    <MdPreview color="#52c41a" size={24} />
                                </Button>
                            </Tooltip>
                        </Space>
                    )}
                ></Column>
            </Table>
        );
    }
}
// export default withRouter(OrderList);
const mapStateToProps = (state) => ({
    orders: state.orderReducer.orders,
    pagination: state.orderReducer.pagination,
});

const mapDispatchToProps = {
    getOrdersByStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderList));
