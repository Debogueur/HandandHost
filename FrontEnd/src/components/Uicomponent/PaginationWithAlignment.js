import React, { useState } from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function PaginationWithAlignment () {
    const[basicT,setBasicT]=useState("Preview")
    return (
        <div className="border-top mt-5 pt-3">
            <h5 id="disabled-and-active-states">Alignment</h5>
            <p>Change the alignment of pagination components with <Link to="https://v5.getbootstrap.com/docs/5.0/utilities/flex/">flexbox utilities</Link>.</p>
            <ul className="nav nav-tabs tab-card px-3 border-bottom-0" role="tablist">
                <li className="nav-item"><Link className={basicT === "Preview"?"nav-link active":"nav-link"} to="#!" onClick={(e)=>{e.preventDefault(); setBasicT("Preview" ) }}>Preview</Link></li>
                <li className="nav-item"><Link className={basicT === "Html"?"nav-link active":"nav-link"} to="#!" onClick={(e)=>{e.preventDefault(); setBasicT("Html" ) }}>HTML</Link></li>
            </ul>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="tab-content">
                        <div className={basicT === "Preview"?"tab-pane fade active show":"tab-pane fade"} id="nav-Preview3" role="tabpanel">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-start">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#!"  aria-disabled="true">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#!">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#!">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#!" aria-disabled="true">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#!">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#!">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#!"  aria-disabled="true">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#!">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#!">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#!">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                            
                        </div>
                        <div className={basicT === "Html"?"tab-pane fade active show":"tab-pane fade"} id="nav-HTML3" role="tabpanel">
                        <SyntaxHighlighter language="javascript" className="mt-2 language-html py-2 px-2"  style={a11yLight}>
                                {`<!-- pagination: left -->
<nav aria-label="Page navigation">
    <ul class="pagination justify-content-start">
        <li class="page-item disabled">
            <Link class="page-link" to="#!" tabindex="-1" aria-disabled="true">Previous</Link>
        </li>
        <li class="page-item"><Link class="page-link" to="#!">1</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">2</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">3</Link></li>
        <li class="page-item">
            <Link class="page-link" to="#!">Next</Link>
        </li>
    </ul>
</nav>

<!-- pagination: center -->
<nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
        <li class="page-item disabled">
            <Link class="page-link" to="#!" tabindex="-1" aria-disabled="true">Previous</Link>
        </li>
        <li class="page-item"><Link class="page-link" to="#!">1</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">2</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">3</Link></li>
        <li class="page-item">
            <Link class="page-link" to="#!">Next</Link>
        </li>
    </ul>
</nav>

<!-- pagination: right -->
<nav aria-label="Page navigation">
    <ul class="pagination justify-content-end">
        <li class="page-item disabled">
            <Link class="page-link" to="#!" tabindex="-1" aria-disabled="true">Previous</Link>
        </li>
        <li class="page-item"><Link class="page-link" to="#!">1</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">2</Link></li>
        <li class="page-item"><Link class="page-link" to="#!">3</Link></li>
        <li class="page-item">
            <Link class="page-link" to="#!">Next</Link>
        </li>
    </ul>
</nav>`}
                    </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default PaginationWithAlignment;