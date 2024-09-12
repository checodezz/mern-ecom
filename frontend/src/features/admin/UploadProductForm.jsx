import React, { useEffect, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import uploadImage from "../../utils/uploadImage";
import FullSizeImageViewer from "../../components/FullSizeImageViewer";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct, resetState } from "./adminSlice";
import { toast } from "react-toastify";
import { fetchAllProducts } from "../products/productSlice";
import { fetchAllCategories } from "../categories/categorySlice";

const INITIAL_FORM_DATA = {
  name: "",
  brandName: "",
  category: "",
  subCategory: "",
  images: [],
  description: "",
  price: "",
  sellingPrice: "",
  rating: null,
};

const UploadProductForm = ({ productToEdit, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [fullSizeImageUrl, setFullSizeImageUrl] = useState("");
  const [openFullSizeImageViewer, setOpenFullSizeImageViewer] = useState(false);
  const { message, isSuccess, isError } = useSelector((state) => state.admin);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit?.name,
        brandName: productToEdit?.brandName,
        category: productToEdit?.category,
        subCategory: productToEdit?.subCategory,
        images: productToEdit?.images,
        description: productToEdit?.description,
        price: productToEdit?.price,
        sellingPrice: productToEdit?.sellingPrice,
        rating: productToEdit?.rating,
      });
    } else if (productToEdit === undefined) {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [productToEdit]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const selectedCategory = categories?.find(
    (category) => category.value === formData.category
  );

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const imagesAfterDelete = [...formData.images];
    imagesAfterDelete.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      images: [...imagesAfterDelete],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (productToEdit) {
      const dataToUpdate = { _id: productToEdit?._id, ...formData };
      dispatch(editProduct(dataToUpdate));
    } else {
      dispatch(addProduct(formData));
    }
    setFormData(INITIAL_FORM_DATA);
    onClose;
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
    dispatch(resetState());
    dispatch(fetchAllProducts());
  }, [dispatch, message, isSuccess, isError]);

  return (
    <div
      className="modal fade w-100"
      id="allProducts"
      tabIndex="-1"
      aria-labelledby="uploadProductData"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-scrollable"
        data-bs-config={{ backdrop: true }}
      >
        <div className="modal-content">
          <div className="modal-header bg-danger-subtle">
            <h1 className="modal-title fs-4" id="uploadProductData">
              {productToEdit ? "Edit Product" : "Upload Product"}
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
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleOnChange}
                  placeholder="Enter Product Name"
                  required
                />
              </div>

              {/* Brand Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="brandName">
                  Brand Name:
                </label>
                <input
                  type="text"
                  id="brandName"
                  className="form-control"
                  name="brandName"
                  value={formData.brandName || ""}
                  onChange={handleOnChange}
                  placeholder="Enter Product Brand Name"
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="mb-3">
                <label className="form-label" htmlFor="category">
                  Select Category:
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category || ""}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Selection */}
              {selectedCategory && (
                <div className="mb-3">
                  <label className="form-label" htmlFor="subCategory">
                    Select Sub Category:
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    className="form-select"
                    value={formData.subCategory || ""}
                    onChange={handleOnChange}
                  >
                    <option value="">Select sub category</option>
                    {selectedCategory.subCategories.map(
                      (subCategory, index) => (
                        <option key={index} value={subCategory.value}>
                          {subCategory.label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {/* Image Upload */}
              <div className="mb-3 d-flex flex-column ">
                <label className="form-label" htmlFor="imageUrl">
                  Image URL:
                </label>

                <label htmlFor="uploadImageInput">
                  <div
                    className="cursor-pointer border rounded form-control center-content"
                    style={{ height: "150px" }}
                  >
                    <div className="text-secondary">
                      <span className="center-content">
                        <FaCloudArrowUp size={40} />
                      </span>
                      <p className="small center-content pt-2">
                        Upload Product Image
                      </p>
                      <input
                        type="file"
                        id="uploadImageInput"
                        name="images"
                        className="d-none"
                        onChange={handleUploadProduct}
                      />
                    </div>
                  </div>
                </label>

                <div className="p-2 pb-0">
                  {formData?.images.length > 0 ? (
                    <div className="d-flex align-items-center g-2">
                      {formData?.images.map((el, index) => (
                        <div className="position-relative" key={index}>
                          <img
                            src={el}
                            alt={`${el}`}
                            className="me-2 cursor-pointer"
                            width={80}
                            height={80}
                            onClick={() => {
                              setFullSizeImageUrl(el);
                              setOpenFullSizeImageViewer(true);
                            }}
                          />
                          <div
                            className="position-absolute bottom-0 text-white bg-danger rounded-circle px-1 pb-1 delete-icon"
                            style={{ right: "8px" }}
                            onClick={() => handleDeleteProductImage(index)}
                          >
                            <MdDelete size={20} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-danger small pb-0 mb-0">
                      * Please upload product image
                    </p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  name="price"
                  min="0"
                  value={formData.price || ""}
                  onChange={handleOnChange}
                  placeholder="Enter Product Price"
                  required
                />
              </div>

              {/* Selling Price */}
              <div className="mb-3">
                <label className="form-label" htmlFor="sellingPrice">
                  Selling Price :
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  className="form-control"
                  name="sellingPrice"
                  min="0"
                  value={formData.sellingPrice || ""}
                  onChange={handleOnChange}
                  placeholder="Enter Selling Price"
                  required
                />
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label className="form-label" htmlFor="rating">
                  Rating:
                </label>
                <input
                  type="number"
                  id="rating"
                  className="form-control"
                  name="rating"
                  value={formData.rating || ""}
                  onChange={handleOnChange}
                  placeholder="Enter Product Rating"
                  min="0"
                  max="5"
                  step={0.1}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description:
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleOnChange}
                  rows={4}
                  placeholder="Enter Product Description"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center mt-4 mb-2">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  {productToEdit ? "Edit Product" : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Full-Size Image Viewer */}
      {fullSizeImageUrl && openFullSizeImageViewer && (
        <FullSizeImageViewer
          imageUrl={fullSizeImageUrl}
          onClose={() => setOpenFullSizeImageViewer(false)}
        />
      )}
    </div>
  );
};

export default UploadProductForm;
