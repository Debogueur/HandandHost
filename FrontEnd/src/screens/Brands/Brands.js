import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

// Import images
import AppleImg from '../../assets/images/brand/apple.jpg';
import SamsungImg from '../../assets/images/brand/samsung.jpg';
import LenovoImg from '../../assets/images/brand/lenovo.jpg';
import HpImg from '../../assets/images/brand/hp.jpg';
import GodrejImg from '../../assets/images/brand/godrej.jpg';
import OnePlusImg from '../../assets/images/brand/oneplus.jpg';

const BrandDropzone = ({ onFileSelect, defaultFile }) => {
    const [preview, setPreview] = useState(defaultFile || null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);
                onFileSelect(file);
            }
        }
    });

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} style={{ cursor: 'pointer', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #dee2e6', borderRadius: '10px', overflow: 'hidden' }}>
            <input {...getInputProps()} />
            {preview ? (
                <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center p-2">
                    <img src={preview} alt="Preview" style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }} />
                    <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            onFileSelect(null);
                        }}
                    >
                        <i className="icofont-ui-delete"></i>
                    </button>
                </div>
            ) : (
                <div className="dz-message text-center p-4">
                    <i className="icofont-cloud-upload fs-1 text-muted d-block mb-2"></i>
                    <span className="text-muted">Drag & drop a brand image here, or click to select</span>
                    <small className="d-block text-muted mt-2">Only portrait or square images (JPG, PNG), 1M max.</small>
                </div>
            )}
        </div>
    );
};

const Brands = () => {
    const [brands, setBrands] = useState([
        { id: '01', name: 'Apple', image: AppleImg, status: true },
        { id: '02', name: 'Samsung', image: SamsungImg, status: true },
        { id: '03', name: 'Lenovo', image: LenovoImg, status: true },
        { id: '04', name: 'Hp', image: HpImg, status: true },
        { id: '05', name: 'Godrej', image: GodrejImg, status: true },
        { id: '06', name: 'OnePlus', image: OnePlusImg, status: true },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', image: '' });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            setBrands(brands.filter(brand => brand.id !== id));
        }
    };

    const handleStatusToggle = (id) => {
        setBrands(brands.map(brand =>
            brand.id === id ? { ...brand, status: !brand.status } : brand
        ));
    };

    const handleEditClick = (brand) => {
        setEditData(brand);
        setSelectedFile(null);
        setShowEditModal(true);
    };

    const handleAddBrand = () => {
        // Logic to add brand would go here (e.g., API call)
        console.log("Adding brand with file:", selectedFile);
        setShowAddModal(false);
    };

    const handleUpdateBrand = () => {
        // Logic to update brand would go here
        console.log("Updating brand with file:", selectedFile);
        setShowEditModal(false);
    };

    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="fw-bold mb-0">Manage Brands</h3>
                            <div className="col-auto d-flex w-sm-100">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-set-task w-sm-100"
                                    onClick={() => {
                                        setSelectedFile(null);
                                        setShowAddModal(true);
                                    }}
                                >
                                    <i className="icofont-plus-circle me-2 fs-6"></i>Add brand
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <Table id="myDataTable" className="table table-hover align-middle mb-0" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.map((brand) => (
                                            <tr key={brand.id}>
                                                <td><strong>{brand.id}</strong></td>
                                                <td>{brand.name}</td>
                                                <td>
                                                    <img
                                                        src={brand.image}
                                                        alt="Brand"
                                                        className="img-fluid"
                                                        width="80"
                                                        onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=" + brand.name }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            checked={brand.status}
                                                            onChange={() => handleStatusToggle(brand.id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleEditClick(brand)}
                                                        >
                                                            <i className="icofont-edit text-success"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary deleterow"
                                                            onClick={() => handleDelete(brand.id)}
                                                        >
                                                            <i className="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Brand Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row g-3 mb-3">
                            <div className="col-sm-12">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter brand name" />
                            </div>
                            <div className="col-md-12">
                                <Form.Label>Brand Image Upload</Form.Label>
                                <BrandDropzone onFileSelect={setSelectedFile} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddBrand}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Brand Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Edit Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row g-3 mb-3">
                            <div className="col-sm-12">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={editData.name} />
                            </div>
                            <div className="col-md-12">
                                <Form.Label>Brand Image Upload</Form.Label>
                                <BrandDropzone onFileSelect={setSelectedFile} defaultFile={editData.image} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateBrand}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Brands;