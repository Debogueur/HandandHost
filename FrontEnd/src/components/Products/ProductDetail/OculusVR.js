import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OculusVR({ product }) {
    // 1. Initialize state with the first image from the product object
    // Assuming product.images is an array of URLs
    const [selectedImg, setSelectedImg] = useState(0);

    // Fallback images if the product doesn't have a gallery
    const images = product?.images || [product?.image];

    if (!product) return null;

    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <div className="product-details">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="product-details-image mt-50 d-flex">
                                    {/* 2. Dynamic Thumbnails */}
                                    <div className="product-thumb-image">
                                        <div className="product-thumb-image-active nav flex-column nav-pills me-3">
                                            {images.map((img, index) => (
                                                <Link
                                                    key={index}
                                                    className={`single-thumb lift ${selectedImg === index ? "active" : ""}`}
                                                    to="#!"
                                                    onClick={(e) => { e.preventDefault(); setSelectedImg(index); }}
                                                >
                                                    <img src={img} alt={`thumb-${index}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 3. Dynamic Main Image */}
                                    <div className="product-image">
                                        <div className="product-image-active tab-content">
                                            <Link to='#!' className="single-image lift">
                                                <img
                                                    src={images[selectedImg] || product.image}
                                                    alt={product.title}
                                                    className="img-fluid"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="product-details-content mt-45">
                                    {/* 4. Dynamic Text Content */}
                                    <h2 className="fw-bold fs-4">{product.title}</h2>
                                    <div className="my-3">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fa fa-star ${i < Math.floor(product.rating || 5) ? 'text-warning' : 'text-muted'}`}></i>
                                        ))}
                                        <span className="text-muted ms-3">({product.reviewCount || '0'} customer reviews)</span>
                                    </div>

                                    <div className="product-price">
                                        <h6 className="price-title fw-bold">Price</h6>
                                        <p className="sale-price fs-3 fw-bold text-primary">$ {product.price} USD</p>
                                        {product.oldPrice && (
                                            <p className="regular-price text-danger text-decoration-line-through">$ {product.oldPrice} USD</p>
                                        )}
                                    </div>

                                    <p className="mt-3 text-muted">
                                        {product.description || "No detailed description available for this product."}
                                    </p>

                                    <div className="product-btn mb-5 mt-4">
                                        <div className="d-flex flex-wrap">
                                            <div className="mt-2 mt-sm-0 me-1">
                                                <div className="input-group">
                                                    <input type="number" className="form-control" defaultValue="1" min="1" max="10" disabled />
                                                    <span className="input-group-text"><i className="fa fa-sort"></i></span>
                                                </div>
                                            </div>
                                            {/*<button className="btn btn-outline-primary mx-1 mt-2 mt-sm-0">*/}
                                            {/*    <i className="fa fa-heart me-1"></i> Wishlist*/}
                                            {/*</button>*/}
                                            {/*<Link to={process.env.PUBLIC_URL + '/shopping-cart'} className="btn btn-primary mx-1 mt-2 mt-sm-0 w-sm-100">*/}
                                            {/*    <i className="fa fa-shopping-cart me-1"></i> Add to Cart*/}
                                            {/*</Link>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OculusVR;