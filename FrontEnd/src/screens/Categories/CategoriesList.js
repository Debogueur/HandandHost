import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import PageHeader1 from '../../components/common/PageHeader1';
import { getCategories, removeCategory } from '../../Redux/Actions/CategoryActions';

function CategoriesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    // Extract 'list' and 'loading' from the categories slice
    const { list, loading } = useSelector((state) => state.categories || {});

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete item?")) {
            dispatch(removeCategory(id));
        }
    };

    // New: Handle Edit click using state instead of URL params
    const handleEdit = (category) => {
        navigate('/categories-edit', {
            state: { categoryId: category.id }
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1
                    pagetitle='Category List'
                    righttitle='Add Categories'
                    link='/categories-add'
                    routebutton={true}
                />
                <div className="row g-3 mb-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0 nowrap" style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Parent Category</th>
                                                <th className="dt-body-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item) => (
                                                <tr key={item.id}>
                                                    <td><strong>#{item.id}</strong></td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {/* Using dangerouslySetInnerHTML if description contains Tiptap HTML */}
                                                        <div className="text-muted small" dangerouslySetInnerHTML={{ __html: item.description }} />
                                                    </td>
                                                    <td>
                                                        {item.parent ? (
                                                            <span className="badge bg-info text-dark">
                                                                {item.parent.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted small">Root Category</span>
                                                        )}
                                                    </td>
                                                    <td className="dt-body-right">
                                                        <div className="btn-group" role="group">
                                                            {/* Updated: Changed Link to button with handleEdit */}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(item)}
                                                                className="btn btn-outline-secondary"
                                                            >
                                                                <i className="icofont-edit text-success"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesList;