import React from 'react';
import TiptapEditor from '../../common/TiptapEditor';

function BasicInformation({ name, description, onChange, onDescriptionChange }) {
    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Basic Information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                        {/* NAME COLUMN */}
                        <div className="col-md-12">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter category name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        {/* DESCRIPTION COLUMN */}
                        <div className="col-md-12">
                            <label className="form-label">Category Description</label>
                            {/* IMPORTANT: Pass an empty string if description is null.
                                Some Tiptap implementations also need a 'key' to force 
                                a re-render when the data finally loads from the API.
                            */}
                            <TiptapEditor
                                key={description ? 'loaded' : 'loading'}
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