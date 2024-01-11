import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const adminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admindashboard", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setLoading(false);
          const token = Cookies.get("jwtToken");
          const decoded = jwtDecode(token);
          setUser(decoded);
        } else {
          console.error("Server response not ok:", response);
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <p>You are not authenticated. Redirecting to login...</p>;
  }
  const logout = async () => {
    const response = await fetch("http://localhost:3001/logout");
    Cookies.remove("jwtToken");
    router.push("/login");
  };
  return (
    <div class="px-12">
      <nav class="navbar navbar-light bg-light px-11">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">{user.username}</span>
          <span class="navbar-brand mb-0 h1">{user.role} Dashboard</span>
          
          <button class="w-24 bg-slate-950" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default adminDashboard;
