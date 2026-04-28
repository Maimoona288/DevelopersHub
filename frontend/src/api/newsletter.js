import API from "./axios";

export const subscribeEmail = (email) =>
  API.post("/newsletter", { email });

export const getSubscribers = () =>
  API.get("/newsletter");