import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PricingBlock({ onFilter }) {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    return (
        <div className="price-range p-3">
            <input type="number" placeholder="Min" className="form-control mb-2" onChange={e => setMin(e.target.value)} />
            <input type="number" placeholder="Max" className="form-control mb-2" onChange={e => setMax(e.target.value)} />
            <button className="btn btn-primary btn-sm w-100" onClick={() => onFilter({ minPrice: min, maxPrice: max })}>
                Apply Price
            </button>
        </div>
    );
}
export default PricingBlock;
