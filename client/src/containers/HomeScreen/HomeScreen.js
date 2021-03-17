import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as productsAction from '../../store/actions/productsAction';
import Product from '../../components/Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Row, Col } from 'react-bootstrap';

const HomeScreen = props => {
    useEffect(() => {
        props.getAllProducts();
    }, []);

    return (
        <Fragment>
            <h1>List of Products</h1>
            {props.isLoading ? <Spinner /> : (
                <Row>
                    {props.products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        )
                    })}
                </Row>
            )}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productsReducer.products,
        isLoading: state.productsReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProducts: () => dispatch(productsAction.getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);