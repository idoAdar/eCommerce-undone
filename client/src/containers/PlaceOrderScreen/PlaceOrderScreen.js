import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../../store/actions/cartAction';
import { withRouter } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

// Boostrap & Styling:
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const PlaceOrderScreen = props => {
    return (
        <Fragment>
            <CheckoutSteps step1={true} step2={true} step3={true}/>
            <Row>
                <Col md={8}>                 
                    <h3 className={"margin_tb"}>Shipping To:</h3>
                    <p>
                        {props.shipping.address},
                        {props.shipping.city}, 
                        {props.shipping.country}, 
                        {props.shipping.postalCode}
                    </p>
                    <h3 className={"margin_tb"}>Payment Method:</h3>
                    <strong>{props.payment}</strong>
                    <h3 className={"margin_tb"}>Order Items:</h3>
                    {props.cart.length === 0 ? <p>Empty Cart</p> : (
                        <ListGroup variant="flush">
                            {props.cart.map((item, index) => {
                                return (
                                    <Row key={index} className={"margin_tb"}>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} className={"small_img"} />
                                        </Col>
                                        <Col>
                                            <p>{item.name}</p>
                                        </Col>
                                        <Col>
                                            <p>Total Price: X{item.quantity} {item.price}$</p>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </ListGroup>
                    )}          
                </Col>
                <Col md={4}>
                    <Card className="orderSummaryCard">
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>Order Summary</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                Shipping Tax: {props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) / 10}$ (10%)
                            </ListGroupItem>
                            <ListGroupItem>
                                Sum: {props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)}$
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button 
                                className={'btn-block'}
                                variant="success"
                                disabled={props.cart.length === 0 ? true : false}
                                >Order Now!</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        shipping: state.cartReducer.shippingAddress,
        payment: state.cartReducer.paymentMethod,
        cart: state.cartReducer.cartItems
    }
}

export default connect(mapStateToProps, null)(withRouter(PlaceOrderScreen));