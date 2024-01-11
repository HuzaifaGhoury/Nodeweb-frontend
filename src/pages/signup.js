import { useState } from "react";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User signed up successfully");
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error jkhsigning up:", error.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Welcome to Crypto App</h3>
          <p className="loginptag">
            Create a free account by filling data below.
          </p>
          <div className="text-center"></div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              className="form-control mt-1"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Role</label>
            <select
              className="form-select mt-1"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <p style={{ marginTop: "10px" }}>
            <input value="Two" type="checkbox" />
            <span>I agree with Terms & Conditions.</span>
          </p>
          <p style={{ color: "red" }}>{error}</p>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="button">
              Create Account
            </button>
          </div>
          <p className="alreadyhaveacc">
            Already have an account?{" "}
            <a href="/login" className="tag">
              login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
