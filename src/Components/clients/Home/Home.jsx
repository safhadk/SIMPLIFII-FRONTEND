import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClientLogout } from '../../../Redux/ClientAuth';
import { Toast } from '../../../Helper/Toast';

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(ClientLogout());
    Toast.fire({
      icon: "success",
      title: "logout Successfull",
    });
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-700 mb-8">Explore and discover amazing things!</p>
      <button className="btn btn-warning me-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
