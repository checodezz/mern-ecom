import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "./adminSlice";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "./ChangeUserRole";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.admin.allUsers);
  const { message, isError } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  return (
    <div className="table-responsive user-table">
      <table className="table table-bordered table-hover w-100 bg-white">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Created Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <button
                  className="bg-lightgreen p-2 rounded-circle btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setSelectedUser(user)}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChangeUserRole
        userId={selectedUser?._id}
        name={selectedUser?.name}
        email={selectedUser?.email}
        role={selectedUser?.role}
      />
    </div>
  );
};

export default AllUsers;
