import React from 'react';

// Receiving the vendor/brand data as a prop
function About({ product }) {

    // Fallback content if data is missing
    if (!product) {
        return <div className="card-body">No vendor information available.</div>;
    }

    return (
        <div className="card-body">
            <h3 className="fw-bold mb-3">About the {product.brand || 'Product'}</h3>

            <p className="text-muted">
                {product.aboutContent || `This high-quality ${product.title} is provided by ${product.brand || 'our premium vendor'}. 
                We ensure that all products meet our strict quality and durability standards.`}
            </p>

            <h5 className="mt-4 fw-bold">Key Brand Highlights:</h5>
            <ul className="list-unstyled">
                <li className="mb-2">
                    <i className="icofont-check-circled text-success me-2"></i>
                    <strong>Authenticity:</strong> 100% genuine {product.brand} product.
                </li>
                <li className="mb-2">
                    <i className="icofont-check-circled text-success me-2"></i>
                    <strong>Category:</strong> {product.category?.name || 'General Electronics'}
                </li>
                <li className="mb-2">
                    <i className="icofont-check-circled text-success me-2"></i>
                    <strong>Warranty:</strong> {product.warranty || '1 Year Manufacturer Warranty'}
                </li>
                <li className="mb-2">
                    <i className="icofont-check-circled text-success me-2"></i>
                    <strong>Shipping:</strong> {product.shippingInfo || 'Standard 3-5 business days.'}
                </li>
            </ul>

            <div className="alert alert-info mt-4">
                <strong>Return Policy:</strong> {product.returnPolicy || '30-day money-back guarantee for unused items.'}
            </div>
        </div>
    );
}

export default About;