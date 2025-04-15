import React from "react";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-3">
      <h1 className=" md:flex hidden">BrandName</h1>

      <nav className="md:flex gap-3 ">
        <Link to={"/"}>Tasks</Link>
        <Link className="mx-2" to={"/profile"}>
          Profile
        </Link>
        <Link to={"/add-new-task"}>Add New Task</Link>
        <Link className="mx-2" to={"/login"}>
          Login
        </Link>
        <Link to={"/register"}>Register</Link>
      </nav>
    </div>
  );
}
