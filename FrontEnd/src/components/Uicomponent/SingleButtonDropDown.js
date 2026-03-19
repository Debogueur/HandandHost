import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function SingleButtonDropDown(){
  const tabEvent=(evt, panid, tabClass, navClass)=>{
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName(tabClass);
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" show", "");
            tabcontent[i].className = tabcontent[i].className.replace(" active", "");
        }
        tablinks = document.getElementsByClassName(navClass);
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";   
        document.getElementById(panid).classList.add("show")
            document.getElementById(panid).classList.add("active") 
    }
    return (
        <div className="border-top mt-5 pt-3">
            <h3 id="single-button">Single button</h3>
            <p>Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. Here’s how you can put them to work with either <code>&lt;button&gt;</code> elements:</p>
            <ul className="nav nav-tabs tab-card px-3 border-bottom-0" role="tablist">
                <li className="nav-item"><Link className="nav-link nav-link-1 active" id="tab1" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(e,"nav-Preview1","tab-pane-1","nav-link-1") }}>Preview</Link></li>
                <li className="nav-item"><Link className="nav-link nav-link-1" id="tab2" to="#!" onClick={(e)=>{e.preventDefault();tabEvent(e,"nav-HTML1","tab-pane-1","nav-link-1") }}>HTML</Link></li>
            </ul>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane tab-pane-1 fade active show" id="nav-Preview1">
                            <Dropdown className="d-inline-flex m-1">
                                <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-primary">
                                Primary Dropdown
                                </Dropdown.Toggle>

                                <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
                                    <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="d-inline-flex m-1">
                                <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-outline-primary">
                                Primary Outline Dropdown
                                </Dropdown.Toggle>

                                <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
                                    <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="d-inline-flex m-1">
                                <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-dark ">
                                Dark Dropdown
                                </Dropdown.Toggle>

                                <Dropdown.Menu as="ul" className="dropdown-menu-dark shadow p-3">
                                    <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>

                                </Dropdown.Menu>
                            </Dropdown>
                            
                            
                        </div>
                        <div className="tab-pane tab-pane-1 fade " id="nav-HTML1">
                        <SyntaxHighlighter language="javascript" className="mt-2 language-html py-2 px-2"  style={a11yLight}>
                                {`<!-- dropdown: primary -->
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-primary">
    Primary Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-outline-primary">
    Primary Outline Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="button" variant="" id="dropdown-basic" className="btn btn-dark ">
    Dark Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="dropdown-menu-dark shadow p-3">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>`}
                    </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>

            <p>And with <code>&lt;a&gt;</code> elements:</p>
            <ul className="nav nav-tabs tab-card px-3 border-bottom-0" role="tablist">
                <li className="nav-item"><Link className="nav-link nav-link-2 active" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(e,"nav-Preview2","tab-pane-2","nav-link-2") }}>Preview</Link></li>
                <li className="nav-item"><Link className="nav-link nav-link-2" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(e,"nav-HTML2","tab-pane-2","nav-link-2") }}>HTML</Link></li>
            </ul>
            <div className="card mb-3">
                <div className="card-body tab-content">
                    <div className="tab-pane fade tab-pane-2 show active" id="nav-Preview2">
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-primary">
                            Primary Dropdown
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
                                <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-outline-primary">
                            Primary Outline Dropdown
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
                                <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-dark ">
                            Dark Dropdown
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="dropdown-menu-dark shadow p-3">
                                <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>

                            </Dropdown.Menu>
                        </Dropdown>
                      

                    </div>
                    <div className="tab-pane fade tab-pane-2" id="nav-HTML2">
                    <SyntaxHighlighter language="javascript" className="mt-2 language-html py-2 px-2"  style={a11yLight}>
                                {`<!-- dropdown: primary -->
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-primary">
    Primary Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-outline-primary">
    Primary Outline Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow p-3 show">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
    </Dropdown.Menu>
    </Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-dark ">
    Dark Dropdown
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="dropdown-menu-dark shadow p-3">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>

    </Dropdown.Menu>
</Dropdown>`}
                    </SyntaxHighlighter>
                    </div>
                </div>
            </div>

            <p>The best part is you can do this with any button variant, too:</p>
            <ul className="nav nav-tabs tab-card px-3 border-bottom-0" role="tablist">
                <li className="nav-item"><Link className="nav-link nav-link-3 active" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(e,"nav-Preview3","tab-pane-3","nav-link-3") }}>Preview</Link></li>
                <li className="nav-item"><Link className="nav-link nav-link-3" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(e,"nav-HTML3","tab-pane-3","nav-link-3") }}>HTML</Link></li>
            </ul>
            <div className="card mb-3">
                <div className="card-body tab-content">
                    <div className="tab-pane fade tab-pane-3 show active" id="nav-Preview3">
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-primary">
                            Primary
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow bg-primary">
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-secondary">
                            Secondary
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow ">
                                <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-success">
                            Success
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow bg-success">
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-info">
                            Info
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow bg-info">
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-warning">
                            Warning
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow bg-warning">
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="d-inline-flex m-1">
                            <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-danger">
                            Danger
                            </Dropdown.Toggle>

                            <Dropdown.Menu as="ul" className="border-0 shadow bg-danger">
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="tab-pane fade tab-pane-3" id="nav-HTML3">
                    <SyntaxHighlighter language="javascript" className="mt-2 language-html py-2 px-2"  style={a11yLight}>
                                {`<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-primary">
    Primary
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow bg-primary">
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-secondary">
    Secondary
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow ">
        <li><Link className="dropdown-item py-2 rounded" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-success">
    Success
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow bg-success">
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-info">
    Info
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow bg-info">
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-warning">
    Warning
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow bg-warning">
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>
<Dropdown className="d-inline-flex m-1">
    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className="btn btn-danger">
    Danger
    </Dropdown.Toggle>

    <Dropdown.Menu as="ul" className="border-0 shadow bg-danger">
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!"  onClick={(e)=>{e.preventDefault();}}>Action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Another action</Link></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Something else here</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item py-2 rounded text-light" to="#!" onClick={(e)=>{e.preventDefault();}}>Separated link</Link></li>
    </Dropdown.Menu>
</Dropdown>`}
                    </SyntaxHighlighter>
                    </div>
                </div>
            </div>

        </div>
    );
  }

export default SingleButtonDropDown;