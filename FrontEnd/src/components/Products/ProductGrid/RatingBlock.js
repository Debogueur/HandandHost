import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RatingBlock({ onFilter, currentRating }) {
    const [callopsRating, setCallopsRating] = useState(true);

    const handleRatingChange = (rating) => {
        // If the user clicks the same rating twice, we clear the filter
        const newRating = currentRating === rating.toString() ? '' : rating;
        onFilter({ rating: newRating });
    };

    return (
        <div className="rating-block">
            <div className="filter-title">
                <Link
                    className="title"
                    to="#!"
                    role="button"
                    onClick={() => setCallopsRating(!callopsRating)}
                    aria-expanded={callopsRating}
                >
                    Select Rating
                </Link>
            </div>
            <div className={`collapse ${callopsRating ? 'show' : ''}`} id="rating">
                <div className="filter-rating">
                    <ul>
                        {[5, 4, 3, 2, 1].map((num) => (
                            <li key={num}>
                                <div className="rating-check">
                                    <input
                                        type="checkbox"
                                        id={`rating-${num}`}
                                        checked={currentRating === num.toString()}
                                        onChange={() => handleRatingChange(num)}
                                    />
                                    <label htmlFor={`rating-${num}`}><span></span></label>
                                    <p>
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                key={i}
                                                className={`icofont-star ${i < num ? 'text-warning' : 'text-muted'}`}
                                            ></i>
                                        ))}
                                        <span className="ms-2 small text-muted">({num} & Up)</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RatingBlock;