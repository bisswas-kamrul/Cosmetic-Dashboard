import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import DarkModeToggle from "../Pages/DarkModeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [adminuser, setadminUser] = useState(null);
  const [showadminUser, setShowadminUser] = useState(false);

  const dropdownRef = useRef();

  // user fetch
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://cosmetic-backend-e6ia.onrender.com/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setadminUser(res.data.user);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchUser();
  }, []);

  // dropdown open close
  const hendeladminBtn = () => {
    setShowadminUser(!showadminUser);
  };

  // outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowadminUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout
  const logoutHandler = () => {
    localStorage.removeItem("token");

    alert("Logout Success");

    navigate("/login");
  };

  return (
    <>
      <header className="relative h-16 bg-white shadow dark:bg-black dark:text-white flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* user icon */}
          <FaRegUser className="cursor-pointer " onClick={hendeladminBtn} />

          <DarkModeToggle />

          <Button className="cursor-pointer" onClick={logoutHandler}>
            Logout
          </Button>
        </div>

        {/* dropdown */}
        {showadminUser && adminuser && (
          <div
            ref={dropdownRef}
            className="absolute right-6 top-16 bg-white text-black shadow-lg rounded-xl p-4 w-72 border z-50">
            <p className="mb-2">
              <strong>Name:</strong> {adminuser.name}
            </p>

            <p className="mb-2">
              <strong>Email:</strong> {adminuser.email}
            </p>

            <p className="mb-2">
              <strong>Role:</strong> {adminuser.role}
            </p>

            {/* admin badge */}
            {adminuser.role === "admin" ? (
              <p className="text-green-600 font-bold">Admin User</p>
            ) : (
              <p className="text-blue-600 font-bold">Normal User</p>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
