import httpClient from "./api"; 

export const loginUserApi = (credentials) => {
  return httpClient.post("/auth/login", credentials);
};

export const registerUserApi = (formData) => {
  return httpClient.post("/auth/register", formData);
};
