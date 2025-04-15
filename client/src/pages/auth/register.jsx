import React from "react";

export default function Register() {
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }

    e.target.reset();
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="border p-5 rounded-md">
        <h1 className="text-2xl font-medium mb-3 ">Register</h1>
        <div>
          <label htmlFor="username ">Username</label>
          <input
            className="w-full my-2 border rounded-md px-3 py-2"
            type="username"
            name="username"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="email ">Email</label>
          <input
            className="w-full my-2 border rounded-md px-3 py-2"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input
            className="w-full my-2 border rounded-md px-3 py-2"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className="bg-blue-900 text-white cursor-pointer my-2  rounded-md px-3 py-2">
          Register
        </button>
      </form>
    </div>
  );
}
