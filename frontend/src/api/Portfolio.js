import API from "./axios";

export const getProjects = () => API.get("/portfolio");
export const createProject = (data) => API.post("/portfolio", data);
export const updateProject = (id, data) => API.put(`/portfolio/${id}`, data);
export const deleteProject = (id) => API.delete(`/portfolio/${id}`);