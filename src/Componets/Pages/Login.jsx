import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://cosmetic-backend-e6ia.onrender.com/login",
        {
          email,
          password,
        },
      );

      // Token save in localStorage
      // Save token
      localStorage.setItem("token", data.token);

      // Save user info
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      // Role based redirect
      if (data.user.role === "admin") {
        navigate("/Sidebar");
      } else {
        navigate("/NotFound");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}>
      <div
        style={{
          width: "350px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}>
          Login
        </h1>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}>
            Login
          </button>
          <Link to={"/singup"}>
            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "10px",
              }}>
              Signup
            </button>
          </Link>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/ForgotPassword")}>
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
