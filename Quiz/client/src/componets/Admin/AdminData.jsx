import React, { useState } from "react";
import { useEffect } from "react";

import { Link, Navigate, Outlet } from "react-router-dom";

function AdminData() {
     const [first, setFirst] = useState(true);
      useEffect(()=>{
        setFirst(false)
      },[])  

    return (
    <div>
    {  first && <Navigate to="quizAdmin" />}
      <nav className=" bg-gray-700  ">
        <div className="mx-auto  max-w-7xl">
          <ul className=" flex   justify-between items-center p-2  px-40">
            <li>
              <Link
                to="/"
                className="text-xl font-medium text-white hover:text-gray-300 transition duration-300"
              >
                Quiz Admin
              </Link>
            </li>
            <li>
              <Link
                to="quizAdmin"
                className="text-xl font-medium text-white hover:text-gray-300 transition duration-300"
              >
                AddMcq
              </Link>
            </li>
            <li>
              <Link
                to="userResult"
                className="text-xl font-medium text-white hover:text-gray-300 transition duration-300"
              >
                UserDetail
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1>Admin Data</h1>

      <Outlet />
    </div>
  );
}

export default AdminData;
