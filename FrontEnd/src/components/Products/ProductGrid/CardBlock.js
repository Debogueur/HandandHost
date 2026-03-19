import React from 'react';
// Added Link to the imports
import { useNavigate, Link } from 'react-router-dom';

function CardBlock({ products, onEdit, onDelete }) {
    const navigate = useNavigate();

    // Early return for empty state
    if (!products || products.length === 0) {
        return (
            <div className="col-12 text-center p-5">
                <div className="alert alert-info">No products found.</div>
            </div>
        );
    }

    // State handler for the "View" button
    const handleDetailClick = (product) => {
        // Navigates and passes the product object in the history state
        navigate(`/product-detail`, {
            state: { productId: product.id, product }
        });
    };


    const handleEditClick = (product) => {
        // Navigates and passes the product object in the history state
        navigate(`/product-edit`, {
            state: { productId: product.id, product }
        });
    };

    return (
        <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-3">
            {products.map((d) => (
                <div key={d.id} className="col">
                    <div className="card h-100 shadow-sm border-0">
                        <div className="product">
                            <div className="product-image position-relative">
                                <div className="product-item">
                                    <img
                                        src={d.image || 'assets/images/no-image.jpg'}
                                        alt={d.title}
                                        className="img-fluid w-100 rounded-top"
                                        style={{ objectFit: 'cover', height: '220px' }}
                                    />
                                </div>

                                {/* Action Buttons Overlay */}
                                <div className="btn-group position-absolute end-0 top-0 m-2">
                                    <button
                                        type="button"
                                        className="btn btn-white btn-sm shadow-sm border"
                                        onClick={() => handleEditClick(d)}
                                        title="Edit Product"
                                    >
                                        <i className="icofont-edit text-success"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-white btn-sm shadow-sm border"
                                        onClick={() => onDelete(d.id)}
                                        title="Delete Product"
                                    >
                                        <i className="icofont-ui-delete text-danger"></i>
                                    </button>
                                </div>

                                {/* Category Badge */}
                                {d.category && (
                                    <span className="badge bg-primary position-absolute start-0 top-0 m-2">
                                        {d.category.name}
                                    </span>
                                )}
                            </div>

                            <div className="product-content p-3">
                                <span className="rating mb-2 d-block small">
                                    <i className="icofont-star text-warning"></i> {d.rating || '0.0'}
                                </span>

                                {/* Title Link using Router State */}
                                <Link
                                    onClick={() => handleDetailClick(d)}
                                    className="fw-bold d-block mb-1 text-dark text-decoration-none"
                                >
                                    {d.title}
                                </Link>

                                <p className="text-muted small mb-2 text-truncate-2" style={{ height: '40px', overflow: 'hidden' }}>
                                    {d.description}
                                </p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-5 text-secondary">
                                        ${d.price}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 mt-3">
                                    {/* View Button using the handleDetailClick handler */}
                                    <button
                                        onClick={() => handleDetailClick(d)}
                                        className="btn btn-primary btn-sm flex-grow-1"
                                    >
                                        <i className="icofont-listine-dots"></i>  View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardBlock;