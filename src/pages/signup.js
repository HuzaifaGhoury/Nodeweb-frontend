// // pages/signup.js

// import React, { useState } from 'react';

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     userusername: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
// // console.log(formData)
//     try {
//       const response = await fetch('http://localhost:3001/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),

//       });
//       if (response.ok) {
//         console.log('User signed up successfully');
//       } else {
//         const data = await response.json();
//         console.error('Error signing up:', data.message);
//       }
//     } catch (error) {
//       console.error('Error signing up:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Signup Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>userName:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import React{useState} from 'react'
// import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";
// import { auth } from "./FirebaseData";
// import { setDoc,doc} from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import Verification from "./Verification";
// import { useHistory } from 'react-router-dom';

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
        console.error("Error signing up:", data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
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

          <p style={{ marginTop: "10px" }}>
            <input value="Two" type="checkbox" />
            <span>I agree with Terms & Conditions.</span>
          </p>
          {/* {errorMessage && (
            <div className="alert alert-danger mt-3">
              {errorMessage}
            </div> */}
          {/* )} */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="button">
              Create Account
            </button>
          </div>
          <p className=" alreadyhaveacc">
            Already have an account?{" "}
            <a href="/login" className="tag">
              login
            </a>
            {/* Forgot <a href="#">password?</a> */}
          </p>
        </div>
      </form>
      {/* <Verification email={formData.email} /> */}
    </div>
  );
}

export default Signup;
