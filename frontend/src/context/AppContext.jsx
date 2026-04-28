import { createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;

  const getServices = async () => {
    const res = await axios.get(`${API}/services`);
    return res.data;
  };

  const getBlogs = async () => {
    const res = await axios.get(`${API}/blogs`);
    return res.data;
  };

  const getProjects = async () => {
    const res = await axios.get(`${API}/portfolio`);
    return res.data;
  };

  const createBooking = async (data) => {
    const res = await axios.post(`${API}/bookings`, data);
    return res.data;
  };

  return (
    <AppContext.Provider
      value={{ getServices, getBlogs, getProjects, createBooking }}
    >
      {children}
    </AppContext.Provider>
  );
};