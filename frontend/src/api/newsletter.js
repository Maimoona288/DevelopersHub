import API from "./axios";

export const getSubscribers = () => API.get("/newsletter");