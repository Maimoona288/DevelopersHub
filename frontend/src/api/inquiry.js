import API from "./axios";

export const getInquiries = () => API.get("/inquiry");