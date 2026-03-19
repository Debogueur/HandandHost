import React from 'react';
import TiptapEditor from '../../common/TiptapEditor';

function BasicInformation({ name, description, onChange, onDescriptionChange }) {

    console.log(`Desc: ${description}`);
    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Basic Information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter category name"
                                // Fallback to empty string if name is undefined during load
                                value={name || ''}
                                onChange={onChange}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Category Description</label>
                            {/* Only render editor when description is available 
                               or pass an empty string to prevent Tiptap errors
                            */}
                            <TiptapEditor
                                content={description || ''}
                                onChange={onDescriptionChange}
                                placeholder="Describe this category..."
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BasicInformation;