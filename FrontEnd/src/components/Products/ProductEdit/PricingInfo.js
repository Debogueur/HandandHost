import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function PricingInfo({ product }) {
    // Safety check: if product is missing, show a fallback
    if (!product) {
        return <div className="card-body">No pricing information available.</div>;
    }

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                <h6 className="m-0 fw-bold">Pricing Info</h6>
            </div>
            <div className="card-body">
                <div className="row g-3 align-items-center">
                    {/* Old Price Field */}
                    <div className="col-md-12">
                        <label className="form-label">Product Price Old</label>
                        <input
                            type="text"
                            className="form-control"
                            value={`$${product.oldPrice || product.price}`}
                            onChange={() => { }}
                        />
                    </div>

                    {/* New Price Field */}
                    <div className="col-md-12">
                        <label className="form-label">Product Price New</label>
                        <input
                            type="text"
                            className="form-control"
                            value={`$${product.newPrice || product.price}`}
                            onChange={() => { }}
                        />
                    </div>

                    {/* Coupon Field */}
                    <div className="col-md-12">
                        <label className="form-label">Product Coupon</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.couponCode || "NO COUPON"}
                            onChange={() => { }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PricingInfo;