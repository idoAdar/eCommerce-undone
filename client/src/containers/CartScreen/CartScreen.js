import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../../store/actions/cartAction';
import { Link } from 'react-router-dom';

// Boostrap & Styling:
import { Col, Row, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CartScreen = props => {
    useEffect(() => {
        const productId = props.match.params.productId;
        const qty = Number(props.location.search.split('=')[1]);
        if (productId && qty) {
            const oneProductPrice = props.product.price;
            const item = {
                productId: props.product._id,
                name: props.product.name,
                image: props.product.image,
                price: props.product.price * qty,
                quantity: qty
            }
            props.addToCart(item, oneProductPrice);
        }
    }, [])

    const removeItem = (e, id) => {
        e.preventDefault();
        props.deleteFromCart(id);
    }

    return (
        <Fragment>
            <Row>
                <Col lg={8} md={10}>
                    <h1>Shopping Cart</h1>
                    {props.cart.length === 0 ? <p>Empty Cart</p> : (
                        <ListGroup>
                            {props.cart.map(item => {
                                return (
                                    <ListGroupItem key={item.productId}>
                                        <Row>
                                            <Col lg={4} md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col lg={2} md={2}>
                                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                            </Col>
                                            <Col lg={2} md={2}>
                                                <p>{item.price.toFixed(2)} $</p>
                                            </Col>
                                            <Col lg={2} md={2}>
                                                <p>quantity: X{item.quantity}</p>
                                            </Col>
                                            <Col lg={2} md={2}>
                                                <Button onClick={(e) => removeItem(e, item.productId)} variant="danger" size="sm">Remove</Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4} className={'checkout_container'}>
                    <ListGroup>
                        <ListGroupItem>
                            <p>
                                Subtotal: ({
                                    props.cart.reduce((acc, item) => acc + item.quantity, 0)
                                }) items
                            </p>
                            <p>
                                Total Price: {
                                    props.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                                } $
                            </p>
                        </ListGroupItem>
                            <ListGroupItem>
                                <LinkContainer to={props.isAuth ? '/shipping' : '/login'}>
                                    <Button className={'btn-block'} 
                                    variant="success"
                                    disabled={props.cart.length === 0}
                                    >Checkout</Button>
                                </LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        product: state.productsReducer.product,
        cart: state.cartReducer.cartItems,
        isAuth: state.userReducer.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (data, price) => dispatch(cartAction.newOrder(data, price)),
        deleteFromCart: (id) => dispatch(cartAction.updateOrder(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);