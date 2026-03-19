import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sizeblock() {
    const [callopseSize, setCallopseSize] = useState(false)
    return (
        <div className="size-block">
            <div className="filter-title">
                <Link className="title" data-bs-toggle="collapse" to="#size" role="button" onClick={() => { setCallopseSize(!callopseSize) }} aria-expanded={callopseSize}>Select Size</Link>
            </div>
            <div className={`collapse ${callopseSize ? 'show' : ''}`} id="size">
                <div className="filter-size" id="filter-size-1">
                    <ul>
                        <li>XS</li>
                        <li>S</li>
                        <li className="">M</li>
                        <li>L</li>
                        <li>XL</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sizeblock