import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader1 from '../../components/common/PageHeader1';
import BasicInformation from '../../components/Categories/CategoriesAdd/BasicInformation';
import Categories from '../../components/Categories/CategoriesAdd/Categories';
import { getCategories, createCategory } from '../../Redux/Actions/CategoryActions';

function CategoriesAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 1. Get categories for the parent selection dropdown
    const { list } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // 2. Local state matching your TypeORM Entity columns
    const [category, setCategory] = useState({
        name: '',
        description: '',
        parentId: null
    });

    // 3. Updated Save Logic using Redux
    const handleSave = async () => {
        if (!category.name) {
            alert("Please enter a category name.");
            return;
        }

        // Mapping to TypeORM Entity structure
        const payload = {
            name: category.name,
            description: category.description,
            parentId: category.parentId ? parseInt(category.parentId) : null
        };

        // Dispatch the action (Make sure createCategory is defined in your Actions)
        const result = await dispatch(createCategory(payload));

        if (result && !result.error) {
            alert("Category saved successfully!");
            navigate('/categories-list');
        }
    };

    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Add New Category'
                button={true}
                onClick={handleSave} // This connects to the 'Save' button in PageHeader1
            />

            <div className="row g-3">
                <div className="col-xl-8 col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <BasicInformation
                                name={category.name}
                                description={category.description}
                                onChange={(e) => setCategory({
                                    ...category,
                                    [e.target.name]: e.target.value
                                })}
                                onDescriptionChange={(newHtml) => setCategory({
                                    ...category,
                                    description: newHtml
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4">
                    <div className="card mb-3">
                        <div className="card-header py-3 bg-transparent border-bottom-0">
                            <h6 className="m-0 fw-bold">Hierarchy (Tree)</h6>
                        </div>
                        <div className="card-body">
                            <Categories
                                categories={list}
                                selectedParent={category.parentId}
                                onParentChange={(id) => setCategory({
                                    ...category,
                                    parentId: id
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesAdd;