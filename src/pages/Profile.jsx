import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(JSON.parse(localStorage.getItem("user")).id);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [userFormData, setUserFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please log in again.");
      navigate("/login");
      return;
    }

    // try {
      const response = await axios.get(`http://localhost:4040/api/auth?id=${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = response.data;
      console.log(response);
      
      setUserFormData({
        firstname: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: "",
      });
    // } catch (error) {
    //   setError("Error fetching user data. Please try again.");
    //   toast.error("Error fetching user data.");
    // }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, id, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please log in again.");
      navigate("/login");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/user/${id}`, userFormData, {
        headers: {
          'token': token,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile. Please try again.");
      toast.error("Error updating profile.");
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
          <form onSubmit={updateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.lastname}
                  onChange={(e) => setUserFormData({ ...userFormData, lastname: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                />
              </div>

              {/* <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                />
              </div> */}

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.address}
                  onChange={(e) => setUserFormData({ ...userFormData, address: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] bg-white"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 rounded-lg bg-[rgb(147,197,114)] hover:bg-[#7CB260] text-white text-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              Update Profile
            </button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Profile;
