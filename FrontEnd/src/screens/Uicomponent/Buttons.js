import React from "react";
import ButtonsGroupTile from '../../components/Uicomponent/ButtonsGroupTile';
import ButtonsTile from '../../components/Uicomponent/ButtonsTile';
import { Link } from "react-router-dom";



function Buttons () {
   const tabEvent=(id)=>{
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab"+id).classList.add("active");

        document.getElementById("tab-pane1").classList.remove("active");
        document.getElementById("tab-pane1").classList.remove("show");
        document.getElementById("tab-pane2").classList.remove("active");
        document.getElementById("tab-pane2").classList.remove("show");
        document.getElementById("tab-pane"+id).classList.add("active");
        document.getElementById("tab-pane"+id).classList.add("show");
    }
    return(
        <div className="container">
            <div className="col-12">
                <div className="card mb-4 shadow-sm border-0">
                    <div className="card-body">
                        <ul className="nav nav-tabs tab-body-header rounded d-inline-flex" role="tablist">
                            <li className="nav-item"><Link className="nav-link active" id="tab1" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(1) }}>Buttons</Link></li>
                            <li className="nav-item"><Link className="nav-link" id="tab2" to="#!" onClick={(e)=>{e.preventDefault(); tabEvent(2)  }}>Buttons Groups</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content">
                    <div id="tab-pane1" className="tab-pane fade active show">
                        <div className="row justify-content-between">
                            <ButtonsTile />
                                <div className="col-lg-3 col-sm-12 d-none d-sm-block">
                                    <div className="sticky-lg-top">
                                        <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
                                        <nav>
                                            <ul>
                                                <li><Link to="#examples">Examples</Link></li>
                                                <li><Link to="#disable-text-wrapping">Disable text wrapping</Link></li>
                                                <li><Link to="#button-tags">Button tags</Link></li>
                                                <li><Link to="#outline-buttons">Outline buttons</Link></li>
                                                <li><Link to="#sizes">Sizes</Link></li>
                                                <li><Link to="#disabled-state">Disabled state</Link></li>
                                                <li><Link to="#button-plugin">Button plugin</Link>
                                                    <ul>
                                                        <li><Link to="#toggle-states">Toggle states</Link></li>
                                                        <li><Link to="#methods">Methods</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div id="tab-pane2" className="tab-pane fade">
                        <div className="row justify-content-between">
                            <ButtonsGroupTile />
                            <div className="col-lg-3 col-sm-12 d-none d-sm-block">
                                    <div className="sticky-lg-top">
                                        <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
                                        <nav>
                                            <ul>
                                                <li><Link to="#basic-example">Basic example</Link></li>
                                                <li><Link to="#mixed-styles">Mixed styles</Link></li>
                                                <li><Link to="#outlined-styles">Outlined styles</Link></li>
                                                <li><Link to="#checkbox-and-radio-button-groups">Checkbox and radio button groups</Link></li>
                                                <li><Link to="#button-toolbar">Button toolbar</Link></li>
                                                <li><Link to="#sizing">Sizing</Link></li>
                                                <li><Link to="#nesting">Nesting</Link></li>
                                                <li><Link to="#vertical-variation">Vertical variation</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

export default Buttons;