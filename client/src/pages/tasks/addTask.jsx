import React from "react";
import { useNavigate } from "react-router";
import { UseUser } from "../../context/authContext";

export default function AddTask() {
  const { setTasks, refreshUser } = UseUser();
  const navigate = useNavigate();
  const handleAddTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const response = await fetch(
      "https://mern-todo-app-ko4o.onrender.com/api/tasks/create",
      {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          desc,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
    }
    const data = await response.json();

    setTasks((prev) => [...prev, data.task]);
    await refreshUser();
    navigate("/");
    e.target.reset();
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleAddTask} className="border rounded-md p-8">
        <h1>Add Task Form</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border rounded-md my-2 w-full p-3"
        />
        <input
          type="text"
          name="desc"
          placeholder="Desc"
          className="border rounded-md my-2 w-full p-3"
        />
        <button
          className="bg-blue-900 text-white p-3 rounded-md cursor-pointer"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
