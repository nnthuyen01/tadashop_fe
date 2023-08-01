import React, { Component } from 'react';
import withRouter from './../../helpers/withRouter';

import { Col, Divider, Row, Form, Input, Select, Button, Popconfirm } from 'antd';
import ContentHeader from '../common/ContentHeader';
import { insertClub, getClub, clearClub, updateClub } from '../../redux/actions/clubAction';
import { connect } from 'react-redux';

class AddOrEditClub extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            // club: { id: '', name: '', status: 'Visible' },
            club: { id: '', name: '' },
        };
    }

    componentDidMount = () => {
        const { id } = this.props.router.params;
        if (id) {
            this.props.getClub(id);
        } else {
            this.props.clearClub();
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
                // club: { id: '', name: '', status: 'Visible' },
                club: { id: '', name: '' },
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
        const { club } = this.state;
        let title = 'Add New Club';

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
                            {/* <Form.Item label="Status" name="status" initialValue={club.status === 'Visible' ? '0' : '1'}>
                <Select>
                  <Select.Option value="0">Visible</Select.Option>
                  <Select.Option value="1">In-Visible</Select.Option>
                </Select>
              </Form.Item> */}
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
