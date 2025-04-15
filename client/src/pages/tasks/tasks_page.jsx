import React from "react";
import { UseUser } from "../../context/authContext";

export default function TasksPages() {
  const { tasks, setTasks, loading, refreshUser } = UseUser();
  console.log(tasks, loading);
  const handleDelete = async (taskId) => {
    console.log(taskId);
    const response = await fetch(`http://localhost:5050/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
    }
    const data = await response.json();
    console.log(data);

    setTasks((prev) => prev.filter((item) => item._id !== taskId));
    await refreshUser();
  };
  if (loading) return <div>..........</div>;
  return (
    <div>
      <h1>Tasks</h1>
      <div className="grid  md:grid-cols-3 gap-3">
        {tasks?.map((task) => (
          <div className="border rounded-md p-4" key={task._id}>
            <h1>{task.title}</h1>
            <h1>{task.desc}</h1>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-900 cursor-pointer text-white p-2 rounded-md"
              >
                Delete
              </button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
