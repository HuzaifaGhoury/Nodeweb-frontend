import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({});
  const [error, setError] = useState();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();

        Cookies.set("jwtToken", token, { expires: 1 });

        const decoded = jwtDecode(token);
        setUserData(decoded);
        // console.log(decoded);
        if (decoded.role == "teacher") {
          router.push("/teacherDashboard");
        } else if (decoded.role == "teacher") {
          router.push("/studentDashboard");
        } else {
          router.push("/adminDashboard");
        }
      } else {
        const data = await response.json();
        console.error("Error logging in:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title" style={{ fontWeight: "600" }}>
            Welcome to Crypto App
          </h3>
          <p className="loginptag">
            {" "}
            Enter your credentials to access the account.
          </p>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="loginflex">
            <p>
              <input value="Two" type="checkbox" />
              <span> Remember me </span>
            </p>
            <p className="forgot-password text-right mt-2">
              <a
                href="#"
                style={{ textDecoration: "none" }}
                // onClick={forgetpassword}
              >
                {" "}
                Forgot password?
              </a>
            </p>
          </div>
          <p style={{ color: "red" }}>{error}</p>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              style={{ background: "#D8DDE2", border: "none", color: "black" }}
              className="btn btn-primary btnlogin"
            >
              Login
            </button>
            <button
              style={{ background: "#EEEEF4" }}
              type="submit"
              className="btn  btncreateaccount "
              // onClick={gotosignup}
            >
              <a href="/signup" className="tag">
                {" "}
                Create new account
              </a>{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
