import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const ProfileScreen = props => {
    const [formState, setFormState] = useState({
        name: props.user.user.name,
        email: props.user.user.email,
        password: '******',
        confirm: '******'
    })

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const send = e => {
        e.preventDefault();
        if (formState.password === formState.confirm &&
            formState.password.length >= 6 && 
            formState.confirm.length >= 6 &&
            formState.name !== '') {
            props.spinner();
            return props.update(formState);
        }
        props.note();
    }

    return (
        <Fragment>
            <Form onSubmit={(e) => send(e)}>
                {!props.message ? null : (
                    <Alert variant="danger">
                        {props.message.message}
                    </Alert>
                )}
                <h1>Hello {props.user.user.name}</h1>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => updateState(e)}
                                value={formState.name}
                                name="name"
                                type="text" 
                                placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => updateState(e)}
                                disabled={true}
                                value={formState.email}
                                name="email"
                                type="email" 
                                placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.password}
                                name="password"
                                type="password" 
                                placeholder="Password must be at least 6 characters" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.confirm}
                                name="confirm"
                                type="password" 
                                placeholder="Please make sure to confirm your password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="dark" type="submit">
                        Update
                    </Button>
                </Row>
                {props.isLoading ? <Spinner /> : null}
            </Form>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        message: state.userReducer.message,
        user: state.userReducer.userInfo,
        isLoading: state.userReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (data) => dispatch(userAction.updateProfile(data)),
        note: () => dispatch(userAction.dropNoteUpdate()),
        spinner: () => dispatch(userAction.dropSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);