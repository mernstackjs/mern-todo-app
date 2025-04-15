import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export const UseUser = () => {
  return useContext(authContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5050/api/current-user", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setLoading(false);
      }
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const logout = async () => {
    const response = await fetch("http://localhost:5050/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      setLoading(false);
    }
    const data = await response.json();
    console.log(data);
    setUser(null);
    setLoading(false);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5050/api/tasks", {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setLoading(false);
      }
      const data = await response.json();
      setTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const value = {
    user,
    loading,
    tasks,
    setTasks,
    logout,
    refreshUser: getCurrentUser,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
