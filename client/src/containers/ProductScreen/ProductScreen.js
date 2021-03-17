import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as productsAction from '../../store/actions/productsAction';
import { Link } from 'react-router-dom';
import Rating from '../../components/Product/Rating';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Row, Col, Image, ListGroup, Button, ListGroupItem, FormControl } from 'react-bootstrap';

const Product = props => {
    const [qty, setQty] = useState(1);
    const id = props.match.params.productId;

    useEffect(() => {
        props.getProduct(id);
    }, [])

    const addToCartHandler = e => {
        e.preventDefault();
        props.history.push(`/cart/${id}?qty=${qty}`);
    }

    return (
        <Fragment>
            <Link to="/" className="btn btn-dark">Back</Link>
            {!props.product ? <Spinner /> : (
                <Row>
                    <Col md={6}>
                        <Image src={props.product.image} alt={props.product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{props.product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={props.product.rating} reviews={props.product.numReviews}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>Price: {props.product.price}$</p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>{props.product.description}</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroupItem>
                                <p>Price: {props.product.price}$</p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p>Stack: {props.product.countInStock === 0 ? 'Out of Stack' : `Only ${props.product.countInStock} In Stack`}</p>
                            </ListGroupItem>

                            {props.product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty: {qty}</Col>
                                        <Col>
                                            <FormControl as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(props.product.countInStock).keys()].map(count => {
                                                    return (
                                                        <option key={count + 1} value={count + 1}>{count + 1}</option>
                                                    )
                                                })}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}
                            
                            <ListGroupItem>
                                <Button className={'btn-block'} disabled={props.product.countInStock === 0 ? true : false}
                                onClick={(e) => addToCartHandler(e)}
                                >Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        product: state.productsReducer.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (productId) => dispatch(productsAction.getProd(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);