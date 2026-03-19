import React from 'react';
import { useSelector } from 'react-redux'; // Use hooks instead of connect
import { useLocation } from 'react-router-dom'; import PageHeader1 from '../../components/common/PageHeader1';
import Categories from '../../components/Products/ProductEdit/Categories';
import InventoryInfo from '../../components/Products/ProductEdit/InventoryInfo';
import PricingInfo from '../../components/Products/ProductEdit/PricingInfo';
import PublicaSchedule from '../../components/Products/ProductEdit/PublicaSchedule';
import Size from '../../components/Products/ProductEdit/Size';
import Tags from '../../components/Products/ProductEdit/Tags';
import VisibilityStatus from '../../components/Products/ProductEdit/VisibilityStatus';
import BasicInformation from '../../components/Products/ProductEdit/BasicInformation';
import ShippingCountries from '../../components/Products/ProductEdit/ShippingCountries';
import Images from '../../components/Products/ProductEdit/Images';
import CroppedImages from '../../components/Products/ProductEdit/CroppedImages';
   
function ProductEdit() {

    const location = useLocation();

    // Access the activeProduct from your Redux store
    // Adjust 'state.products.activeProduct' based on your actual reducer path
    const activeProduct = useSelector((state) => state.products.activeProduct);

    // Priority logic: Router State -> Redux State
    const product = location.state?.product || activeProduct;

    if (!product) {
        return (
            <div className="container-xxl">
                <div className="alert alert-warning">No product data found.</div>
            </div>
        );
    }

        return (
            <div className="container-xxl">
                <PageHeader1 pagetitle='Products Edit' button={true} />
                <div className="row g-3">
                    <div className="col-xl-4 col-lg-4">
                        <div className="sticky-lg-top">
                            <div className="card mb-3">
                                <PricingInfo product={product} />
                            </div>
                            <div className="card mb-3">
                                <VisibilityStatus product={product} />
                            </div>
                           
                            <div className="card mb-3">
                                <PublicaSchedule product={product} />
                            </div>
                            <div className="card mb-3">
                                <Tags />
                            </div>
                            <div className="card mb-3">
                                <Categories product={product} />
                            </div>
                            <div className="card">
                                <InventoryInfo product={product} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8">
                        <div className="card mb-3">
                            <BasicInformation product={product} />
                        </div>
                       
                        <div className="card mb-3">
                            <Images />
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    
}
export default ProductEdit;