import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

function Progressbar({ rating = 0, totalRatings = 0, ratingDetails = {} }) {

    // 1. Logic for star icons based on the average rating
    const renderStars = (avg) => {
        return [...Array(5)].map((_, i) => {
            const index = i + 1;
            if (avg >= index) return <i key={i} className="bi bi-star-fill text-warning me-1"></i>;
            if (avg >= index - 0.5) return <i key={i} className="bi bi-star-half text-warning me-1"></i>;
            return <i key={i} className="bi bi-star text-warning me-1"></i>;
        });
    };

    // 2. Rating breakdown mapping
    // We use the count from ratingDetails, or default to 0
    const breakdown = [
        { label: 5, count: ratingDetails.fiveStar || 0, color: "bg-success" },
        { label: 4, count: ratingDetails.fourStar || 0, color: "bg-info" },
        { label: 3, count: ratingDetails.threeStar || 0, color: "bg-warning" },
        { label: 2, count: ratingDetails.twoStar || 0, color: "bg-orange" }, // Ensure bg-orange is in your CSS
        { label: 1, count: ratingDetails.oneStar || 0, color: "bg-danger" },
    ];

    return (
        <div className="customer-rating-block">
            {/* Display the numerical average */}
            <h2 className="display-6 fw-bold mb-0">{Number(rating).toFixed(1)}</h2>
            <small className="text-muted">
                {totalRatings > 0 ? `based on ${totalRatings.toLocaleString()} ratings` : "No ratings yet"}
            </small>

            <div className="d-flex align-items-center mb-4 mt-2">
                <span className="mb-2 me-3">
                    {renderStars(rating)}
                </span>
            </div>

            {/* Progress Bars */}
            {breakdown.map((item) => {
                const percentage = totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;

                return (
                    <div className="progress-count mt-2" key={item.label}>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0 fw-bold d-flex align-items-center small">
                                {item.label} <i className="bi bi-star-fill text-warning ms-1" style={{ fontSize: '10px' }}></i>
                            </h6>
                            <span className="small text-muted">{item.count}</span>
                        </div>
                        <BootstrapProgressBar style={{ height: "8px" }}>
                            <BootstrapProgressBar
                                now={percentage}
                                className={item.color}
                            />
                        </BootstrapProgressBar>
                    </div>
                );
            })}

            <div className="customer-like mt-5">
                <h6 className="mb-0 fw-bold">Feedback Highlights</h6>
                <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
                        <div className="d-flex align-items-center">
                            <span className="badge bg-light text-success border me-2"></span>
                            <span className="small"></span>
                        </div>
                        <span className="text-muted small"></span>
                    </li>
                   
                </ul>
            </div>
        </div>
    );
}

export default Progressbar;