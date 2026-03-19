import React from "react";
import { Link } from "react-router-dom";

function NavbarUI (props) {
    const {activeLayout} = props;
    return(
        <div className={activeLayout==="HeadertopMenuContainer" || activeLayout==="HeaderSubmenuContainer" || activeLayout === "HeaderSubmenuOverlayContainer"?"container":"container-fluid"}>
            <div className="col-12">
                <div className="card p-4 bd-content">
                    <h2 id="how-it-works">How it works</h2>
                    <p>Here’s what you need to know before getting started with the navbar:</p>
                    <div className="alert alert-danger" role="alert">
                        <strong>Navbar</strong> for more bootstrao components <Link to="https://v5.getbootstrap.com/docs/5.0/components/navbar/"  rel="noopener noreferrer">Bootstrap Navbar documentation <i className="fa fa-external-link"></i></Link>
                    </div>
                    <ul>
                        <li>Navbars require a wrapping <code>.navbar</code> with <code>.navbar-expand{`{-sm|-md|-lg|-xl|-xxl}`}</code> for responsive collapsing and <Link to="#color-schemes">color scheme</Link> classes.</li>
                        <li>Navbars and their contents are fluid by default. Change the <Link to="#containers">container</Link> to limit their horizontal width in different ways.</li>
                        <li>Use our <Link to="https://v5.getbootstrap.com/docs/5.0/utilities/spacing/">spacing</Link> and <Link to="https://v5.getbootstrap.com/docs/5.0/utilities/flex/">flex</Link> utility classes for controlling spacing and alignment within navbars.</li>
                        <li>Navbars are responsive by default, but you can easily modify them to change that. Responsive behavior depends on our Collapse JavaScript plugin.</li>
                        <li>Ensure accessibility by using a <code>&lt;nav&gt;</code> element or, if using a more generic element such as a <code>&lt;div&gt;</code>, add a <code>role="navigation"</code> to every navbar to explicitly identify it as a landmark region for users of assistive technologies.</li>
                        <li>Indicate the current item by using <code>aria-current="page"</code> for the current page or <code>aria-current="true"</code> for the current item in a set.</li>
                    </ul>
                    <div className="card card-callout p-3">
                        <span>The animation effect of this component is dependent on the <code>prefers-reduced-motion</code> media query. See the <Link to="https://v5.getbootstrap.com/docs/5.0/getting-started/accessibility/#reduced-motion">reduced motion section of our accessibility documentation</Link>.</span>
                    </div>
                    <p>Read on for an example and list of supported sub-components.</p>
                </div>
            </div>
        </div>
    )
  }

export default NavbarUI;