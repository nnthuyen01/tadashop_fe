import React, { Component } from 'react';
import withRouter from './../../helpers/withRouter';

import { Col, Divider, Row, Form, Input, Button, Popconfirm } from 'antd';
import ContentHeader from '../common/ContentHeader';
import { insertLeague, getLeague, clearLeague, updateLeague } from '../../redux/actions/leagueAction';
import { connect } from 'react-redux';

class AddOrEditLeague extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            // league: { id: '', name: '', status: 'Visible' },
            league: { id: '', name: '' },
        };
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;
        if (id) {
            this.props.getLeague(id);
        } else {
            this.props.clearLeague();
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.league && prevState.league.id !== nextProps.league.id) {
            return {
                ...prevState,
                league: nextProps.league,
            };
        } else if (!nextProps.league) {
            return {
                ...prevState,
                // league: { id: '', name: '', status: 'Visible' },
                league: { id: '', name: '' },
            };
        }
        return null;
    }
    confirmUpdate = () => {
        console.log('update league');

        this.formRef.current.submit();
    };

    onSubmitForm = (values) => {
        console.log(values);

        const { navigate } = this.props.router;
        // const { id } = this.props.router.params;
        const { id } = this.state.league;

        if (!id) {
            this.props.insertLeague(values, navigate);
        } else {
            this.props.updateLeague(id, values, navigate);
        }
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { league } = this.state;
        let title = 'Add New League';

        if (league.id) {
            title = 'Update League';
        }
        return (
            <div>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>

                <Form
                    layout="vertical"
                    className="form"
                    onFinish={this.onSubmitForm}
                    key={league.id}
                    ref={this.formRef}
                    disabled={isLoading}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                label="League ID"
                                name="LeagueId"
                                initialValue={league.id}
                                hidden={league.id ? false : true}
                            >
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, min: 2 }]}
                                initialValue={league.name}
                            >
                                <Input></Input>
                            </Form.Item>
                            {/* <Form.Item label="Status" name="status" initialValue={league.status === 'Visible' ? '0' : '1'}>
                <Select>
                  <Select.Option value="0">Visible</Select.Option>
                  <Select.Option value="1">In-Visible</Select.Option>
                </Select>
              </Form.Item> */}
                            <Divider></Divider>
                            {!league.id && (
                                <Button htmlType="submit" type="primary" style={{ float: 'right' }} loading={isLoading}>
                                    Save
                                </Button>
                            )}
                            {league.id && (
                                <Popconfirm
                                    title="Are you sure update this league?"
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
    league: state.leagueReducer.league,
    isLoading: state.commonReducer.isLoading,
});
const mapDispatchToProps = {
    insertLeague,
    getLeague,
    clearLeague,
    updateLeague,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditLeague));
