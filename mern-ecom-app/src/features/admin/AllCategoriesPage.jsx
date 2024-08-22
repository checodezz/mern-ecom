import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { deleteCategory, fetchAllCategories } from "../categories/categorySlice";
import CategoryForm from "../categories/CategoryForm";
import { MdModeEditOutline, MdDelete } from 'react-icons/md'


const AllCategoriesPage = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const { isLoading } = useSelector((state) => state.categories);


    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [dispatch])

    const handleEditClick = (category) => {
        setCategoryToEdit(category)
    }

    const handleDeleteClick = (categoryId) => {
        dispatch(deleteCategory(categoryId)).then(() => {
            dispatch(fetchAllCategories())
        })
    }


    return <div>
        <div className="bg-white py-2 px-4 d-flex justify-content-between align-items-center">
            <h2 className="font-bold fs-3">All Categories</h2>
            <button className="btn btn-outline-danger fs-5 px-3 rounded-pill" data-bs-toggle="modal"
                data-bs-target="#allCategories" onClick={() => handleEditClick(null)}
            >Add Category</button>
        </div>

        {isLoading && <LoadingSpinner />}
        {/* all categories */}
        <div className=" my-4 overflow-y-scroll" style={{ height: 'calc(100vh - 190px)' }} >
            <ol className="list-group list-group-numbered">
                {
                    categories?.map((category) => (
                        <li className="list-group-item d-flex justify-content-between align-items-start" key={category._id}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{category.label}
                                </div>
                                <ul className="list-group list-group-vertical my-2">
                                    {category.subCategories?.map(subCategory => (
                                        <li className="list-group-item list-group-item-light" key={subCategory._id}>{subCategory.label}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="d-flex">
                                <div className="badge btn mx-3 mt-2 fs-5 text-bg-primary rounded-pill position-relative " data-bs-toggle="modal"
                                    data-bs-target="#allCategories" onClick={() => handleEditClick(category)}>
                                    <MdModeEditOutline size={25} />
                                    <span className="position-absolute top-0 start-100 translate-middle  badge rounded-pill bg-pink">
                                        {category.subCategories.length}
                                    </span>
                                </div>
                                <div
                                    className='text-white center-content px-2 bg-danger rounded-circle'
                                    onClick={() => handleDeleteClick(category._id) }
                                >
                                    <MdDelete size={25} />
                                </div>

                            </div>

                        </li>
                    ))
                }
            </ol>
        </div>

        {/* upload product component */}
        {categoryToEdit !== null ? (
            <CategoryForm
                categoryToEdit={categoryToEdit}
            />
        ) : <CategoryForm />}

    </div>;
}

export default AllCategoriesPage