import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { getProducts, removeProduct } from '../../Redux/Actions/ProductActions';


import Categoriesblock from '../../components/Products/ProductGrid/CategoriesBlock';

import PricingBlock from '../../components/Products/ProductGrid/PricingBlock';
import RatingBlock from '../../components/Products/ProductGrid/RatingBlock';
import CardBlock from '../../components/Products/ProductGrid/CardBlock';
import PageHeader1 from '../../components/common/PageHeader1';

function ProductGrid() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // Get the current page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page') || '1');

    // 1. Extract list and meta from Redux
    // Note: Assuming your reducer stores the full API response in 'list'
    // or has a separate 'meta' field.
    // Inside ProductGrid.jsx
    // Inside ProductGrid.jsx
    const activeFilters = {
        categoryId: searchParams.get('categoryId') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        rating: searchParams.get('rating') || '',
        search: searchParams.get('search') || '',
    };
    const { list, meta, loading } = useSelector((state) => {
        // 1. Get the slice of state
        const productState = state.products || {};

        // 2. Extract the actual payload (which you named 'list' in the reducer)
        const apiResponse = productState.list || {};

        return {
            // Reach into the API response for the 'data' array
            list: apiResponse.data || [],
            // Reach into the API response for the 'meta' object
            meta: apiResponse.meta || {},
            loading: productState.loading
        };
    });

    // 2. Fetch products whenever the page changes
    useEffect(() => {
        dispatch(getProducts(currentPage, activeFilters));
    }, [dispatch, searchParams]); // Re-run when URL changes


    const updateFilters = (newParams) => {
        // Merge new filters with existing ones and reset to page 1
        const updated = { ...activeFilters, ...newParams, page: 1 };
        // Remove empty strings to keep URL clean
        Object.keys(updated).forEach(key => !updated[key] && delete updated[key]);
        setSearchParams(updated);
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(removeProduct(id));
        }
    };

    const handleEdit = (product) => {
        navigate('/product-edit', {
            state: { productId: product.id }
        });
    };

    // Helper for pagination rendering
    const renderPagination = () => {
        if (!meta || meta.last_page <= 1) return null;

        const pages = [];
        for (let i = 1; i <= meta.last_page; i++) {
            pages.push(
                <li key={i} className={`page-item ${meta.page === i ? 'active' : ''}`}>
                    <Link className="page-link" to={`/product-grid?page=${i}`}>{i}</Link>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="container-xxl">
            <PageHeader1 pagetitle='Products' productgrid={true} />
            <div className="row g-3 mb-3">
                <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="sticky-lg-top">
                        <div className="card mb-3">
                            <div className="reset-block">
                                <div className="filter-title"><h4 className="title">Filter</h4></div>
                                <div className="filter-btn">
                                    <Link className="btn btn-primary" to="/product-grid">Reset</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3"><Categoriesblock onFilter={(id) => updateFilters({ categoryId: id })} /></div>
                       
                        <div className="card mb-3"><PricingBlock onFilter={(prices) => updateFilters(prices)} /></div>
                        <div className="card"></div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
                    {loading ? (
                        <div className="d-flex justify-content-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : (
                        <CardBlock
                            products={list}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                    {/* Dynamic Pagination based on Meta Data */}
                    <div className="row g-3 mb-3 mt-3">
                        <div className="col-md-12">
                            <nav className="justify-content-end d-flex">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link className="page-link" to={`/product-grid?page=${currentPage - 1}`}>Previous</Link>
                                    </li>

                                    {renderPagination()}

                                    <li className={`page-item ${currentPage === meta?.last_page ? 'disabled' : ''}`}>
                                        <Link className="page-link" to={`/product-grid?page=${currentPage + 1}`}>Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;