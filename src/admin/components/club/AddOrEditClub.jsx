import React, { Component } from 'react';
import withRouter from './../../helpers/withRouter';
import { MdSportsSoccer } from 'react-icons/md';
import { Col, Divider, Row, Form, Input, Button, Popconfirm, Select, message } from 'antd';
import ContentHeader from '../common/ContentHeader';
import { insertClub, getClub, clearClub, updateClub } from '../../redux/actions/clubAction';
import { connect } from 'react-redux';
import LeagueService from '~/admin/services/leagueService';

class AddOrEditClub extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            // club: { id: '', name: '', status: 'Visible' },
            club: { id: '', name: '' },
            leagues: [],
        };
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;
        if (id) {
            this.props.getClub(id);
            const { club } = this.props;
            const newClub = {
                id: club.id,
                name: club.name,
                league: club.league,
            };
            this.setState({ ...this.state, club: newClub });
        } else {
            this.props.clearClub();
        }
        this.loadData();
    };

    loadData = async () => {
        try {
            const leagueService = new LeagueService();
            const leagueListResponse = await leagueService.getLeagues();

            this.setState({
                ...this.state,
                leagues: leagueListResponse.data,
            });
        } catch (error) {
            console.log(error);
            message.error('Error: ' + error);
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.club && prevState.club.id !== nextProps.club.id) {
            return {
                ...prevState,
                club: nextProps.club,
            };
        } else if (!nextProps.club) {
            return {
                ...prevState,

                club: { id: '', name: '' },
                leagues: [],
            };
        }
        return null;
    }
    confirmUpdate = () => {
        console.log('update club');

        this.formRef.current.submit();
    };

    onSubmitForm = (values) => {
        console.log(values);

        const { navigate } = this.props.router;
        // const { id } = this.props.router.params;
        const { id } = this.state.club;

        if (!id) {
            this.props.insertClub(values, navigate);
        } else {
            this.props.updateClub(id, values, navigate);
        }
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { club, leagues } = this.state;
        let title = 'Add New Club';
        console.log(club);

        if (club.id) {
            title = 'Update Club';
        }
        return (
            <div>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>

                <Form
                    layout="vertical"
                    className="form"
                    onFinish={this.onSubmitForm}
                    key={club.id}
                    ref={this.formRef}
                    disabled={isLoading}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                label="Club ID"
                                name="ClubId"
                                initialValue={club.id}
                                hidden={club.id ? false : true}
                            >
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, min: 2 }]}
                                initialValue={club.name}
                            >
                                <Input></Input>
                            </Form.Item>

                            <Form.Item
                                label="League"
                                name="leagueId"
                                initialValue={club.league ? club.league.id : undefined}
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <Select placeholder="Select league" suffixIcon={<MdSportsSoccer />}>
                                    {leagues &&
                                        leagues.map((item) => (
                                            <Select.Option value={item.id} key={'league' + item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Divider></Divider>
                            {!club.id && (
                                <Button htmlType="submit" type="primary" style={{ float: 'right' }} loading={isLoading}>
                                    Save
                                </Button>
                            )}
                            {club.id && (
                                <Popconfirm
                                    title="Are you sure update this club?"
                                    onConfirm={this.confirmUpdate}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" style={{ float: 'right' }} loading={isLoading}>
                                        Update
                                    </Button>
                                </Popconfirm>
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    club: state.clubReducer.club,
    isLoading: state.commonReducer.isLoading,
});
const mapDispatchToProps = {
    insertClub,
    getClub,
    clearClub,
    updateClub,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditClub));
