import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Categoriesblock() {
    const [open, setOpen] = useState(false);
    const [callopseGame, setCallopseGame] = useState(false);
    const [callopseBags, setCallopseBags] = useState(false);
    const [callposeFlower, setCallposeFlower] = useState(false);
    const [collapseWatch, setCollapseWatch] = useState(false);
    const [collapseAccessories, setCollapseAccessories] = useState(false);
    return (
        <div className="categories">
            <div className="filter-title">
                <Link className="title" to="#!" role="button" onClick={() => { setOpen(!open) }} aria-expanded={open}>Categories</Link>
            </div>
            <div className={`collapse ${open ? 'show' : ''}`} id="category">
                <div className="filter-search">
                    <form action="#">
                        <input type="text" placeholder="Search" className="form-control" />
                        <button><i className="lni lni-search-alt"></i></button>
                    </form>
                </div>
                <div className="filter-category">
                    <ul className="category-list">

                        <li>
                            <Link to="#!" className='callopsed'
                                onClick={() => { setCallopseGame(!callopseGame) }}
                                aria-expanded={callopseGame}
                                aria-controls="collapseOne">Game accessories</Link>

                            <ul id="collapseOne" className={`sub-category collapse ${callopseGame ? 'show' : ""}`}>
                                <li><Link to="#!">PlayStation 4</Link></li>
                                <li><Link to="#!">Oculus VR</Link></li>
                                <li><Link to="#!">Remote</Link></li>
                                <li><Link to="#!">Lighting Keyborad</Link></li>
                            </ul>
                        </li>
                        <li><Link className="collapsed" to="#!" onClick={() => { setCallopseBags(!callopseBags) }} aria-expanded={callopseBags} >Bags</Link>
                            <ul id="collapseTwo" className={`sub-category collapse ${callopseBags ? 'show' : ""}`}>
                                <li><Link to="#!">School Bags</Link></li>
                                <li><Link to="#!">Traveling Bags</Link></li>
                            </ul>
                        </li>
                        <li><Link className="collapsed" to="#!" onClick={() => { setCallposeFlower(!callposeFlower) }} aria-expanded={callposeFlower}>Flower Port</Link>
                            <ul id="collapseThree" className={`sub-category collapse ${callposeFlower ? 'show' : ''}`} >
                                <li><Link to="#!">Woodan Port</Link></li>
                                <li><Link to="#!">Pattern Port</Link></li>
                            </ul>
                        </li>
                        <li><Link className="collapsed" to="#!" onClick={() => { setCollapseWatch(!collapseWatch) }} aria-expanded={collapseWatch}>Watch</Link>
                            <ul id="collapseFour" className={`sub-category collapse ${collapseWatch ? 'show' : ''}`}>
                                <li><Link to="#!">Wall Clock</Link></li>
                                <li><Link to="#!">Smart Watch</Link></li>
                                <li><Link to="#!">Rado Watch</Link></li>
                                <li><Link to="#!">Fasttrack Watch</Link></li>
                                <li><Link to="#!">Noise Watch</Link></li>
                            </ul>
                        </li>
                        <li><Link className="collapsed" to="#!" onClick={() => { setCollapseAccessories(!collapseAccessories) }} aria-expanded={collapseAccessories}>Accessories</Link>
                            <ul id="collapseFive" className={`sub-category collapse ${collapseAccessories ? 'show' : ''}`}>
                                <li><Link to="#!">Note Diaries</Link></li>
                                <li><Link to="#!">Fold Diaries</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Categoriesblock