import React, { useState } from 'react';
import axios from '../../../../Axios/userAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClientLogin } from '../../../../Redux/ClientAuth';
import { Toast } from '../../../../Helper/Toast';

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState([])
  const [loading, setLoading] = useState('')

  const generateOTP = async () => {
    try {
      setLoading("Generating....")
      const { data } = await axios.post('/otp', { email });
      setLoading("")
      setSuccess(data.message);
      setError('');
    } catch (error) {
      setLoading("")
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading("Loading")
      const { data, status } = await axios.post('/login', { email, otp });
      setLoading("")
      setError('');
      if (status === 200) {
        dispatch(ClientLogin({ token: data.token }));
        Toast.fire({
          icon: "success",
          title: "Login Successfull",
        }).then(() => { navigate("/"); })
        setSuccess(data.message)
      } else {
        setError(data)
      }
    } catch (error) {
      setSuccess('');
      setError(error.response.data.message);
      setLoading("")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="w-96 bg-white rounded-lg shadow-md p-6 ">
        <h1 className="text-3xl mb-6 text-center text-gray-800 font-bold">LOGIN</h1>
        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 mb-4 text-center font-semibold">
            {success}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={generateOTP}
          >
            {loading === "Generating...." ? 'Generating....' : 'Generate OTP'}

          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          > {loading === "Loading" ? 'Loading....' : 'Login'}

          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
