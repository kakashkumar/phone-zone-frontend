import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function UsersList() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user"))?._id;
  const userList = useSelector((state) => {
    return state?.user?.userListData;
  });

  const filteredUserList = userList?.filter((x) => x._id != id);
  const handleUserDetails = (id) => {
    navigate(`/users/userDetail/${id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs  text-black text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <p>Users</p>
          </li>
        </ul>
      </div>
      <h2 className="text-2xl text-black flex font-bold gap-4 my-3">
        Users List
      </h2>
      <div className="overflow-x-auto text-black">
        <table className="table text-black">
          {/* head */}
          <thead className="text-xl text-black">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredUserList?.map((user) => {
              return (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {user?.firstName} {user?.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.userRolesDetails?.roleName}</td>
                  <td>
                    <button
                      className="badge badge-ghost badge-sm btn btn-ghost btn-xs"
                      onClick={() => handleUserDetails(user._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
