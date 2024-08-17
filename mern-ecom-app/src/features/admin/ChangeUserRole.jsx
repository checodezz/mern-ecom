import { ROLE } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./adminSlice";

const ChangeUserRole = ({ name, email, role }) => {
  const [changeRole, setChangeRole] = useState(role);
  const dispatch = useDispatch();

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="staticBackdropLabel">
              Change User Role
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <div className="d-flex align-items-center justify-content-start">
              <p className="p-0 m-0">Role:</p>
              <select
                className="form-select pt-0 mt-0 ms-2"
                style={{ width: "300px" }}
                onChange={(e) => setChangeRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {Object.values(ROLE).map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => dispatch(updateUser())}
            >
              Change Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
