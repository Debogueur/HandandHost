import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function BreadcrumbTile() {
    return (
        <div className="col-12">
            <div className="card p-4 bd-content">
                <h2>Example</h2>
                <div className="bd-example mb-5">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="!#">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </nav>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="!#">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="!#">Library</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                    </nav>
                    <SyntaxHighlighter language="javascript" className="mt-2 language-html py-2 px-2" style={a11yLight}>
                        {`<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Home</li>
    </ol>
</nav>

<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="#">Home</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Library</li>
    </ol>
</nav>

<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="#">Home</Link></li>
        <li class="breadcrumb-item"><Link to="#">Library</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
</nav>`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    )
}


export default BreadcrumbTile;