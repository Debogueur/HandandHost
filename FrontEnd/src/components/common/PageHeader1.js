import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PageHeader1(props) {
    // 1. Destructure onClick from props
    const {
        pagetitle,
        righttitle,
        link,
        routebutton,
        modalbutton,
        button,
        onClick, // Add this here
        invoicetab,
        changelog,
        Orderdetail,
        productgrid,
        productlist,
        documentation,
        cantactus
    } = props;

    return (
        <div className="row align-items-center">
            <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="fw-bold mb-0">{pagetitle}</h3>

                    {routebutton ? (
                        <div className="col-auto d-flex w-sm-100">
                            <Link to={process.env.PUBLIC_URL + link} className="btn btn-primary btn-set-task w-sm-100">
                                <i className="icofont-plus-circle me-2 fs-6"></i>{righttitle}
                            </Link>
                        </div>
                    ) : null}

                    {modalbutton ? modalbutton() : null}

                    {/* 2. Update the button to use type="button" and the onClick prop */}
                    {button ? (
                        <button
                            type="button"
                            className="btn btn-primary btn-set-task w-sm-100 text-uppercase px-5"
                            onClick={onClick}
                        >
                            Save
                        </button>
                    ) : null}

                    {/* ... rest of your code (invoicetab, changelog, etc.) remains exactly the same ... */}
                    {invoicetab ? (
                        <div className="col-auto py-2 w-sm-100">
                            <Nav className="nav nav-tabs tab-body-header rounded invoice-set" role="tablist">
                                <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="first" to="#Invoice-list">Invoice List</Nav.Link></Nav.Item>
                                <Nav.Item className="nav-item"><Nav.Link className="nav-link " eventKey="second" to="#Invoice-Simple" >Simple invoice</Nav.Link></Nav.Item>
                                <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="third" to="#Invoice-Email" >Email invoice</Nav.Link></Nav.Item>
                            </Nav>
                        </div>
                    ) : null}
                    {/* ... (Keep other conditions exactly as they were) ... */}
                </div>
            </div>
        </div>
    );
}

export default PageHeader1;