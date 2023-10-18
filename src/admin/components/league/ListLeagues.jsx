import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';

import { Button, Modal, Skeleton, Space, Table, Tag } from 'antd';
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/lib/table/Column';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getLeagues, clearLeagueState, deleteLeague } from '../../redux/actions/leagueAction';

class ListLeagues extends Component {
    constructor() {
        super();

        this.state = {
            league: {},
        };
    }
    componentDidMount = () => {
        this.props.getLeagues();
        console.log('did mount');
    };
    componentWillUnmount = () => {
        this.props.clearLeagueState();
        console.log('will unmount');
    };

    editLeague = (league) => {
        console.log(league);

        const { navigate } = this.props.router;
        navigate('/dashboard/league/update/' + league.id);
    };

    deleteLeague = () => {
        console.log(this.state.league);
        this.props.deleteLeague(this.state.league.id);
    };
    openDeleteConfirmModal = (league) => {
        this.setState({ ...this.state, league: league });

        console.log(league);

        const message = 'Do you want to delete the league ' + league.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteLeague,
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };
    render() {
        const { navigate } = this.props.router;
        const { leagues, isLoading } = this.props;
        if (isLoading) {
            return (
                <>
                    <ContentHeader
                        navigate={navigate}
                        title="List Leagues"
                        className="site-page-header"
                    ></ContentHeader>

                    <Skeleton active />
                </>
            );
        }
        return (
            <>
                <ContentHeader navigate={navigate} title="List Leagues" className="site-page-header"></ContentHeader>

                <Table dataSource={leagues} size="small" rowKey="id">
                    <Column title="League ID" key="id" dataIndex="id" width={40} align="center"></Column>
                    <Column title="Name" key="name" dataIndex="name"></Column>
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
                                    onClick={() => this.editLeague(record)}
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
    leagues: state.leagueReducer.leagues,
    isLoading: state.commonReducer.isLoading,
});
const mapDispatchToProps = {
    getLeagues,
    clearLeagueState,
    deleteLeague,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListLeagues));
