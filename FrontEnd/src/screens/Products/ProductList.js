import React from 'react';
import CategoriesBlock from '../../components/Products/ProductList/CategoriesBlock';
import SizeBlock from '../../components/Products/ProductList/SizeBlock';
import ColorBlock from '../../components/Products/ProductList/ColorBlock';
import PricingBlock from '../../components/Products/ProductList/PricingBlock';
import RatingBlock from '../../components/Products/ProductList/RatingBlock';
import CardBlock from '../../components/Products/ProductList/CardBlock';
import PageHeader1 from '../../components/common/PageHeader1';
import { Link } from 'react-router-dom';

function ProductList() {
    return (
        <div className="container-xxl">
            <PageHeader1 pagetitle='Products' productlist={true} />
            <div className="row g-3 mb-3">
                <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="sticky-lg-top">
                        <div className="card mb-3">
                            <div className="reset-block">
                                <div className="filter-title">
                                    <h4 className="title">Filter</h4>
                                </div>
                                <div className="filter-btn">
                                    <Link className="btn btn-primary" to="#!">Reset</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <CategoriesBlock />
                        </div>
                        <div className="card mb-3">
                            <SizeBlock />
                        </div>
                        <div className="card mb-3">
                            <ColorBlock />
                        </div>
                        <div className="card mb-3">
                            <PricingBlock />
                        </div>
                        <div className="card">
                            <RatingBlock />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
                    <CardBlock />
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-12">
                        <nav className="justify-content-end d-flex">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <Link className="page-link" to="#!">Previous</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="#!">1</Link></li>
                                <li className="page-item active" aria-current="page">
                                    <Link className="page-link" to="#!">2</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="#!">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="#!">Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductList;