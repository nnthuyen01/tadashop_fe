import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';

import { Button, Modal, Skeleton, Space, Table, Tag, Input } from 'antd';
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/lib/table/Column';
import { EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getClubs, clearClubState, deleteClub } from '../../redux/actions/clubAction';

class ListClubs extends Component {
    constructor() {
        super();

        this.state = {
            club: {},
        };
    }
    componentDidMount = () => {
        this.props.getClubs();
        console.log('did mount');
    };
    componentWillUnmount = () => {
        this.props.clearClubState();
        console.log('will unmount');
    };

    editClub = (club) => {
        // console.log(club);

        const { navigate } = this.props.router;
        navigate('/dashboard/club/update/' + club.id);
    };

    deleteClub = () => {
        // console.log(this.state.club);
        this.props.deleteClub(this.state.club.id);
    };
    openDeleteConfirmModal = (club) => {
        this.setState({ ...this.state, club: club });

        // console.log(club);

        const message = 'Do you want to delete the club ' + club.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteClub,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };
    render() {
        const { navigate } = this.props.router;
        const { clubs, isLoading } = this.props;

        if (isLoading) {
            return (
                <>
                    <ContentHeader navigate={navigate} title="List Clubs" className="site-page-header"></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Clubs" className="site-page-header"></ContentHeader>

                <Table dataSource={clubs} size="small" rowKey="id">
                    <Column title="Club ID" key="id" dataIndex="id" width={40} align="center"></Column>
                    {/* <Column title="Name" key="name" dataIndex="name" width={600}></Column> */}
                    <Column
                        title="Name"
                        key="name"
                        dataIndex="name"
                        filterDropdown={(props) => (
                            <div style={{ padding: 8 }}>
                                <Input
                                    placeholder="Search name"
                                    value={props.selectedKeys[0]}
                                    onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={() => props.confirm()}
                                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                                />
                            </div>
                        )}
                        onFilter={(value, record) => record.name.toLowerCase().includes(value.toLowerCase())}
                        filterIcon={(filtered) => (
                            <span style={{ color: filtered ? '#1890ff' : undefined }}>
                                <SearchOutlined />
                            </span>
                        )}
                        // ... (rest of your Column definition)
                    />
                    <Column
                        title="League"
                        key="league"
                        // dataIndex={(record) => record.league.name}
                        width={400}
                        render={(_, record) => {
                            let name = record.league.name;

                            return <Tag style={{ fontWeight: '-moz-initial', color: 'navy' }}> {name}</Tag>;
                        }}
                    ></Column>
                    <Column
                        title="Action"
                        key="action"
                        width={150}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button
                                    key={record.key}
                                    type="primary"
                                    size="small"
                                    onClick={() => this.editClub(record)}
                                >
                                    <EditOutlined style={{ marginRight: 8 }} /> Edit
                                </Button>
                                <Button
                                    key={record.key}
                                    type="primary"
                                    danger
                                    size="small"
                                    onClick={() => this.openDeleteConfirmModal(record)}
                                >
                                    <DeleteOutlined style={{ marginRight: 8 }} /> Delete
                                </Button>
                            </Space>
                        )}
                    ></Column>
                </Table>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    clubs: state.clubReducer.clubs,
    isLoading: state.commonReducer.isLoading,
});
const mapDispatchToProps = {
    getClubs,
    clearClubState,
    deleteClub,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListClubs));
