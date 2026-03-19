import React from "react";
import CarouselUITile from '../../components/Uicomponent/CarouselUITile';
import { Link } from "react-router-dom";


function Carousel (){
    return(
        <div className="container">
            <div className="col-12">
                <div className="row justify-content-between">
                    <CarouselUITile />
                    <div className="col-lg-3 col-sm-12 d-none d-sm-block">
                        <div className="sticky-lg-top card p-4">
                            <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
                            <nav>
                                <ul>
                                    <li><Link to="#how-it-works">How it works</Link></li>
                                    <li><Link to="#example">Example</Link>
                                        <ul>
                                            <li><Link to="#slides-only">Slides only</Link></li>
                                            <li><Link to="#with-controls">With controls</Link></li>
                                            <li><Link to="#with-indicators">With indicators</Link></li>
                                            <li><Link to="#with-captions">With captions</Link></li>
                                            <li><Link to="#crossfade">Crossfade</Link></li>
                                            <li><Link to="#individual-carousel-item-interval">Individual <code>.carousel-item</code> interval</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#dark-variant">Dark variant</Link></li>
                                    <li><Link to="#usage">Usage</Link>
                                        <ul>
                                            <li><Link to="#via-data-attributes">Via data attributes</Link></li>
                                            <li><Link to="#via-javascript">Via JavaScript</Link></li>
                                            <li><Link to="#options">Options</Link></li>
                                            <li><Link to="#methods">Methods</Link></li>
                                            <li><Link to="#events">Events</Link></li>
                                            <li><Link to="#change-transition-duration">Change transition duration</Link></li>
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


export default Carousel;