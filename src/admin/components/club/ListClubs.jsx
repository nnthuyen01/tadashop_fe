import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';

import { Button, Modal, Skeleton, Space, Table, Tag } from 'antd';
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/lib/table/Column';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getClubs, clearClubState, deleteClub } from '../../redux/actions/clubAction';

class ListClubs extends Component {
    constructor() {
        super();

        this.state = {
            // dataSource: [
            //   { clubId: 1, name: 'Computer', status: 0 },
            //   { clubId: 2, name: 'Laptop', status: 1 },
            //   { clubId: 3, name: 'PC', status: 0 },
            //   { clubId: 4, name: 'mouse', status: 1 },
            // ],
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
        console.log(club);

        const { navigate } = this.props.router;
        navigate('/dashboard/club/update/' + club.id);
    };

    deleteClub = () => {
        console.log(this.state.club);
        this.props.deleteClub(this.state.club.id);
    };
    openDeleteConfirmModal = (club) => {
        this.setState({ ...this.state, club: club });

        console.log(club);

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
                    <Column title="Name" key="name" dataIndex="name"></Column>
                    {/* <Column
            title="Status"
            key="status"
            dataIndex="status"
            width={80}
            render={(_, { status }) => {
              let color = 'volcano';
              let name = 'In-visible';
              if (status === 'Visible') {
                color = 'green';
                name = 'Visible';
              }
              return <Tag color={color}>{name}</Tag>;
            }}
          ></Column> */}
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
