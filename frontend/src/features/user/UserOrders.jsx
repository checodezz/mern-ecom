import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllOrders } from "../orders/orderSlice";
import { displayINRCurrency } from "../../utils/helpers";
import {
  addItemToCart,
  cartResetState,
  getCountCartItems,
} from "../cart/cartSlice";
import { BsArrowRepeat } from "react-icons/bs";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, totalOrders } = useSelector((state) => state?.orders);

  const { isSuccess, isError, message } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
    dispatch(cartResetState());
  }, [dispatch, isSuccess, isError, message]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="container-fluid pe-5 ">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom">
          <h5 className="fw-bold mb-0">All Orders</h5>
          <p className="mb-0">from anytime</p>
        </div>

        {totalOrders === 0 && (
          <div className="card my-4 bg-white p-4 text-center">
            <p className="fw-semibold mb-0">
              It looks like you haven't placed any orders yet.{" "}
            </p>
            <p className="fw-bold mb-0">
              <Link to="/" className="text-decoration-none text-teal">
                Start shopping now
              </Link>{" "}
              and be the first to place an order!
            </p>
          </div>
        )}

        {totalOrders !== 0 && (
          <div className="row bg-white my-4">
            {orders?.map((order) => {
              const products = order?.products;
              return (
                <div className="col-12 mb-4" key={order._id}>
                  <div className="card">
                    <div className="card-header">
                      <div className="d-lg-flex d-grid gap-2 justify-content-between align-items-center">
                        <div className="d-lg-flex gap-3 d-grid  small">
                          <div className="d-flex flex-column ">
                            <p className="mb-0">ORDER PLACED</p>
                            <p className="mb-0">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="d-flex flex-column ">
                            <p className="mb-0">TOTAL</p>
                            <p className="mb-0">
                              {displayINRCurrency(order.amount)}
                            </p>
                          </div>
                          <div className="d-flex flex-column ">
                            <p className="mb-0">SHIP TO</p>
                            <div className="dropdown">
                              <button
                                className="btn m-0 p-0 text-teal fs-6 dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {order?.name}
                              </button>
                              <div className="dropdown-menu">
                                <div className="dropdown-item">
                                  {order?.address}, {order?.pincode}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" d-flex flex-column">
                          <p className="mb-0">ORDER</p>
                          <p className="mb-0">#{order._id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {products?.map((product) => {
                        const item = product?.productId;
                        return (
                          <div className="row gap-3 my-3" key={item?._id}>
                            <div
                              className="col-md-3 d-flex justify-content-center align-items-center"
                              style={{ width: "5rem", height: "5rem" }}
                            >
                              <Link to={`/products/${item?._id}`}>
                                <div
                                  className="image-container m-4"
                                  style={{
                                    width: "5rem",
                                    height: "5rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    className="img-fluid product-image"
                                    src={item?.images[0]}
                                    alt={item?.name}
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                    }}
                                  />
                                </div>
                              </Link>
                            </div>
                            <div className="col-md-4">
                              <div>
                                <p className="text-teal mb-0">{item?.name}</p>
                                <p className="small text-secondary mb-0">
                                  Sold by: {item?.brandName}
                                </p>
                                <p>{displayINRCurrency(item?.sellingPrice)}</p>
                              </div>
                            </div>
                            <div className="col ">
                              <div className="d-md-flex justify-content-end align-items-center d-grid gap-3">
                                <button
                                  onClick={() => {
                                    dispatch(addItemToCart(item?._id)).then(
                                      () => {
                                        dispatch(getCountCartItems());
                                      }
                                    );
                                  }}
                                  className="d-flex btn ms-0 px-4 btn-warning rounded-pill"
                                >
                                  <div className="me-2">
                                    <BsArrowRepeat size={20} />
                                  </div>{" "}
                                  <p className="mb-0">Buy it again</p>
                                </button>
                                <Link
                                  to={`/products/details/${item?._id}`}
                                  className="btn btn-outline-dark rounded-pill"
                                >
                                  View product details
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
