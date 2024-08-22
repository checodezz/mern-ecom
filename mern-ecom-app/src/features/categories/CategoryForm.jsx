import React, { useState, useEffect } from 'react';
import { addCategory, editCategory, fetchAllCategories, resetState } from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const INITIAL_FORM_DATA = {
    label: '',
    value: '',
    subCategories: [],
}

const CategoryForm = ({ categoryToEdit }) => {
    const dispatch = useDispatch();
    const { message, isSuccess, isError } = useSelector((state) => state.categories);

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [newSubCategory, setNewSubCategory] = useState({ label: '', value: '' });

    useEffect(() => {
        if (categoryToEdit) {
            setFormData({
                label: categoryToEdit?.label,
                value: categoryToEdit?.value,
                subCategories: categoryToEdit?.subCategories,
            });
        } else if (categoryToEdit === undefined) {
            setFormData(INITIAL_FORM_DATA)
        }
    }, [categoryToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubCategoryChange = (e) => {
        const { name, value } = e.target;
        setNewSubCategory({
            ...newSubCategory,
            [name]: value,
        });
    };

    const addSubCategory = () => {
        setFormData({
            ...formData,
            subCategories: [...formData.subCategories, newSubCategory],
        });
        setNewSubCategory({ label: '', value: '' });
    };

    const removeSubCategory = (index) => {
        const updatedSubCategories = formData.subCategories.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            subCategories: updatedSubCategories,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryToEdit) {
            const dataToUpdate = ({ _id: categoryToEdit?._id, ...formData })
            dispatch(editCategory(dataToUpdate)).then(() => {
                dispatch(fetchAllCategories())
            })
        } else {
            dispatch(addCategory(formData))
        }
        setFormData(INITIAL_FORM_DATA)
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(message)
        } else if (isError) {
            toast.error(message)
        }
        dispatch(resetState())
    }, [dispatch, message, isSuccess, isError])


    return (
        <div
            className="modal fade w-100"
            id="allCategories"
            tabIndex="-1"
            aria-labelledby="uploadCategoryData"
            aria-hidden="true"

        >
            <div className="modal-dialog modal-lg modal-dialog-scrollable" data-bs-config={
                { backdrop: true }} >
                <div className="modal-content">
                    <div className="modal-header bg-danger-subtle">
                        <h1 className="modal-title fs-4" id="uploadCategoryData">
                            {categoryToEdit ? "Update Category" : "Add Category"}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">

                        <form onSubmit={handleSubmit}>
                            {/* Category Label */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="label">Category Label:</label>
                                <input
                                    type="text"
                                    id="label"
                                    name="label"
                                    className="form-control"
                                    value={formData.label}
                                    onChange={handleInputChange}
                                    placeholder="Enter category label"
                                    required
                                />
                            </div>

                            {/* Category Value */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="value">Category Value:</label>
                                <input
                                    type="text"
                                    id="value"
                                    name="value"
                                    className="form-control"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    placeholder="Enter category value"
                                    required
                                />
                            </div>

                            {/* Subcategories */}
                            <div className="mb-3">
                                <label className="form-label">Subcategories:</label>
                                <ul className="list-group mb-2">
                                    {formData.subCategories.map((subCategory, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            {subCategory.label} ({subCategory.value})
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeSubCategory(index)}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="label"
                                        value={newSubCategory.label}
                                        onChange={handleSubCategoryChange}
                                        placeholder="Subcategory label"
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="value"
                                        value={newSubCategory.value}
                                        onChange={handleSubCategoryChange}
                                        placeholder="Subcategory value"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={addSubCategory}
                                        disabled={!newSubCategory.label || !newSubCategory.value}
                                    >
                                        Add Subcategory
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"
                                >
                                    {categoryToEdit ? 'Update Category' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default CategoryForm;
