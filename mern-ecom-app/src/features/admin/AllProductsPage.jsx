import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../products/productSlice";
import AdminProductDisplayCard from "./AdminProductDisplayCard";
import UploadProductForm from "./UploadProductForm";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [productToEdit, setProductToEdit] = useState(null);
  const { isLoading } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  const handleEditClick = (product) => {
    setProductToEdit(product)
  }

  const handleClose = () => {
    setProductToEdit(null)
  }

  return <div>
    <div className="bg-white py-2 px-4 d-flex justify-content-between align-items-center">
      <h2 className="font-bold fs-3">All Products</h2>
      <button className="btn btn-outline-danger fs-5 px-3 rounded-pill" data-bs-toggle="modal"
        data-bs-target="#allProducts" onClick={() => handleEditClick(null)}
      >Upload Product</button>
    </div>

    {isLoading && <LoadingSpinner />}
    {/* all products */}
    <div className="row my-4  g-4 overflow-y-scroll" style={{ height: 'calc(100vh - 190px)' }} >
      {
        products?.map((product) => (
          <AdminProductDisplayCard product={product} key={product._id} onEdit={() => handleEditClick(product)} />

        ))
      }
    </div>

    {/* upload product component */}
    {productToEdit !== null ? (
      <UploadProductForm
        productToEdit={productToEdit}
        onClose={handleClose}
      />
    ) : <UploadProductForm />}

  </div>;
};

export default AllProducts;
