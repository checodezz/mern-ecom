import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SlSocialDropbox } from "react-icons/sl";
import { PiHandHeartLight } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiSolidUserRectangle } from "react-icons/bi";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.user);

  const dashboardData = [
    // {
    //   icon: SlSocialDropbox,
    //   heading: "Orders",
    //   para: "Check your order status",
    //   linkPath: "/my/orders",
    // },
    {
      icon: PiHandHeartLight,
      heading: "Wishlist",
      para: "All your curated product collection",
      linkPath: "/wishlist",
    },
    {
      icon: FiMapPin,
      heading: "Addresses",
      para: "Save addresses for a hassle-free checkout",
      linkPath: "/my/address",
    },
    {
      icon: LiaUserEditSolid,
      heading: "Profile Details",
      para: "Change your profile details",
      linkPath: "/my/profile/edit",
    },
  ];

  return (
    <div className="container-fluid pe-5 " id="userProfileCard">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom">
          <h5 className="fw-bold mb-0">Account</h5>
          <p className="small text-capitalize">{user?.name}</p>
        </div>
        {/* user profile with edit button  */}
        <div className="row align-items-center my-4">
          <div className="col-md-8 d-flex gap-4 align-items-center">
            <div className="flex-shrink-0">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt="User Profile Image"
                  className="img-fluid "
                  style={{ width: "8rem", height: "8rem" }}
                />
              ) : (
                <BiSolidUserRectangle size={120} />
              )}
            </div>
            <div>{user?.email}</div>
          </div>
          <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
            <Link
              className="btn btn-pink px-5 fw-semibold"
              to="/my/profile/edit"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {dashboardData?.map((el, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <Link to={el.linkPath} className="text-decoration-none">
                <div className="card h-100 py-4 rounded-0">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                    <div className="text-secondary mb-4">
                      <el.icon size={35} /> {/* Render the icon component */}
                    </div>
                    <h6 className="fw-bold mb-0">{el.heading}</h6>
                    <p className="small text-secondary">{el.para}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
