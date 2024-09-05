import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container-fluid pe-5 ">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom">
          <h5 className="fw-bold mb-0">All Orders</h5>
          <p className="mb-0">from anytime</p>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
