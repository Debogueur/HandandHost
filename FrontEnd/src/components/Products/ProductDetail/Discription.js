import React from 'react';

// Destructuring props to match <Discription content={...} specifications={...} />
function Discription({ content, specifications }) {

    // Safety check: If no content is provided, we can still show the container
    // or a fallback message.
    if (!content && !specifications) {
        return (
            <div className="card-body">
                <p className="text-muted">No description or specifications available for this product.</p>
            </div>
        );
    }
    return (
        <div className="card-body">
            <h5 className="fw-bold mb-3">Product Overview</h5>
            <p className="text-muted">
                {content || "No detailed description available for this item."}
            </p>

            {/* Render specifications if they exist */}
            {specifications && Object.keys(specifications).length > 0 && (
                <div className="mt-4">
                    <h5 className="fw-bold mb-3">Technical Specifications</h5>
                    <div className="table-responsive">
                        <table className="table table-striped border">
                            <tbody>
                                {Object.entries(specifications).map(([key, value], index) => (
                                    <tr key={index}>
                                        <td className="fw-bold text-muted w-25">{key}</td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <p className="mt-3 small text-secondary">
                * Features and specifications are subject to change without prior notice.
            </p>
        </div>
    );
}

export default Discription;