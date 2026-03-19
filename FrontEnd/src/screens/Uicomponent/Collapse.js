import React from "react";
import CollapseTile from '../../components/Uicomponent/CollapseTile';
import { Link } from "react-router-dom";


function Collapse () {
    return(
        <div className="container">
            <div className="col-12">
                <div className="row justify-content-between">
                    <CollapseTile />
                    <div className="col-lg-3 col-sm-12 d-none d-sm-block">
                            <div className="sticky-lg-top card p-4">
                                <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
                                <nav>
                                    <ul>
                                        <li><Link to="#how-it-works">How it works</Link></li>
                                        <li><Link to="#example">Example</Link></li>
                                        <li><Link to="#multiple-targets">Multiple targets</Link></li>
                                        <li><Link to="#accordion-example">Accordion example</Link></li>
                                        <li><Link to="#accessibility">Accessibility</Link></li>
                                        <li><Link to="#usage">Usage</Link>
                                            <ul>
                                                <li><Link to="#via-data-attributes">Via data attributes</Link></li>
                                                <li><Link to="#via-javascript">Via JavaScript</Link></li>
                                                <li><Link to="#options">Options</Link></li>
                                                <li><Link to="#methods">Methods</Link></li>
                                                <li><Link to="#events">Events</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
  }
  
export default Collapse;