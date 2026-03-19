import React from "react";
import CardsLyouts from '../../components/Uicomponent/CardsLyouts';
import { Link } from "react-router-dom";


function Cards() {
    return (
        <div className="container">
            <div className="col-12">
                <div className="row justify-content-between ">
                    <CardsLyouts />
                    <div className="col-lg-3 col-sm-12 d-none d-sm-block">
                        <div className="card p-4 sticky-lg-top">
                            <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
                            <nav>
                                <ul>
                                    <li><Link to="#about">About</Link></li>
                                    <li><Link to="#example">Example</Link></li>
                                    <li><Link to="#content-types">Content types</Link>
                                        <ul>
                                            <li><Link to="#body">Body</Link></li>
                                            <li><Link to="#titles-text-and-links">Titles, text, and links</Link></li>
                                            <li><Link to="#images">Images</Link></li>
                                            <li><Link to="#list-groups">List groups</Link></li>
                                            <li><Link to="#kitchen-sink">Kitchen sink</Link></li>
                                            <li><Link to="#header-and-footer">Header and footer</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#sizing">Sizing</Link>
                                        <ul>
                                            <li><Link to="#using-grid-markup">Using grid markup</Link></li>
                                            <li><Link to="#using-utilities">Using utilities</Link></li>
                                            <li><Link to="#using-custom-css">Using custom CSS</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#text-alignment">Text alignment</Link></li>
                                    <li><Link to="#navigation">Navigation</Link></li>
                                    <li><Link to="#images-1">Images</Link>
                                        <ul>
                                            <li><Link to="#image-caps">Image caps</Link></li>
                                            <li><Link to="#image-overlays">Image overlays</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#horizontal">Horizontal</Link></li>
                                    <li><Link to="#card-styles">Card styles</Link>
                                        <ul>
                                            <li><Link to="#background-and-color">Background and color</Link></li>
                                            <li><Link to="#border">Border</Link></li>
                                            <li><Link to="#mixins-utilities">Mixins utilities</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#card-layout">Card layout</Link>
                                        <ul>
                                            <li><Link to="#card-groups">Card groups</Link></li>
                                            <li><Link to="#grid-cards">Grid cards</Link></li>
                                            <li><Link to="#masonry">Masonry</Link></li>
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
export default Cards;