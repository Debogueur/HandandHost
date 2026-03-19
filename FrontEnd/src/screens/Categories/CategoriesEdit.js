import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader1 from '../../components/common/PageHeader1';
import BasicInformation from '../../components/Categories/CategoriesEdit/BasicInformation';
import Categories from '../../components/Categories/CategoriesEdit/Categories';
import { getCategories, updateCategory, getCategoryDetails } from '../../Redux/Actions/CategoryActions';

function CategoriesEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const categoryId = location.state?.categoryId;

    // Get list (for dropdown) and selectedCategory (for defaults) from Redux
    const { list, selectedCategory, loading } = useSelector((state) => state.categories);

    const [category, setCategory] = useState({
        name: '',
        description: '',
        parentId: null
    });

    // 1. Initial Load: Fetch categories list and specific category details
    useEffect(() => {
        if (!categoryId) {
            navigate('/categories-list');
            return;
        }
        dispatch(getCategories());
        dispatch(getCategoryDetails(categoryId));
    }, [dispatch, categoryId, navigate]);

    // 2. Map Redux selectedCategory to local state once it's loaded
    useEffect(() => {
        if (selectedCategory && selectedCategory.id === parseInt(categoryId)) {
            setCategory({
                name: selectedCategory.name || '',
                description: selectedCategory.description || '',
                parentId: selectedCategory.parent ? selectedCategory.parent.id : null
            });
        }
    }, [selectedCategory, categoryId]);

    const handleUpdate = async () => {
        if (!category.name) return alert("Name is required");

        const payload = {
            name: category.name,
            description: category.description,
            parentId: category.parentId ? parseInt(category.parentId) : null
        };

        const result = await dispatch(updateCategory(categoryId, payload));

        if (result && !result.error) {
            alert("Category updated successfully!");
            navigate('/categories-list');
        }
    };

    if (loading && !category.name) return <div className="p-5 text-center">Loading Data...</div>;

    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Edit Category'
                button={true}
                onClick={handleUpdate}
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
                                categories={list.filter(item => item.id !== parseInt(categoryId))}
                                selectedParent={category.parentId}
                                onParentChange={(val) => setCategory({
                                    ...category,
                                    parentId: val
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesEdit;