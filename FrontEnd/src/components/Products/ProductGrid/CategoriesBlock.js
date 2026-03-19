import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../Redux/Actions/CategoryActions';

function Categoriesblock({ onFilter }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);

    // Track expanded state for dynamic categories by their ID
    const [expanded, setExpanded] = useState({});

    // 1. Get categories from Redux
    const { list } = useSelector((state) => state.categories || { list: [] });

    useEffect(() => {
        if (!list || list.length === 0) {
            dispatch(getCategories());
        }
    }, [dispatch, list]);

    // Toggle sub-category visibility
    const toggleSub = (e, id) => {
        e.preventDefault();
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter only "Root" categories (those without parents)
    const rootCategories = list.filter(cat => !cat.parent);

    return (
        <div className="categories">
            <div className="filter-title">
                <Link
                    className="title"
                    to="#!"
                    role="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                >
                    Categories
                </Link>
            </div>

            <div className={`collapse ${open ? 'show' : ''}`} id="category">
                <div className="filter-search">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Search" className="form-control" />
                        <button type="button"><i className="icofont-search"></i></button>
                    </form>
                </div>

                <div className="filter-category">
                    <ul className="category-list">
                        {rootCategories.map((cat) => {
                            const hasChildren = list.some(sub => sub.parent?.id === cat.id);
                            const isExpanded = !!expanded[cat.id];

                            return (
                                <li key={cat.id}>
                                    <Link
                                        to="#!"
                                        className={isExpanded ? '' : 'collapsed'}
                                        onClick={(e) => toggleSub(e, cat.id)}
                                        aria-expanded={isExpanded}
                                    >
                                        {cat.name}
                                    </Link>

                                    {hasChildren && (
                                        <ul className={`sub-category collapse ${isExpanded ? 'show' : ""}`}>
                                            {list
                                                .filter(sub => sub.parent?.id === cat.id)
                                                .map(sub => (
                                                    <li key={sub.id}>
                                                        <Link
                                                            to="#!"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                onFilter(sub.id);
                                                            }}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Categoriesblock;