import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Home from "../Pages/Clients/Home";
import UserLogin from "../Pages/Clients/Login";
function UserRoute() {
    const IsAuth = useSelector((state) => state.Client.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAuth? <Home /> : <UserLogin />} />
                <Route path="/login" element={IsAuth? <Home /> : <UserLogin />} />
            </Routes>
        </div>
    );
}

export default UserRoute;
