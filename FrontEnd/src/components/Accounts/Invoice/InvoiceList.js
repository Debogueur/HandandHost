import React from 'react';
import { InvoiceListData } from '../../Data/AccountData/AccountData';
import { Link } from 'react-router-dom';

function InvoiceList () {

        return (
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12">
                    {
                        InvoiceListData.map((d,i) => {
                            return <div key={'s'+i} className="card mb-3" >
                                <div className="card-body d-sm-flex justify-content-between">
                                    <Link to="#!" className="d-flex">
                                        <img className="avatar rounded" src={d.image} alt="" />
                                        <div className="flex-fill ms-3 ">
                                            <h6 className="d-flex justify-content-between mb-0"><span>{d.fname}</span></h6>
                                            <span className="">{d.name}</span>
                                        </div>
                                    </Link>
                                    <div className="text-end d-none d-md-block">
                                        <p className="mb-1"><i className="icofont-location-pin ps-1"></i> {d.address}</p>
                                        <span className="text-muted"><i className="icofont-money ps-1"></i>{d.money}</span>
                                    </div>
                                </div>
                                <div className="card-footer justify-content-between d-flex align-items-center">
                                    <div className="d-none d-md-block">
                                        <strong>Date on:</strong>
                                        <span>{d.date}</span>
                                    </div>
                                    <div>
                                        <Link className="btn btn-sm btn-white border lift" to="#!">Download</Link>
                                        <Link className="btn btn-sm btn-white border lift" to="#!">Send</Link>
                                        <Link className="btn btn-sm btn-white border lift" to="#!">Delete</Link>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <nav >
                        <ul className="pagination mt-4">
                            <li><Link className="page-link" to="#!">Previous</Link></li>
                            <li><Link className="page-link" to="#!">1</Link></li>
                            <li><Link className="page-link" to="#!">2</Link></li>
                            <li><Link className="page-link" to="#!">3</Link></li>
                            <li><Link className="page-link" to="#!">Next</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

export default InvoiceList;