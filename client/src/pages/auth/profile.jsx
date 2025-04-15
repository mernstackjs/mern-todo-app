import React from "react";
import { UseUser } from "../../context/authContext";

export default function Profile() {
  const { user, loading, logout } = UseUser();

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div>..........</div>;
  return (
    <div>
      Profile
      <h1>{user?.username}</h1>
      <button
        className="bg-red-800 text-white p-3 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
