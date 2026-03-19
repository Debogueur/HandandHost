import React from 'react';

function Categories({ categories, selectedParent, onParentChange }) {
    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                <h6 className="m-0 fw-bold">Parent Category</h6>
            </div>
            <div className="card-body">
                <label className="form-label">Select Parent (Optional)</label>
                <select
                    className="form-select"
                    size="7"
                    value={selectedParent || ""}
                    onChange={(e) => onParentChange(e.target.value)}
                >
                    {/* Option for a Top-Level Category (no parent) */}
                    <option value="">None (Top Level)</option>

                    {/* Map through your actual Redux list */}
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <div className="form-text mt-2">
                    Leave as "None" to create a main category.
                </div>
            </div>
        </>
    );
}

export default Categories;