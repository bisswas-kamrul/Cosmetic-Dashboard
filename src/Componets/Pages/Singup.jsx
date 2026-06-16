import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [lastName, setlastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://cosmetic-backend-e6ia.onrender.com/signup",
        {
          name,
          lastName,
          email,
          password,
        },
      );

      alert(data.message);
      // redirect to login page
      navigate("/login");
      // Input clear
      setName("");
      setlastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
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
          Signup
        </h1>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="text"
            placeholder="Enter lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
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
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
