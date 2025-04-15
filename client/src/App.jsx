import React from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router";
import TasksPages from "./pages/tasks/tasks_page";
import AddTask from "./pages/tasks/addTask";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/auth/profile";
import { UseUser } from "./context/authContext";

export default function App() {
  const { user, loading } = UseUser();

  if (loading) return <div>..........</div>;
  return (
    <div>
      <Header />
      <main className="px-8 py-3">
        <Routes>
          <Route
            path="/"
            element={user ? <TasksPages /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-new-task"
            element={user ? <AddTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/profile" /> : <Register />}
          />
        </Routes>
      </main>
    </div>
  );
}
