import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // 1. Send credentials to the backend login route
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password
      });

      // 2. If successful, the backend sends the user data
      if (response.data.status === "success") {
        localStorage.setItem("currentUser", JSON.stringify(response.data.data));
        alert("Login successfully");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      // 3. Handle errors (Invalid password, user not found, etc.)
      console.error(err);
      const errorMsg = err.response?.data?.message || "Login failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="bg-light">
      <div
        className="d-flex justify-content-center align-items-center container"
        style={{ height: "100vh" }}
      >
        <form className="col-12 col-md-4 col-lg-5 p-4 shadow-lg bg-white rounded">
          <h3 className="text-center mb-4">Login</h3>
          
          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;