// Import useNavigate
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, updateUserRole } from "../actions/userAction";





const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    dispatch(deleteUser(userId));
    alert("User deleted successfully!");
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole(userId, newRole)); // Dispatch action to update user role
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Users List</h2>

      {loading && <p className="text-center text-blue-500">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && <p className="text-center text-yellow-500">No users found.</p>}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">User ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                  <select
                      value={user.isAdmin ? "admin" : "user"}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="p-1 rounded bg-gray-100 border"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;



