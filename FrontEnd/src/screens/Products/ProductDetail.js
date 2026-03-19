import React from 'react';
import { connect } from 'react-redux'; // 1. Import connect
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import OculusVR from '../../components/Products/ProductDetail/OculusVR';
import ProgressBar from '../../components/Products/ProductDetail/ProgressBar';
import ReviewDiscription from '../../components/Products/ProductDetail/ReviewDiscription';
import Discription from '../../components/Products/ProductDetail/Discription';
import About from '../../components/Products/ProductDetail/About';
import PageHeader1 from '../../components/common/PageHeader1';

function ProductDetail(props) {
    // 2. Priority: Use data from Router State (Link) first, then fallback to Redux
    const location = useLocation();
    const product = location.state?.product || props.activeProduct;

    // 3. Loading state if no product is found
    if (!product) {
        return (
            <div className="container-xxl p-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="container-xxl">
            {/* Pass the dynamic title */}
            <PageHeader1 pagetitle={product.title || 'Product Detail'} />

            <div className="row g-3 mb-3">
                {/* 4. Pass product data to your main display component */}
                <OculusVR product={product} />
            </div>

            <div className="row g-3 mb-3">
                <div className="col-md-12">
                    <Tab.Container defaultActiveKey="first" className="card">
                        <Row>
                            <Col sm={12}>
                                <Nav className="nav nav-tabs tab-body-header rounded d-inline-flex mb-3" role="tablist">
                                    <Nav.Item className="nav-item"><Nav.Link eventKey="first">Reviews</Nav.Link></Nav.Item>
                                    <Nav.Item className="nav-item"><Nav.Link eventKey="second">Descriptions</Nav.Link></Nav.Item>
                                    <Nav.Item className="nav-item"><Nav.Link eventKey="third">About</Nav.Link></Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <Tab.Content className="tab-content">
                                    <Tab.Pane eventKey="first" className="tab-pane fade show">
                                        <div className="row clearfix g-3">
                                            <div className="col-lg-4 col-md-12">
                                                <div className="feedback-info sticky-top">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            {/* Pass rating data if available */}
                                                            <ProgressBar rating={product.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <ReviewDiscription reviews={product.reviews} />
                                                {/* Pagination - static for now */}
                                                <nav aria-label="..." className="mt-3">
                                                    <ul className="pagination justify-content-end">
                                                        <li className="page-item disabled"><span className="page-link">Previous</span></li>
                                                        <li className="page-item active"><span className="page-link">1</span></li>
                                                        <li className="page-item"><Link className="page-link" to='#!'>Next</Link></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second" className="tab-pane fade show">
                                        <div className='card'>
                                            <div className="card-body">
                                                {/* 5. Pass dynamic description */}
                                                <Discription content={product.description} specifications={product.specs} />
                                            </div>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third" className="tab-pane fade show">
                                        <div className='card'>
                                            <div className="card-body">
                                                {/* 6. Pass vendor/brand info */}
                                                <About vendor={product.brand || product.category?.name} />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
}

// 7. Map Redux State to Props
const mapStateToProps = (state) => ({
    activeProduct: state.product?.selectedProduct // Adjust based on your actual reducer path
});

export default connect(mapStateToProps)(ProductDetail);